import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import { useQuery, gql } from '@apollo/client';
import PokemonCard from '../../components/PokemonCard';
import { GET_ALL_POKEMONS } from '../../api/query';
import PokemonDetails from '../../components/PokemonDetails';
import Loading from '../../components/Loading';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import Input from '../../components/Input';
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

const OFFSET = 89;
const DEFAULT_PAGE = 0;
const ITEM_PER_PAGE = 8;

export default function Pokedex() {
  const [keyword, setKeyword] = useState();
  const [select, setSelected] = useState('');
  const [startNum, setStartNum] = useState<number | null>(null);
  const [page, setPage] = useState(DEFAULT_PAGE);

  const { loading, error, data, refetch } = useQuery(GET_ALL_POKEMONS, {
    variables: { num: OFFSET },
  });

  const pokemons = data?.getAllPokemon;
  const handleClick = (e: string) => {
    const lowerCased = e.toLowerCase();
    setSelected(lowerCased);
    console.log('e', lowerCased);
  };

  const handleGetPokemonsByNum = (e: any) => {
    e.preventDefault();
    // refetch({ num: OFFSET + Number(startNum ?? 0) });
    setPage(0);
  };

  const handleNext = () => {
    refetch({ num: OFFSET + (page + 1) * ITEM_PER_PAGE });
    setPage((prevCount) => prevCount + 1);
  };
  const handleBack = () => {
    if (page > 0) {
      refetch({ num: OFFSET + (page - 1) * ITEM_PER_PAGE });
      setPage((prevCount) => prevCount - 1);
    }
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
            onSubmit={handleClick}
            className='max-w-xl w-full items-center justify-center'
          />
        </div>
        <form
          className='max-w-[9rem] float-right pt-4 flex items-center gap-2'
          onSubmit={handleGetPokemonsByNum}
        >
          <label>from</label>
          <Input
            value={startNum}
            onChange={(e: any) => {
              console.log('e', e);
              setStartNum(e);
            }}
            type='number'
          />
        </form>
        <div
          id='pokemon-list-pagination'
          className='flex w-full justify-between pt-4'
        >
          <span
            className='border p-2 rounded-md items-center flex cursor-pointer hover:bg-slate-100'
            onClick={handleBack}
          >
            <FaCaretLeft />
            Back
          </span>
          <span
            className='border p-2 rounded-md items-center flex cursor-pointer'
            onClick={handleNext}
          >
            Next
            <FaCaretRight />
          </span>
        </div>
        <div className='grid grid-cols-4 pt-12 gap-4 relative items-center min-h-[82vh]'>
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
            <Loading loading={true} />
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
