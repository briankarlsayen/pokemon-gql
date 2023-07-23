import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import { useQuery, gql } from '@apollo/client';
import PokemonCard from '../../components/PokemonCard';
import { GET_ALL_POKEMONS } from '../../api/query';
import PokemonDetails from '../../components/PokemonDetails';

const GET_POKEMON_DETAILS = gql`
  {
    getPokemon(pokemon: dragoni) {
      sprite
      num
      species
      color
    }
  }
`;

export default function Pokedex() {
  const [keyword, setKeyword] = useState();
  const [select, setSelected] = useState('');
  const handlePick = (val: string) => {
    console.log('val', val);
    // alert(keyword);
  };

  const { loading, error, data } = useQuery(GET_ALL_POKEMONS);
  console.log('data', data);

  const pokemons = data?.getAllPokemon;
  const handleClick = (e: string) => {
    setSelected(e);
    console.log('e', e);
  };

  return (
    <div className='flex gap-4 min-h-screen h-full'>
      <div id='pokemon-list' className='basis-2/3'>
        <h2 className='pb-20'>Pokemon</h2>
        <div className='flex justify-center w-full'>
          <SearchBar
            value={keyword}
            onChange={(e: any) => {
              console.log('e', e);
              setKeyword(e);
            }}
            onSubmit={handlePick}
            className='max-w-xl w-full items-center justify-center'
          />
        </div>
        <div className='grid grid-cols-4 pt-12 gap-4'>
          {pokemons ? (
            pokemons.map((pokemon: any) => (
              <PokemonCard
                key={pokemon.key}
                name={pokemon.key}
                image={pokemon.sprite}
                num={pokemon.num}
                types={pokemon.types}
                onClick={(e: any) => {
                  handleClick(e);
                }}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        id='pokemon-details'
        className='basis-1/3 shadow-lg rounded-md p-4 mt-20 text-center h-fit'
      >
        <PokemonDetails selected={select} />
      </div>
    </div>
  );
}
