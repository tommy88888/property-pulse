'use client';

import { CSSProperties } from 'react';
import { CircleLoader } from 'react-spinners';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '100px auto',
  borderColor: 'red',
};
type LoadingProps = {
  loading: boolean;
};

const Spinner = ({ loading }: LoadingProps) => {
  return (
    <>
      <ClipLoader
        color='#3b82f6'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label='Loading Spinner'
      />
    </>
  );
};

export default Spinner;
