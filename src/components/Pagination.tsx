import React from 'react';

interface PaginationProps {
    currentPage: number; // 현재 페이지
    totalPages: number; // 전체 페이지 수
    onPageChange: (page: number) => void; // 페이지 변경 핸들러
    groupSize?: number; // 한 번에 표시할 페이지 번호의 수 (기본값 5)
}

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          totalPages,
                                                          onPageChange,
                                                          groupSize = 5, // 기본값 5
                                                      }) => {
    const currentGroup = Math.ceil(currentPage / groupSize); // 현재 그룹 계산
    const startPage = (currentGroup - 1) * groupSize + 1; // 현재 그룹의 첫 번째 페이지
    const endPage = Math.min(startPage + groupSize - 1, totalPages); // 현재 그룹의 마지막 페이지

    const handlePageClick = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;

            // 그룹의 마지막 페이지를 넘어서면 새로운 그룹의 첫 번째 페이지로 전환
            if (nextPage > endPage) {
                const newStartPage = endPage + 1;
                handlePageClick(newStartPage); // 새로운 그룹의 첫 페이지로 이동
            } else {
                handlePageClick(nextPage); // 같은 그룹 내에서 이동
            }
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;

            // 그룹의 첫 페이지를 벗어나면 이전 그룹의 마지막 페이지로 전환
            if (prevPage < startPage) {
                const newEndPage = startPage - 1;
                handlePageClick(newEndPage); // 이전 그룹의 마지막 페이지로 이동
            } else {
                handlePageClick(prevPage); // 같은 그룹 내에서 이동
            }
        }
    };

    return (
        <nav
            className="pagination-container"
            role="navigation"
            aria-label="Pagination Navigation"
        >
            {/* << 그룹의 첫 페이지로 이동 */}
            {currentPage > startPage && (
                <img
                    className="pagination-arrow"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f414e0f7b9933667b6db55b5b54d3e3fb6f2c320261d4928ceb8b4aeb2d58ef?apiKey=a7fa475a1710478787384e06fe692f60&"
                    alt="Go to group start"
                    onClick={() => handlePageClick(startPage)}
                    role="button"
                    tabIndex={0}
                />
            )}
            {/* < 이전 페이지로 이동 */}
            {currentPage > 1 && (
                <img
                    className="pagination-arrow"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/415ee7b524a5d83ad0db10eaec5aaea0898f6656fb0cfd9aba97a630df4848ad?apiKey=a7fa475a1710478787384e06fe692f60&"
                    alt="Previous page"
                    onClick={handlePrevClick}
                    role="button"
                    tabIndex={0}
                />
            )}
            {/* 페이지 번호 표시 */}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                const page = startPage + index;
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
            {/* > 다음 페이지로 이동 */}
            {currentPage < totalPages && (
                <img
                    className="pagination-arrow"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b24c6a4de7c75988b1c173cb041f7da07468b49266bb7864860492288243d56?apiKey=a7fa475a1710478787384e06fe692f60&"
                    alt="Next page"
                    onClick={handleNextClick}
                    role="button"
                    tabIndex={0}
                />
            )}
            {/* >> 그룹의 마지막 페이지로 이동 */}
            {currentPage < endPage && (
                <img
                    className="pagination-arrow"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d65088c570b09bed44b2964ef0a63356b52a8fc9797a15873eaa6536c759e563?apiKey=a7fa475a1710478787384e06fe692f60&"
                    alt="Go to group end"
                    onClick={() => handlePageClick(endPage)}
                    role="button"
                    tabIndex={0}
                />
            )}
        </nav>
    );
};
