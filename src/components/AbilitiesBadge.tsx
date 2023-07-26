interface IAbilitiesBadge {
  name: string;
  description: string;
  type?: string;
}

export default function AbilitiesBadge({ ...props }: IAbilitiesBadge) {
  return (
    props && (
      <p
        className='border-gray-400 border w-fit rounded-lg py-1 px-2 tooltip'
        data-tip={
          props?.type
            ? `${props?.type} : ${props.description}`
            : props.description
        }
      >
        <span className='uppercase'>{props.name}</span>
      </p>
    )
  );
}
