import { useQuery } from '@apollo/client';
import { GET_POKEMON, GET_ALL_POKEMONS } from './query';

const DEFAULT_OFFSET = 89;

export const getSinglePokemon = (selected: string) => {
  console.log('selected', selected);
  const data =
    useQuery(GET_POKEMON, {
      variables: { pokemon: selected ?? 'pikachu' },
    }) ?? {};
  return { ...data };
};

export const getAllPokemonPokemons = ({ num, reverse }: any) => {
  const data = useQuery(GET_ALL_POKEMONS, {
    variables: {
      num: num ?? DEFAULT_OFFSET,
      reverse: reverse === 'ascending' ? false : true,
    },
  });
  return { ...data };
};
