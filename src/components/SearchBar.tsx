import { FaSearch } from 'react-icons/fa';
import { PokemonEnum } from '@favware/graphql-pokemon';
import { useState } from 'react';

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  className,
  ...rest
}: any) {
  function getEnumKeys<T extends object>(enumObj: T): Array<keyof T> {
    return Object.keys(enumObj) as Array<keyof T>;
  }

  const [options, setOptions] = useState(getEnumKeys(PokemonEnum));
  const [filteredOpts, setFilteredOpts] = useState(
    getEnumKeys(PokemonEnum).slice(0, 10)
  );
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);

  function filterOptions(inputValue: string) {
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    return filteredOptions;
  }

  const handleFilter = (e: any) => {
    setSearchText(e.target.value);
    const filt = filterOptions(e.target.value).slice(0, 10);
    setFilteredOpts(filt);
    console.log('filt', filt);
  };

  const handleSelect = (val: string) => {
    return onSubmit(val);
  };

  const visibility = open ? 'opacity-100' : 'opacity-0';

  return (
    <div className={`relative mt-1 ${className}`}>
      <input
        type='text'
        id='password'
        className='w-full pl-3 pr-10 py-2 border-2 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors'
        placeholder='Search...'
        value={searchText}
        onChange={handleFilter}
        onFocus={() => {
          setOpen(true);
          console.log('not blur');
        }}
        onBlur={() => setOpen(false)}
        autoComplete='off'
      />
      {!!filteredOpts?.length && open && (
        <ul
          className={`border border-gray-300 rounded-lg p-2 mt-2 transition delay-50 duration-100 ease-linear absolute w-full bg-gray-100`}
        >
          {filteredOpts.map((val) => {
            return (
              <li
                key={val}
                className=' m-0 p-2 cursor-pointer hover:bg-gray-200'
                onMouseDown={() => handleSelect(val)}
              >
                {val}
              </li>
            );
          })}
        </ul>
      )}
      <button
        type='submit'
        className='block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors'
      >
        <FaSearch />
      </button>
    </div>
  );
}
