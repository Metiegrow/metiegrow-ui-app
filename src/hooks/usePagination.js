import { useState, useCallback } from 'react';

/**
 * Reusable pagination hook
 * Handles pagination state and logic for list components
 *
 * @param {Object} options - Configuration options
 * @param {number} options.initialPage - Initial page number (default: 1)
 * @param {number} options.initialPageSize - Initial page size (default: 12)
 * @param {boolean} options.zeroIndexed - Whether backend uses 0-indexed pages (default: true)
 * @returns {Object} Pagination state and handlers
 */
export const usePagination = ({
  initialPage = 1,
  initialPageSize = 12,
  zeroIndexed = true,
} = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  /**
   * Handle page change
   * @param {number} page - New page number (1-indexed)
   * @param {number} newPageSize - Optional new page size
   */
  const handlePageChange = useCallback(
    (page, newPageSize) => {
      setCurrentPage(page);
      if (newPageSize && newPageSize !== pageSize) {
        setPageSize(newPageSize);
        setCurrentPage(1); // Reset to first page when page size changes
      }
    },
    [pageSize]
  );

  /**
   * Handle page size change
   * Resets to first page when page size changes
   * @param {number} newSize - New page size
   */
  const handlePageSizeChange = useCallback((newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page
  }, []);

  /**
   * Reset pagination to initial state
   */
  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSize(initialPageSize);
  }, [initialPage, initialPageSize]);

  /**
   * Go to specific page
   * @param {number} page - Page number to navigate to
   */
  const goToPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  /**
   * Go to next page
   */
  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  /**
   * Go to previous page
   */
  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  return {
    // State
    currentPage,
    pageSize,

    // Backend-compatible page number (0-indexed if needed)
    page: zeroIndexed ? currentPage - 1 : currentPage,

    // Handlers
    handlePageChange,
    handlePageSizeChange,
    setCurrentPage,
    setPageSize,

    // Navigation helpers
    resetPagination,
    goToPage,
    goToNextPage,
    goToPreviousPage,

    // Pagination params for API calls
    paginationParams: {
      page: zeroIndexed ? currentPage - 1 : currentPage,
      size: pageSize,
    },
  };
};
