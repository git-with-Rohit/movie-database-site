import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, goToPage }) => {
  const createPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      let startPage = Math.max(currentPage - 1, 2);
      let endPage = Math.min(currentPage + 1, totalPages - 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button 
        onClick={() => goToPage(Math.max(currentPage - 1, 1))} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {createPageNumbers().map((page, index) =>
        page === '...' ? (
          <span key={index}>...</span>
        ) : (
          <button
            key={index}
            className={page === currentPage ? 'active' : ''}
            onClick={() => goToPage(page as number)}
          >
            {page}
          </button>
        )
      )}
      <button 
        onClick={() => goToPage(Math.min(currentPage + 1, totalPages))} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
