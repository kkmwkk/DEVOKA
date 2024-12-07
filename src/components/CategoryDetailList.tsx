import * as React from 'react';

interface CategoryListProps {
    selectedCategory: string;
    onCategorySelect: (category: string) => void;
}

const categories = ['전체', '개발', '경영', '디자인', '마케팅'];

export const CategoryDetailList: React.FC<CategoryListProps> = ({ selectedCategory, onCategorySelect }) => {
    return (
        <nav className="category-nav">
            <ul className="category-list">
                {categories.map((category) => (
                    <li key={category}>
                        <button
                            className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => onCategorySelect(category)}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
            <style>{`
        .category-nav {
          background-color: #fff;
          padding: 11px 70px 11px 7%;
          width: 100%;
        }
        .category-list {
          display: flex;
          width: 320px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .category-item {
          padding: 10px 12px;
          font: 600 14px/1 Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
          color: #1f1f1f;
          letter-spacing: -0.35px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .category-item.active {
          background-color: #ff6f1d;
          color: #fff;
          border-radius: 6px;
        }
        @media (max-width: 991px) {
          .category-nav {
            padding: 0 20px;
          }
        }
      `}</style>
        </nav>
    );
};