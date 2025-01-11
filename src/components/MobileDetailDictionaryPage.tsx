import * as React from 'react';
import { MobileDetailCategory } from './MobileDetailCategory';
import { MobileDetailDictionaryCard } from './MobileDetailDictionaryCard';
import { categories, allCategoryItems } from './mobile/data';
import { MobilePopularSearches } from './MobilePopularSearches';

export const MobileDetailDictionaryPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = React.useState('전체');

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
    };

    const displayedCategories = activeCategory === '전체'
        ? categories.filter((category) => category !== '전체')
        : [activeCategory];

    return (
        <div className="dictionary-container">
            <div className="header">
                <h1>IT용어백과사전</h1>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0942d2330b7121e64ed4d31c4a3c6aad2e6c3799edd5e44eab1732e3610d6ed?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                    alt="" className="search-icon"/>
            </div>
            <main className="main-content">
                <div className="categories-outer">
                    <div className="categories-inner">
                        {categories.map((category) => (
                            <MobileDetailCategory
                                key={category}
                                label={category}
                                isActive={activeCategory === category}
                                onClick={() => handleCategoryChange(category)}
                            />
                        ))}
                    </div>
                </div>
                {displayedCategories.map((category) => (
                    <div key={category} className="category-section">
                        {/*<h2 className="section-title">{category}</h2>*/}
                        {allCategoryItems[category].slice(0, 4).map((item, index) => (
                            <MobileDetailDictionaryCard key={item.title} item={item}/>
                        ))}
                        <button className="more-button">
                            <span>{category} 더보기</span>
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb167a14231989934acb5333885386e7d98b1b768ea1e7c68e9cbe0ebe4f8cfd?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                                alt="" className="arrow-icon"/>
                        </button>

                    </div>
                ))}
                {/* 인기 검색어 컴포넌트를 마지막에 추가 */}
                <MobilePopularSearches/>
            </main>



            <style>{`
        /*    
        .section-title {
          font-size: 16px;
          font-weight: 600;
          margin: 8px 0;
        }
        */
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
        }
        .main-content {
          background-color: #fff;
          padding: 0 16px 16px;
          box-sizing: border-box;
        }
        .categories-outer {
          width: 343px;
          height: 52px;
          margin: 0 auto 10px;
          margin-left: 0px;
          margin-right: 0px;
          margin-top: 10px;
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
        

      `}</style>
        </div>
    );
};
