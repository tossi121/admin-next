import { DOTS, usePagination } from './usePagination';
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const CommonPagination = (props) => {
  const {
    siblingCount = 1,
    pageSize,
    data,
    setCurrentData,
    totalCount,
    currentPage,
    setCurrentPage,
    isLoading,
  } = props;
  const [numData, setNumData] = useState(null);
  const [numFirst, setNumFirst] = useState(null);

  function onPageChange(page) {
    setCurrentPage(page);
  }
  // useEffect(() => {
  //   if (data) {
  //     setCurrentPage(1);
  //   }
  // }, [pageSize]);

  const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize });

  const currentTableData = useMemo(() => {
    if (data) {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      if (firstPageIndex >= data.length) {
        return data.slice(0, lastPageIndex);
      } else {
        return data.slice(firstPageIndex, lastPageIndex);
      }
    }
  }, [currentPage, data, pageSize]);

  const numberOfData = useMemo(() => {
    const firstPageIndex = (Number(currentPage) - 1) * Number(pageSize);
    const lastPageIndex = Number(firstPageIndex) + Number(pageSize);

    if (lastPageIndex < totalCount || currentPage > firstPageIndex) {
      return firstPageIndex, lastPageIndex;
    } else {
      const lastPageIndex = totalCount;
      return lastPageIndex;
    }
  }, [currentPage, pageSize, totalCount]);

  const numberOfFirstData = useMemo(() => {
    const firstPageIndex = (Number(currentPage) - 2) * Number(pageSize) + 1;
    const lastPageIndex = Number(firstPageIndex) + Number(pageSize);
    return firstPageIndex, lastPageIndex;
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (data) {
      setCurrentData(currentTableData);
    }
    setNumData(numberOfData);
    setNumFirst(numberOfFirstData);
  }, [numberOfFirstData, numberOfData, pageSize, JSON.stringify(currentTableData)]);

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between pt-3 pb-2 text-center">
        {(totalCount > 9 && (
          <p className="mb-sm-0 text-nowrap">
            Showing {numFirst?.toLocaleString('en-IN')} to {numData?.toLocaleString('en-IN')} of{' '}
            {totalCount?.toLocaleString('en-IN')} entries
          </p>
        )) || (
            <p className="mb-sm-0 text-nowrap">
              Showing {numFirst?.toLocaleString('en-IN')} to {totalCount?.toLocaleString('en-IN')} of{' '}
              {totalCount?.toLocaleString('en-IN')} entries
            </p>
          )}

        <ul className="pagination-container pagination-bar mb-0 p-0 d-flex align-items-center justify-content-end ms-auto mt-md-0 list-unstyled">
          <li
            className={`pagination-item ${(currentPage === 1 && 'disabled') || ''} ${(isLoading && 'disabled') || ''}`}
            onClick={onPrevious}
          >
            <FontAwesomeIcon icon={faChevronLeft} width={8} />
          </li>
          {paginationRange.map((pageNumber, page) => {
            if (pageNumber === DOTS) {
              return (
                <li className={`pagination-item ${(isLoading && 'disabled') || ''}`} dots key={page}>
                  &#8230;
                </li>
              );
            }
            return (
              <>
                <li
                  className={`pagination-item ${(pageNumber === currentPage && 'selected') || ''} ${(isLoading && 'disabled') || ''
                    }`}
                  key={page}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber.toLocaleString('en-IN')}
                </li>
              </>
            );
          })}
          <li
            className={`pagination-item ${(currentPage === lastPage && 'disabled') || ''}  ${(isLoading && 'disabled') || ''
              } `}
              onClick={onNext}
          >
            <FontAwesomeIcon icon={faChevronLeft} width={8} />
          </li>
        </ul>
      </div>
    </>
  );
};

CommonPagination.propTypes = {
  siblingCount: PropTypes.number,
  pageSize: PropTypes.number,
  setCurrentData: PropTypes.func,
  data: PropTypes.array,
  setNumFirst: PropTypes.func,
  setNumData: PropTypes.func,
  searchInput: PropTypes.any,
};

export default CommonPagination;
