import * as React from 'react';
import {MobileMainCategoryButton} from "./MobileMainCategoryButton";
import {MobileMainSearchBar} from "./MobileMainSearchBar";

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
                {categories.map((category) => (
                    <MobileMainCategoryButton key={category} label={category} />
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
          gap: 20px;
          justify-content: space-between;
        }
      `}</style>
        </div>
    );
};