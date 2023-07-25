import React from 'react';

export default function Input({ value, onChange, type, placeholder }: any) {
  return (
    <div>
      <input
        type={type}
        id='password'
        className='w-full px-2 py-2 border-2 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors text-right'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete='off'
      />
    </div>
  );
}
