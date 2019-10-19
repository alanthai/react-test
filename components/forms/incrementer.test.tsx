// @COMMENT: I would also test all presentational/dumb components such as an incrementer
import { render, fireEvent } from '@testing-library/react';
import { Incrementer } from './incrementer';

describe('Incrementer Component', () => {
  it('should increment the couner by 1 when clicking the increment button', () => {
    const { getByLabelText, getByText } = render(<Incrementer />);

    fireEvent.click(getByLabelText('increment'));

    expect(getByText(/1/)).toBeDefined();
  });

  it.todo('should accept a starting value');

  it.todo('should decrement the couner by 1 when clicking the decrement button');

  it.todo('should disable the decrement button if the count is the minimum value');

  it.todo('should disable the increment button if the count is the maximum value');
});
