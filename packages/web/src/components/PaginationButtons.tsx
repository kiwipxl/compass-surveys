import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

interface Props {
  className?: string;
  page: number;
  maxPages: number;
  onPrev?: (page: number) => void;
  onNext?: (page: number) => void;
}

const PaginationButtons: React.FC<Props> = ({
  className,
  page,
  maxPages,
  onPrev,
  onNext,
}) => {
  return (
    <div className={className}>
      <PageLabel>{`${page + 1} of ${maxPages}`}</PageLabel>

      <IconButton
        disabled={page <= 0}
        onClick={() => {
          if (onPrev) {
            onPrev(page - 1);
          }
        }}
      >
        <ChevronLeftIcon></ChevronLeftIcon>
      </IconButton>

      <IconButton
        disabled={page >= maxPages - 1}
        onClick={() => {
          if (onNext) {
            onNext(page + 1);
          }
        }}
      >
        <ChevronRightIcon></ChevronRightIcon>
      </IconButton>
    </div>
  );
};

const PageLabel = styled(Typography)`
  margin-right: 20px !important;
`;

export default styled(PaginationButtons)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
