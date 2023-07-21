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
