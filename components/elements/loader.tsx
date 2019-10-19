import styled from 'styled-components';
import { Spinner } from './spinner';

const LoaderStyles = styled.div`
  position: relative;

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(150, 150, 150, 0.5);
  }
`;

export const Loader = ({ loading, children }: any) => {
  return (
    <LoaderStyles>
      { children }

      {
        loading && <>
          <div className="spinner"><Spinner /></div>
          <div className="overlay"></div>
        </>
      }
    </LoaderStyles>
  );
}
