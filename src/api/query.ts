import { gql } from '@apollo/client';

export const GET_ALL_POKEMONS = gql`
  query GetAllPokemon($num: Int, $reverse: Boolean) {
    getAllPokemon(offset: $num, reverse: $reverse, take: 8) {
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
          shortDesc
        }
        second {
          name
          shortDesc
        }
        hidden {
          name
          shortDesc
        }
        special {
          name
          shortDesc
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
export const GET_POKEMON_BY_NUM = gql`
  query GetPokemonByDexNumber($number: Int!) {
    getPokemonByDexNumber(number: $number) {
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
