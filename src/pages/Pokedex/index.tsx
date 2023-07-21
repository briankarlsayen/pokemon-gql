import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import TypeBadge from '../../components/TypeBadge';
import AbilitiesBadge from '../../components/AbilitiesBadge';
import { useQuery, gql } from '@apollo/client';
import type { Query } from '@favware/graphql-pokemon';
import PokemonCard from '../../components/PokemonCard';
import { GET_ALL_POKEMONS } from '../../api/query';

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

interface GraphQLPokemonResponse<K extends keyof Omit<Query, '__typename'>> {
  data: Record<K, Omit<Query[K], '__typename'>>;
}

export default function Pokedex() {
  const [keyword, setKeyword] = useState();
  const handlePick = (val: string) => {
    console.log('val', val);
    // alert(keyword);
  };

  const { loading, error, data } = useQuery(GET_ALL_POKEMONS);
  console.log('data', data);

  const pokemons = data?.getAllPokemon;

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
        <div className='flex flex-wrap gap-4 pt-8 justify-items-start'>
          {pokemons ? (
            pokemons.map((pokemon: any) => (
              <PokemonCard
                key={pokemon.key}
                name={pokemon.key}
                image={pokemon.sprite}
                num={pokemon.num}
                types={pokemon.types}
              />
            ))
          ) : (
            <></>
          )}

          {/* <PokemonCard  />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard /> */}
        </div>
      </div>
      <div
        id='pokemon-details'
        className='basis-1/3 shadow-lg rounded-md p-4 mt-20 text-center'
      >
        <div>
          <div className='flex justify-center items-center'>
            <img
              className='h-52 w-52'
              src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/395.png'
              alt='pokemon-img'
            />
          </div>
          <p>#395</p>
          <h3>Empoleon</h3>
          <span>Emperor Pokemon</span>
          <div className='flex justify-center w-full items-center gap-2'>
            <TypeBadge name={'water'} />
            <TypeBadge name={'steel'} />
          </div>
        </div>
        <div className='pt-4'>
          <label>Pokedex Entry</label>
          <p>
            Aenean rhoncus pulvinar metus, fringilla consequat lorem maximus
            aliquam. Nam laoreet turpis eu consectetur ullamcorper. Nunc
            tincidunt luctus tincidunt.
          </p>
        </div>
        <div className='pt-4'>
          <label>Abilities</label>
          <div className='flex justify-center w-full items-center gap-2'>
            <AbilitiesBadge name={'torrent'} />
            <AbilitiesBadge name={'defiant'} />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2 pt-4'>
          <InfoCard title='Height' content='1.7m' />
          <InfoCard title='Weight' content='84.5kg' />
          <InfoCard title='Base Exp' content='239' />
        </div>
        <div className='pt-4'>
          <label>Stats</label>
          <hr />
          <ul className='grid grid-cols-2'>
            <li>
              <p>
                Hp-
                <span>84</span>
              </p>
            </li>
            <li>
              <p>
                Atk-
                <span>84</span>
              </p>
            </li>
            <li>
              <p>
                Def-
                <span>84</span>
              </p>
            </li>
            <li>
              <p>
                SpA-
                <span>84</span>
              </p>
            </li>
            <li>
              <p>
                SpD-
                <span>84</span>
              </p>
            </li>
            <li>
              <p>
                SPD-
                <span>84</span>
              </p>
            </li>
            <li>
              <p>
                Tot-
                <span>84</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

interface IInfoCard {
  title: string;
  content: string;
}

const InfoCard = ({ title, content }: IInfoCard) => {
  return (
    <div className='bg-gray-300 rounded-lg'>
      <label>{title}</label>
      <p>{content}</p>
    </div>
  );
};
