import { Card, Chip } from '@heroui/react'
import type { Pokemon } from '../shared/types/pokemon';

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-stone-500',
  ghost: 'bg-violet-600',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-300',
}

const statColors: Record<string, string> = {
  hp: 'bg-red-500',
  attack: 'bg-orange-500',
  defense: 'bg-yellow-500',
  'special-attack': 'bg-blue-500',
  'special-defense': 'bg-green-500',
  speed: 'bg-pink-500',
}

const statLabels: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD',
}

interface PokemonCardProps {
  pokemon: Pokemon
}

export function getSpritesUrl(pokemon: Pokemon): string {
  try {
    if (pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites) {
      const sprites = JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites)
      return sprites.front_default || sprites.other?.['official-artwork']?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
    }
  } catch {
    // no-op
  }

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const spriteUrl = getSpritesUrl(pokemon)
  const types = pokemon.pokemon_v2_pokemontypes.map(t => t.pokemon_v2_type.name)
  const primaryType = types[0] || 'normal'

  return (
    <Card className="group w-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <Card.Header className={`relative h-40 ${typeColors[primaryType]} bg-opacity-20 flex items-center justify-center overflow-hidden p-0`}>
        <div className="absolute inset-0 from-transparent to-background/80" />
        <div className="absolute top-3 left-3 z-10">
          <span className="text-sm font-mono text-muted-foreground">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
        </div>
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          <img
            src={spriteUrl}
            alt={pokemon.name}
            width={120}
            height={120}
            className="drop-shadow-lg"
          />
        </div>
      </Card.Header>

      <Card.Content className="space-y-4">
        <div className="space-y-2">
          <Card.Title className="text-xl font-bold capitalize">
            {pokemon.name}
          </Card.Title>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <Chip
                key={type}
                size="sm"
                className={`${typeColors[type]} text-white capitalize text-xs font-medium`}
              >
                {type}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-medium">Height:</span> {(pokemon.height / 10).toFixed(1)}m
          </div>
          <div>
            <span className="font-medium">Weight:</span> {(pokemon.weight / 10).toFixed(1)}kg
          </div>
        </div>

        <div className="space-y-2">
          {pokemon.pokemon_v2_pokemonstats.slice(0, 3).map((stat) => {
            const statName = stat.pokemon_v2_stat.name
            const percentage = (stat.base_stat / 255) * 100
            return (
              <div key={statName} className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground w-14">
                  {statLabels[statName] || statName.toUpperCase()}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${statColors[statName] || 'bg-primary'}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-foreground w-8 text-right">
                  {stat.base_stat}
                </span>
              </div>
            )
          })}
        </div>
      </Card.Content>
    </Card>
  )
}
