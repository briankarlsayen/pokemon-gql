interface IOption {
  name: string;
  value: string;
}

interface ISelect {
  onChange?: any;
  options: IOption[];
  rest?: any;
}

export default function Select({ onChange, options, ...rest }: ISelect) {
  return (
    <select
      className='select w-fit max-w-xs'
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}
