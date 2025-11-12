import { Icon } from '@iconify/react/dist/iconify.js';
import { Spinner } from '@nextui-org/react';
import React from 'react';

interface ILoadingData {
  text?: string;
  noDataText?: string;
  noData?: boolean;
  loading?: boolean;
}

const LoadingDataComponent = ({
  text = 'Loading data',
  noData = false,
  loading = false,
  noDataText = 'No data found',
}: ILoadingData) => {
  return (
    <div className="flex flex-col items-center my-auto">
      {!noData && loading && (
        <React.Fragment>
          <Spinner color="current" size="md" />
          <p className="text-current mt-2 text-xs">{text}</p>
        </React.Fragment>
      )}

      {noData && (
        <React.Fragment>
          <Icon
            icon="solar:box-outline"
            className="text-[2.2rem] text-gray-400"
          />
          <p className="text-current text-xs">{noDataText}</p>
        </React.Fragment>
      )}
    </div>
  );
};

export default LoadingDataComponent;
