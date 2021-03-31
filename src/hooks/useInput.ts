import { useState } from 'react';

const useInput = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return {
    params: {
      value,
      onChange,
    },
    setValue,
  };
};

export default useInput;
