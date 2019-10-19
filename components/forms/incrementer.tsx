import styled from 'styled-components';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const IncrementerStyle = styled.div`
  button {
    font-size: 1rem;
    display: inline-block;
    border-radius: 50%;
    padding: 0.5rem;
    width: 2rem;
    height: 2rem;
    line-height: 0.5;
    font-weight: bold;
  }

  .count {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

export const Incrementer = ({ name, min, max, defaultValue }: any) => {
  const [count, setCount] = useState(defaultValue || min || 0);

  const methods = useFormContext();
  let setValue: typeof methods.setValue;

  if (methods) {
    methods.register({ name });
    setValue = methods.setValue;
  }

  function changeValue(newCount: number) {
    setValue && setValue(name, newCount);
    setCount(newCount);
  }

  return (
    <IncrementerStyle>
      <button
        type="button"
        aria-label="decrement"
        disabled={count <= min}
        onClick={() => changeValue(count - 1)
      }>-</button>
      <span className="count">{count}+</span>
      <button
        type="button"
        aria-label="increment"
        disabled={count >= (max || Number.POSITIVE_INFINITY)}
        onClick={() => changeValue(count + 1)
      }>+</button>
    </IncrementerStyle>
  );
};
