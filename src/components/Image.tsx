import PokeballImg from '../assets/pokeball3.png';

interface IImage {
  name: string;
  src: string;
}

export default function Image({ src, name }: IImage) {
  const addDefaultSrc = (ev: any) => {
    ev.target.src = PokeballImg;
  };
  return <img src={src ?? PokeballImg} alt={name} onError={addDefaultSrc} />;
}
