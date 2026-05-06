import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { fetchPokemon, POKEMON_PER_PAGE } from '../api/pokemon';
import { PokemonCardSkeleton, PokemonCard } from '../components';

export function PokemonList() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: fetchPokemon,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
  })

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useEffect(() => {
    const element = loadMoreRef.current
    if (!element) return

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: '100px',
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: POKEMON_PER_PAGE }).map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Oops! Something went wrong</h2>
        <p className="text-muted-foreground max-w-md">
          {error instanceof Error ? error.message : 'Failed to load Pokémon. Please try again later.'}
        </p>
      </div>
    )
  }

  const pages = data?.pages ?? []

  const allPokemon = pages.flatMap((page) => page.pokemon) ?? []
  const fechedAll = pages[pages.length - 1]?.nextOffset === null

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {allPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}

        {isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, i) => (
            <PokemonCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      <div ref={loadMoreRef} className="flex justify-center py-8">
        {fechedAll ? (
          <p className="text-muted-foreground">{"You've caught them all! 🎉"}</p>)
          : null}
      </div>
    </div>
  )
}
