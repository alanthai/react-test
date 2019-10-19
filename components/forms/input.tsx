import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  &:focus {
    outline: 0;
    border-color: ${({ theme }) => theme.forms.focusColor};
  }
`;
