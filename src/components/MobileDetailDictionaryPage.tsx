import React, {useState} from 'react';
import {useLocation} from 'react-router-dom'; // React Router 사용
import { MobileDetailCategory } from './MobileDetailCategory';
import { MobileDetailDictionaryCard } from './MobileDetailDictionaryCard';
import MobileSearchBar from "./MobileSearchBar";
import {Pagination} from "./Pagination";


export const MobileDetailDictionaryPage: React.FC = () => {
    const location = useLocation(); // 검색화면에서 서칭한 단어의 결과값을 받기 위한 훅

    /**
     * results : 단어 검색 후, 검색결과
     * searchValue : 어떤 단어를 검색했는지의 값
     * categoryId : 메인 페이지에서 클릭한 카테고리의 ID(A0001 ~ A0005)
     * */
    const { results, searchValue, categoryId } = location.state || {}; // 전달받은 검색 결과 데이터
    const [activeCategory, setActiveCategory] = useState(categoryId || 'ALL'); // 초기 활성화된 카테고리
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const pageSize = 10; // 한 페이지에 표시할 데이터 수


    // 카테고리 데이터
    const predefinedCategories = [
        { categoryId: 'ALL', categoryName: '전체'},
        { categoryId: 'A0001', categoryName: '개발' },
        { categoryId: 'A0002', categoryName: '경영' },
        { categoryId: 'A0003', categoryName: '디자인' },
        { categoryId: 'A0004', categoryName: '마케팅' },
    ];

    const displayedCategories =
        activeCategory === 'ALL'
            ? results
            : results.filter((category: any) => category.categoryId === activeCategory);

    // 현재 활성화된 카테고리 데이터 페이징 처리
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData =
        activeCategory === 'ALL'
            ? displayedCategories // 전체 카테고리는 각 카테고리에서 4개씩 표시
            : displayedCategories[0]?.data.slice(startIndex, endIndex) || [];

    const totalPages = Math.ceil((displayedCategories[0]?.data.length || 0) / pageSize);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 변경 시 스크롤 상단으로 이동
    };


    // 더보기 클릭 핸들러
    const handleMoreClick = (categoryId: string) => {
        setActiveCategory(categoryId);
    };


    return (
        <div className="dictionary-container">
            <div style={styles.searchBarContainer}>
                <MobileSearchBar value={searchValue || ''}/>
            </div>
            <main className="main-content">
                <div className="categories-outer">
                    <div className="categories-inner">
                        {predefinedCategories.map((category: any) => (
                            <MobileDetailCategory
                                key={category.categoryId}
                                label={category.categoryName}
                                isActive={activeCategory === category.categoryId}
                                onClick={() => handleCategoryChange(category.categoryId)}
                            />
                        ))}
                    </div>
                </div>
                {/* 데이터 렌더링 */}
                {activeCategory === 'ALL'
                    ? displayedCategories.map((category: any) => (
                        <div key={category.categoryId} className="category-section">
                            {category.data.slice(0, 4).map((item: any) => (
                                <MobileDetailDictionaryCard key={item.termNo} item={item}/>
                            ))}
                            {category.data.length > 4 && (
                                <button
                                    className="more-button"
                                    onClick={() => handleMoreClick(category.categoryId)}
                                >
                                    <span>{category.categoryName} 더보기</span>
                                    <img
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb167a14231989934acb5333885386e7d98b1b768ea1e7c68e9cbe0ebe4f8cfd?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                                        alt=""
                                        className="arrow-icon"
                                    />
                                </button>
                            )}
                        </div>
                    ))
                    : currentData.map((item: any) => (
                        <div key={item.termNo} className="category-section">
                            <MobileDetailDictionaryCard key={item.termNo} item={item}/>
                        </div>
                    ))}
                {/* 페이징 UI */}
                {/* 페이징 UI */}
                {activeCategory !== 'ALL' && totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
                {/*<MobilePopularSearches/>*/}
            </main>
            <style>{`
        .dictionary-container {
          background-color: rgba(246, 248, 250, 1);
          display: flex;
          max-width: 375px;
          width: 100%;
          flex-direction: column;
          overflow-y: auto;
          margin: 0 auto;
        }
        .header {
          background-color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 62px;
          max-width: 375px;
          width: 100%;
          padding: 0 16px;
          box-sizing: border-box;
        }
        .header h1 {
          font: 600 26px Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
          margin: 0;
        }
        .search-icon {
          width: 28px;
          height: 28px;
          cursor: pointer;
        }
        .main-content {
          background-color: #fff;
          padding: 0 16px 16px;
          box-sizing: border-box;
        }
        .categories-outer {
          width: 343px;
          height: 52px;
          margin: 10px auto;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(246, 248, 250, 1);
          border-radius: 8px;
        }
        .categories-inner {
          width: 330px;
          height: 40px;
          display: flex;
          gap: 0;
        }
        .category-section .dictionary-card {
          width: 343px;
          min-height: 156px;
          border-bottom: 1px solid rgba(235, 235, 235, 1);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 24px 0px 24px 0px;
          box-sizing: border-box;
        }
        .category-section .dictionary-card:last-of-type {
          border-bottom: none; /* 마지막 dictionary-card의 border-bottom 제거 */
        }

        .more-button {
          width: 343px; /* 버튼 전체 너비 */
          height: 48px; /* 버튼 전체 높이 */
          display: flex;
          align-items: center; /* 세로 중앙 정렬 */
          justify-content: center; /* 가로 중앙 정렬 */ㄴ
          gap: 6px; /* 아이콘과 텍스트 간격 설정 */
          border: 1px solid rgba(235, 235, 235, 1); /* 테두리 */
          border-radius: 8px; /* 모서리 둥글게 */
          padding: 0; /* 내부 여백 제거 */
          background: none; /* 배경 없음 */
          cursor: pointer; /* 클릭 커서 */
          color: #000; /* 글자 색상 */
          text-decoration: none; /* 링크 스타일 제거 */
          box-sizing: border-box; /* 크기 계산 포함 */
          margin-bottom: 4px;
        }
        
        .more-button span {
          font-size: 16px; /* 폰트 크기 */
          font-weight: 400; /* 기본 굵기 */
          line-height: 1; /* 텍스트 높이 */
          text-align: center; /* 텍스트 중앙 정렬 */
          white-space: nowrap; /* 텍스트를 한 줄로 유지 */
        }
        
        .arrow-icon {
          width: 16px; /* 아이콘 너비 */
          height: 16px; /* 아이콘 높이 */
        }
        
        .pagination-container {
          display: flex;
          justify-content: center; /* 중앙 정렬 */
          align-items: center;
          gap: 4px;
          color: #b5b5b7;
          white-space: nowrap;
          text-align: center;
          letter-spacing: -0.35px;
          font: 400 14px/1 Pretendard, sans-serif;
        }

        .pagination-number {
          background-color: rgba(255, 255, 255, 1);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .pagination-number.active {
          color: #1f1f1f;
          font-weight: 600;
        }
        
        .pagination-arrow {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 32px;
        }
      `}</style>
        </div>
    );
};


const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        height: '100vh', // 화면 전체를 채우기 위해 사용
        maxWidth: '375px',
        margin: '0 auto',
        boxSizing: 'border-box', // 패딩 계산 방식을 명시적으로 설정
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        gap: '5px',
        marginTop: '20px',
    },
    pageButton: {
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    activePageButton: {
        backgroundColor: '#FF4500', // 현재 페이지 강조 색상
        color: '#fff',
    },


};
