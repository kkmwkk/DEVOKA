import * as React from 'react';
import { MobileDetailCategory } from './MobileDetailCategory';
import { MobileDetailDictionaryCard } from './MobileDetailDictionaryCard';
import { categories, allCategoryItems } from './mobile/data';

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
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0942d2330b7121e64ed4d31c4a3c6aad2e6c3799edd5e44eab1732e3610d6ed?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60" alt="" className="search-icon" />
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
                        <h2 className="section-title">{category}</h2>
                        {allCategoryItems[category].slice(0, 4).map((item) => (
                            <MobileDetailDictionaryCard key={item.title} item={item} />
                        ))}
                        <button className="more-button">
                            <span>{category} 더보기</span>
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb167a14231989934acb5333885386e7d98b1b768ea1e7c68e9cbe0ebe4f8cfd?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60" alt="" className="arrow-icon" />
                        </button>
                    </div>
                ))}
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
          font: 600 24px/1.2 Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
          margin: 0;
        }
        .search-icon {
          width: 24px;
          height: 24px;
        }
        .main-content {
          background-color: #fff;
          padding: 0 24px 24px;
          box-sizing: border-box;
        }
        .categories-outer {
          width: 327px;
          height: 52px;
          margin: 0 auto 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(246, 248, 250, 1);
          border-radius: 8px;
        }
        .categories-inner {
          width: 315px;
          height: 40px;
          display: flex;
          gap: 0;
        }
        .section-title {
          font-size: 20px;
          font-weight: 600;
          margin: 24px 0;
        }
        .more-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid rgba(235, 235, 235, 1);
          border-radius: 8px;
          padding: 10px 48px;
          margin: 16px auto;
          background: none;
          cursor: pointer;
          color: #000; /* 명시적으로 검정색 설정 */
          text-decoration: none; /* 링크 스타일 제거 */
        }
        .more-button span {
          color: inherit; /* 버튼 색상 상속 */
        }       
        .arrow-icon {
          width: 12px;
          height: 12px;
        }
      `}</style>
        </div>
    );
};