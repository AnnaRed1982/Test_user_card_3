import { Audio } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <>
      <Audio
        height="180"
        width="180"
        radius="9"
        color="blue"
        ariaLabel="loading"
      />
      <h2>Loading...</h2>
    </>
  );
};
