import { gql } from '@apollo/client';

export const GET_ALL_POKEMONS = gql`
  query GetAllPokemon {
    getAllPokemon(offset: 89, take: 20) {
      key
      num
      types {
        name
      }
      sprite
    }
  }
`;

export const GET_POKEMON = gql`
query GetPokemon($pokemon: PokemonEnum!) {
  getPokemon(pokemon: $pokemon) {
    gender {
      female
      male
    }
    height
    sprite
    types {
      name
    }
    num
    key
    weight
    abilities {
      first {
        name
      }
      second {
        name
      }
    }
    flavorTexts {
      flavor
    }
    baseStats {
      attack
      defense
      hp
      specialattack
      specialdefense
      speed
    }
    baseStatsTotal
    evolutionLevel
  }
}
`;
