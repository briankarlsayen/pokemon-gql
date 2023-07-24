import React from 'react';

export default function Input({ value, onChange }: any) {
  return (
    <div>
      <input
        type='text'
        id='password'
        className='w-full pl-3 pr-10 py-2 border-2 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors'
        placeholder='Search...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete='off'
      />
    </div>
  );
}
