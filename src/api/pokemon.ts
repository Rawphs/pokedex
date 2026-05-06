import { GraphQLClient } from 'graphql-request'
import type { Pokemon } from '../shared/types/pokemon';

export interface PokemonListResponse {
  pokemon_v2_pokemon: Pokemon[]
}

export const POKEMON_PER_PAGE = 20
export const graphqlClient = new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta')
export const GET_POKEMON_LIST = `
  query GetPokemonList($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: {id: asc}) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
  }
`

export async function fetchPokemon({ pageParam = 0 }): Promise<{ pokemon: Pokemon[]; nextOffset: number | null }> {
  const data = await graphqlClient.request<PokemonListResponse>(GET_POKEMON_LIST, {
    limit: POKEMON_PER_PAGE,
    offset: pageParam,
  })

  return {
    pokemon: data.pokemon_v2_pokemon,
    nextOffset: data.pokemon_v2_pokemon.length === POKEMON_PER_PAGE ? pageParam + POKEMON_PER_PAGE : null,
  }
}
