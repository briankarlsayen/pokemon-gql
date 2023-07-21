import React from 'react';

interface IAbilitiesBadge {
  name: string;
}

export default function AbilitiesBadge({ name }: IAbilitiesBadge) {
  return (
    <p className='uppercase border-gray-400 border w-fit rounded-lg py-1 px-2'>
      {name}
    </p>
  );
}
