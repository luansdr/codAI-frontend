import React from 'react';
import { Input } from '@nextui-org/react';

const InputCustom = ({ ...props }) => {
  return (
    <Input
      className={`mb-6 rounded-lg ${props.className}`}
      autoComplete="false"
      {...props}
      style={{
        WebkitBoxShadow: '0 0 0 inset',
      }}
    />
  );
};

export default InputCustom;
