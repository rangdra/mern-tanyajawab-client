import { ChangeEvent, useState } from 'react';

export function useFormFiedls(initialState: any) {
  const [value, setValue] = useState(initialState);

  return [
    value,
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue({
        ...value,
        [event.target.name]: event.target.value,
      });
    },
  ];
}
