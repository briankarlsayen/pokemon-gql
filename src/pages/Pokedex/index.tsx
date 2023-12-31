import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import PokemonCard from '../../components/PokemonCard';
import PokemonDetails, { IPokemon } from '../../components/PokemonDetails';
import Loading from '../../components/Loading';
import { FaCaretRight, FaCaretLeft, FaSun, FaMoon } from 'react-icons/fa';
import PokeballLogo from '../../assets/pokeball-v1.png';
import Select from '../../components/Select';
import { getAllPokemonPokemons, getSinglePokemon } from '../../api';
const DEFAULT_OFFSET = 89;
const DEFAULT_PAGE = 0;
const ITEM_PER_PAGE = 8;

export default function Pokedex() {
  const [keyword, setKeyword] = useState();
  const [select, setSelected] = useState('bulbasaur');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [offset, setOffset] = useState(DEFAULT_OFFSET);
  const [order, setOrder] = useState('ascending');
  const [fetching, setFetching] = useState(false);
  const [isNext, setIsNext] = useState(true);

  const { loading, data, refetch } = getAllPokemonPokemons({
    num: offset,
    reverse: order,
  });
  const pokemon = getSinglePokemon(select);

  const fetchPokemon = (e: string) => {
    pokemon.refetch({ pokemon: e });
  };

  const refetchCallback = () => {
    setFetching(true);
  };

  useEffect(() => {
    if (loading === false) {
      setFetching(false);
      if (firstLoad) {
        setTimeout(() => {
          setFirstLoad(false);
        }, 3000);
      }
    }
  }, [data]);

  const pokemons = data?.getAllPokemon;
  const handleClick = (e: string) => {
    const lowerCased = e.toLowerCase();
    setSelected(lowerCased);
    fetchPokemon(lowerCased);
  };

  const handleNext = () => {
    refetch({ num: offset + (page + 1) * ITEM_PER_PAGE });
    setPage((prevCount) => prevCount + 1);
    refetchCallback();
    setIsNext(true);
  };
  const handleBack = () => {
    if (page > 0) {
      refetch({ num: offset + (page - 1) * ITEM_PER_PAGE });
      setPage((prevCount) => prevCount - 1);
      refetchCallback();
      setIsNext(false);
    }
  };

  const handleChangeOrder = (e: string) => {
    console.log('e', e);
    const newOffset = e === 'ascending' ? 89 : 0;
    setOffset(newOffset);
    setOrder(e);
    setPage(0);
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
  const [firstLoad, setFirstLoad] = useState(true);

  return firstLoad ? (
    <Loading loading={true} screen={true} />
  ) : (
    <div className='flex gap-4 min-h-screen h-full flex-col items-center px-4'>
      <Header />
      <div className='flex md:flex-row flex-col-reverse w-full gap-4 max-w-7xl min-h-[90vh]'>
        <div id='pokemon-list' className='basis-2/3 flex flex-col'>
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
          <div className='pt-4'>
            <Select
              options={options}
              onChange={handleChangeOrder}
              defaultVal={options[0]}
            />
          </div>
          <div
            id='pokemon-list-pagination'
            className='flex w-full justify-between pt-4'
          >
            <button
              className='btn flex items-center p-2 rounded-md'
              onClick={handleBack}
              disabled={!page}
            >
              {fetching && !isNext ? (
                <span className='loading loading-spinner'></span>
              ) : (
                <FaCaretLeft />
              )}
              Back
            </button>
            <button
              className='btn flex items-center p-2 rounded-md '
              onClick={handleNext}
            >
              Next
              {fetching && isNext ? (
                <span className='loading loading-spinner'></span>
              ) : (
                <FaCaretRight />
              )}
            </button>
          </div>
          <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 pt-4 gap-4 relative items-center flex-1 min-h-[35rem]'>
            {!loading && pokemons ? (
              pokemons.map((pokemon: IPokemon) => (
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
          className='basis-1/3 flex text-center min-h-[810px] h-full relative'
        >
          <PokemonDetails data={pokemon} />
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const appDoc: HTMLDivElement | null = document.querySelector(`[id^="app"]`);
    if (appDoc) {
      appDoc.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <div className='relative max-w-7xl mt-4 w-full flex justify-between items-center'>
      <div className='flex h-[30px] w-fit items-center gap-2 '>
        <img className='w-full h-full' src={PokeballLogo} alt='logo' />
        <p className='pokemon-text'>PokéDex</p>
      </div>
      <button
        onClick={toggleTheme}
        className='btn border-2 border-gray-300 float-right'
      >
        {theme === 'light' ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};
