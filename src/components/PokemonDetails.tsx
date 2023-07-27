import TypeBadge from './TypeBadge';
import AbilitiesBadge from './AbilitiesBadge';
import { useQuery } from '@apollo/client';
import { GET_POKEMON, GET_POKEMON_BY_NUM } from '../api/query';
import Image from './Image';
import Loading from './Loading';

interface IGender {
  female: string;
  male: string;
}

interface IType {
  name: string;
}

interface IAbility {
  name: string;
  shortDesc: string;
}

interface IAbilities {
  first: IAbility;
  second: IAbility | null;
  hidden: IAbility | null;
  special: IAbility | null;
}

interface IFlavorText {
  game: string;
  flavor: string;
}

interface IBaseStats {
  attack: number;
  defense: number;
  hp: number;
  specialattack: number;
  specialdefense: number;
  speed: number;
}

interface IPokemon {
  gender: IGender;
  height: number;
  sprite: string;
  types: IType[];
  num: number;
  key: string;
  weight: number;
  abilities: IAbilities;
  flavorTexts: IFlavorText[];
  baseStats: IBaseStats;
  baseStatsTotal: number;
  evolutionLevel: string;
}

interface IInfoCard {
  title: string;
  content: number | string;
}

export default function PokemonDetails({ selected }: any) {
  const defaultData: IPokemon = {
    gender: {
      female: '50%',
      male: '50%',
    },
    height: 0.4,
    sprite: 'https://play.pokemonshowdown.com/sprites/ani/pikachu.gif',
    types: [
      {
        name: 'Electric',
      },
    ],
    num: 25,
    key: 'pikachu',
    weight: 6,
    abilities: {
      first: {
        name: 'Static',
        shortDesc: 'Pokemon',
      },
      second: null,
      hidden: null,
      special: null,
    },
    flavorTexts: [
      {
        game: 'Legends Arceus',
        flavor:
          'Since ancient times, it has been revered by the people of Hisui, who call it the Master of the Waves. Its wings are a match for even master-crafted blades.',
      },
    ],
    baseStats: {
      attack: 86,
      defense: 88,
      hp: 84,
      specialattack: 111,
      specialdefense: 101,
      speed: 60,
    },
    baseStatsTotal: 530,
    evolutionLevel: '36',
  };

  // const { loading, error, data } = useQuery(GET_POKEMON_BY_NUM, {
  //   variables: { number: 1 },
  // });

  const type = 'name'; // name | num
  let pokemon = defaultData;
  let loading, error, data;

  if (type === 'name') {
    const getByName =
      useQuery(GET_POKEMON, {
        variables: { pokemon: selected ?? 'pikachu' },
      }) ?? {};
    pokemon = getByName?.data?.getPokemon ?? defaultData;
    loading = getByName?.loading;
  } else {
    const getByNum =
      useQuery(GET_POKEMON_BY_NUM, {
        variables: { number: 1 },
      }) ?? {};
    pokemon = getByNum?.data?.getPokemonByDexNumber ?? defaultData;
    loading = getByNum?.loading;
  }

  // const { loading, error, data } = useQuery(GET_POKEMON, {
  //   variables: { pokemon: selected ?? 'pikachu' },
  // });
  // let pokemon = data?.getPokemonByDexNumber ?? defaultData;
  // console.log('data', data?.getPokemon);
  console.log('selected', selected);

  return (
    <div className='relative pokemon-details-container p-4 rounded-md shadow-md'>
      <div>
        <div className='flex flex-col justify-center'>
          <div className='flex justify-center items-center max-w-[300px] max-h-[300px] w-full h-full self-center'>
            <div className='flex h-full w-full flex-1 items-center justify-center'>
              <Image name={pokemon.key} src={pokemon?.sprite} />
            </div>
          </div>
          <p className='pt-4'>#{pokemon.num}</p>
          <h3 className='capitalize'>{pokemon.key}</h3>
          <div className='flex justify-center w-full items-center gap-2'>
            {pokemon?.types?.map((type: any) => (
              <TypeBadge key={type.name} name={type.name} />
            ))}
          </div>
        </div>
        <div className='pt-4'>
          <label>Pokedex Entry</label>
          <p>{pokemon?.flavorTexts[0]?.flavor}</p>
        </div>
        <div className='pt-4'>
          <label>Abilities</label>
          <div className='flex justify-center w-full items-center gap-2'>
            <AbilitiesBadge
              name={pokemon.abilities?.first?.name}
              description={pokemon.abilities?.first?.shortDesc}
            />
            {pokemon.abilities?.second && (
              <AbilitiesBadge
                name={pokemon.abilities?.second.name}
                description={pokemon.abilities?.second?.shortDesc}
              />
            )}
            {pokemon.abilities?.hidden && (
              <AbilitiesBadge
                name={pokemon.abilities?.hidden.name}
                description={pokemon.abilities?.hidden?.shortDesc}
                type='Hidden'
              />
            )}
            {pokemon.abilities?.special && (
              <AbilitiesBadge
                name={pokemon.abilities?.special.name}
                description={pokemon.abilities?.special?.shortDesc}
                type='Special'
              />
            )}
            {/* <AbilitiesBadge name={pokemon.abilities?.second ? pokemon.abilities?.second?.name : 'null'} /> */}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2 pt-4'>
          <InfoCard title='Height' content={pokemon?.height} />
          <InfoCard title='Weight' content={pokemon?.weight} />
          <InfoCard title='Evolution lvl' content={pokemon?.evolutionLevel} />
        </div>
        <div className='pt-4'>
          <label>Stats</label>
          <hr />
          <ul className='grid grid-cols-2'>
            <li>
              <p>
                Hp-
                <span>{pokemon.baseStats.hp}</span>
              </p>
            </li>
            <li>
              <p>
                Atk-
                <span>{pokemon.baseStats.attack}</span>
              </p>
            </li>
            <li>
              <p>
                Def-
                <span>{pokemon.baseStats.defense}</span>
              </p>
            </li>
            <li>
              <p>
                SpA-
                <span>{pokemon.baseStats.specialattack}</span>
              </p>
            </li>
            <li>
              <p>
                SpD-
                <span>{pokemon.baseStats.specialdefense}</span>
              </p>
            </li>
            <li>
              <p>
                SPD-
                <span>{pokemon.baseStats.speed}</span>
              </p>
            </li>
            <li>
              <p>
                Tot-
                <span>{pokemon.baseStatsTotal}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <Loading loading={loading} />
    </div>
  );
}
const InfoCard = ({ title, content }: IInfoCard) => {
  return content ? (
    <div className='info-container rounded-lg'>
      <label>{title}</label>
      <p>{content}</p>
    </div>
  ) : (
    <></>
  );
};
