import * as React from 'react';
import { MobileMainCategoryButton } from './MobileMainCategoryButton';
import { MobileMainSearchBar } from './MobileMainSearchBar';

export const MobileDictionary: React.FC = () => {
    const categories = ['개발', '경영', '디자인', '마케팅'];

    const handleSearch = (value: string) => {
        console.log('Search value:', value);
    };

    return (
        <div className="dictionary-main">
            <h1 className="dictionary-title">IT용어 백과사전</h1>
            <MobileMainSearchBar placeholder="검색어를 입력하세요." onSearch={handleSearch} />
            <div className="categories-container">
                {categories.map((category, index) => (
                    <React.Fragment key={category}>
                        <MobileMainCategoryButton label={category} />
                        {/* 마지막 요소에는 구분 기호를 추가하지 않음 */}
                        {index < categories.length - 1 && (
                            <span className="category-separator">•</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <style>{`
        .dictionary-main {
          background-color: rgba(255, 255, 255, 1);
          display: flex;
          max-width: 480px;
          width: 100%;
          flex-direction: column;
          overflow: hidden;
          align-items: center;
          margin: 0 auto;
        }
        .dictionary-title {
          color: rgba(31, 31, 31, 1);
          letter-spacing: -0.5px;
          text-align: center;
          margin-top: 236px;
          font: 600 20px Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
        }
        .categories-container {
          display: flex;
          margin-top: 28px;
          width: 251px;
          max-width: 100%;
          gap: 8px; /* 카테고리와 구분 기호 간의 간격 */
          justify-content: center;
          align-items: center;
        }
        .category-separator {
          color: rgba(200, 200, 200, 1); /* 회색 점 색상 */
          font-size: 16px; /* 점 크기 */
        }
        /* Safari 기본 스타일 제거 */
        input {
            -webkit-appearance: none; /* iOS 기본 스타일 제거 */
            appearance: none; /* 다른 브라우저에서도 적용 */
            background-color: transparent; /* 배경색 투명화 */
            box-shadow: none; /* 박스 그림자 제거 */
        }
        /* 검색 창일 경우 */
        input[type="search"] {
            -webkit-appearance: none;
            appearance: none;
            background-color: transparent;
            box-shadow: none;
        }

      `}</style>
        </div>
    );
};
