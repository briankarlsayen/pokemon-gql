import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import { useQuery } from '@apollo/client';
import PokemonCard from '../../components/PokemonCard';
import { GET_ALL_POKEMONS } from '../../api/query';
import PokemonDetails from '../../components/PokemonDetails';
import Loading from '../../components/Loading';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import Select from '../../components/Select';
import PokeballLogo from '../../assets/pokeball-v1.png';
const DEFAULT_OFFSET = 89;
const DEFAULT_PAGE = 0;
const ITEM_PER_PAGE = 8;

export default function Pokedex() {
  const [keyword, setKeyword] = useState();
  const [select, setSelected] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [offset, setOffset] = useState(DEFAULT_OFFSET);
  const [order, setOrder] = useState('ascending');

  const { loading, error, data, refetch } = useQuery(GET_ALL_POKEMONS, {
    variables: {
      num: offset ?? DEFAULT_OFFSET,
      reverse: order === 'ascending' ? false : true,
    },
  });

  const pokemons = data?.getAllPokemon;
  const handleClick = (e: string) => {
    const lowerCased = e.toLowerCase();
    setSelected(lowerCased);
    console.log('e', lowerCased);
  };

  const handleGetPokemonsByNum = (e: any) => {
    e.preventDefault();
    // refetch({ num: DEFAULT_OFFSET + Number(startNum ?? 0) });
    setPage(0);
  };

  const handleNext = () => {
    refetch({ num: offset + (page + 1) * ITEM_PER_PAGE });
    setPage((prevCount) => prevCount + 1);
  };
  const handleBack = () => {
    if (page > 0) {
      refetch({ num: offset + (page - 1) * ITEM_PER_PAGE });
      setPage((prevCount) => prevCount - 1);
    }
  };

  const handleChangeOrder = (e: any) => {
    const newOffset = e === 'ascending' ? 89 : 0;
    setOffset(newOffset);
    setOrder(e);
  };

  const options = [
    {
      name: 'Ascending',
      value: 'ascending',
    },
    {
      name: 'Descending',
      value: 'descending',
    },
  ];

  return (
    <div className='flex gap-4 min-h-screen h-full justify-center'>
      <Header />
      <div className='flex w-full gap-4 max-w-7xl'>
        <div id='pokemon-list' className='basis-2/3'>
          {/* <h2 className='pb-20'>Pokemon</h2> */}
          <div className='flex justify-center w-full pt-20'>
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
          <div className='pt-4'>
            <Select onChange={handleChangeOrder} options={options} />
          </div>
          {/* <form
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
        </form> */}
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
          <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 pt-12 gap-4 relative items-center min-h-[70vh]'>
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
    </div>
  );
}

const Header = () => {
  return (
    <div className='h-[30px] w-fit'>
      <img className='w-full h-full' src={PokeballLogo} alt='logo' />
    </div>
  );
};
