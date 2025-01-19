import React from 'react';

interface PaginationProps {
    currentPage: number; // 현재 페이지
    totalPages: number; // 전체 페이지 수
    onPageChange: (page: number) => void; // 페이지 변경 핸들러
}

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          totalPages,
                                                          onPageChange,
                                                      }) => {
    const handlePageClick = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <nav
            className="pagination-container"
            role="navigation"
            aria-label="Pagination Navigation"
        >
            {/* 첫 페이지로 이동: 첫 번째 페이지에서는 표시 안 함 */}
            {currentPage > 1 && (
                <img
                    className="pagination-arrow"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f414e0f7b9933667b6db55b5b54d3e3fb6f2c320261d4928ceb8b4aeb2d58ef?apiKey=a7fa475a1710478787384e06fe692f60&"
                    alt="Go to first page"
                    onClick={() => handlePageClick(1)}
                    role="button"
                    tabIndex={0}
                />
            )}
            {/* 이전 페이지로 이동: 첫 번째 페이지에서는 표시 안 함 */}
            {currentPage > 1 && (
                <img
                    className="pagination-arrow"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/415ee7b524a5d83ad0db10eaec5aaea0898f6656fb0cfd9aba97a630df4848ad?apiKey=a7fa475a1710478787384e06fe692f60&"
                    alt="Previous page"
                    onClick={() => handlePageClick(currentPage - 1)}
                    role="button"
                    tabIndex={0}
                />
            )}
            {/* 페이지 번호 표시 */}
            {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                    <div
                        key={page}
                        className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageClick(page)}
                        role="button"
                        tabIndex={0}
                        aria-current={page === currentPage ? 'page' : undefined}
                    >
                        {page}
                    </div>
                );
            })}
            {/* 다음 페이지로 이동: 마지막 페이지에서는 표시 안 함 */}
            {currentPage < totalPages && (
                <img
                    className="pagination-arrow"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b24c6a4de7c75988b1c173cb041f7da07468b49266bb7864860492288243d56?apiKey=a7fa475a1710478787384e06fe692f60&"
                    alt="Next page"
                    onClick={() => handlePageClick(currentPage + 1)}
                    role="button"
                    tabIndex={0}
                />
            )}
            {/* 마지막 페이지로 이동: 마지막 페이지에서는 표시 안 함 */}
            {currentPage < totalPages && (
                <img
                    className="pagination-arrow"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d65088c570b09bed44b2964ef0a63356b52a8fc9797a15873eaa6536c759e563?apiKey=a7fa475a1710478787384e06fe692f60&"
                    alt="Go to last page"
                    onClick={() => handlePageClick(totalPages)}
                    role="button"
                    tabIndex={0}
                />
            )}
        </nav>
    );
};
