interface IPokeType {
  name: string;
  color: string;
  textColor: string;
}
const pokeTypes: IPokeType[] = [
  {
    name: 'water',
    color: '#86BAFF',
    textColor: '#2D2D2D',
  },
  {
    name: 'steel',
    color: 'gray',
    textColor: '#2D2D2D',
  },
];

export default pokeTypes;
