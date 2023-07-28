import PokeballImg from '../assets/pokeball3.png';
import ScreenLoadingImg from '../assets/screen_loading.gif';

interface ILoading {
  loading: boolean;
  screen?: boolean;
}

export default function Loading({ loading, screen }: ILoading) {
  return (
    loading && (
      <div className='absolute top-0 h-full w-full flex items-center bg-inherit transition-opacity duration-300 justify-center'>
        {screen ? (
          <img className='-mt-12 -mr-12' src={ScreenLoadingImg} alt='loading' />
        ) : (
          <img
            className='-mt-12 -mr-12 animate-bounce'
            src={PokeballImg}
            alt='loading'
          />
        )}
      </div>
    )
  );
}
