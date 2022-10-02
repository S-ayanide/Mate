import React from 'react';
import { DartsSpinnerOverlay } from 'react-spinner-overlay';

interface ILoadingWrapper {
  loading: boolean;
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<ILoadingWrapper> = ({ loading, children }) => {
  return (
    <>
      <DartsSpinnerOverlay loading={loading} color="#c09066" />
      {children}
    </>
  );
};

export default LoadingWrapper;
