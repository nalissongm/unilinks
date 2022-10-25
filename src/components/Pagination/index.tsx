import { ArrowLeft, ArrowRight } from "phosphor-react";

import styles from "./pagination.module.scss";

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 5,
  currentPage = 1,
  onPageChange,
}: PaginationProps): JSX.Element {
  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <div className={styles.container}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 ? true : false}
      >
        <ArrowLeft weight="bold" />
        voltar
      </button>
      <div className={styles.pages}>
        {currentPage > 1 + siblingsCount && (
          <>
            <button onClick={() => onPageChange(1)}>1</button>
            {currentPage > 2 + siblingsCount && <span>...</span>}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <>
              <button key={page} onClick={() => onPageChange(page)}>
                {page}
              </button>
            </>
          ))}

        <button className={styles.buttonActive}>{currentPage}</button>

        {currentPage + siblingsCount <= lastPage && (
          <>
            {currentPage + 1 + siblingsCount <= lastPage && <span>...</span>}
            <button onClick={() => onPageChange(lastPage)}>{lastPage}</button>
          </>
        )}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage ? true : false}
      >
        próximo
        <ArrowRight weight="bold" />
      </button>
    </div>
  );
}
