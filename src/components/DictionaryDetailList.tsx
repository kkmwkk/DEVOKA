import * as React from 'react';
import { DictionaryItem } from '../type';

interface DictionaryListProps {
    items: DictionaryItem[];
    category: string;
}

export const DictionaryDetailList: React.FC<DictionaryListProps> = ({ items, category }) => {
    const filteredItems = category === '전체'
        ? items
        : items.filter(item => item.category === category);

    return (
        <section className="dictionary-detail-section">
            <h2 className="category-title">{category}</h2>
            <div className="dictionary-list">
                {filteredItems.map((item, index) => (
                    <article key={index} className="dictionary-item">
                        <h3 className="item-title">{item.title}</h3>
                        <p className="item-english">{item.englishTitle}</p>
                        <p className="item-description">{item.description}</p>
                    </article>
                ))}
            </div>

            <div className="more-wrapper">
                <button className="more-button">
                    {`${category} 더보기`}
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb167a14231989934acb5333885386e7d98b1b768ea1e7c68e9cbe0ebe4f8cfd?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                        alt=""
                        className="more-icon"
                    />
                </button>
            </div>

            <style>{`
        .dictionary-detail-section {
          max-width: 838px; /* 너비 고정 */
          margin: 0 auto; /* 중앙 정렬 */
          border-radius: 16px;
          background-color: #fff;
          padding: 32px;
          border: 1px solid #ebebeb;
          box-sizing: border-box;
        }
        .category-title {
          color: #1f1f1f;
          font-size: 18px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.45px;
          margin: 0 0 16px;
        }
        .dictionary-list {
          display: flex;
          flex-direction: column;
          overflow: hidden; /* 내부 스크롤 방지 */
        }
        .dictionary-item {
          padding: 32px 0;
          border-bottom: 1px solid #ebebeb;
        }
        .item-title {
          color: #1f1f1f;
          font-size: 16px;
          line-height: 1;
          letter-spacing: -0.4px;
          margin: 0;
        }
        .item-english {
          color: #b5b5b7;
          margin: 4px 0;
          line-height: 1;
        }
        .item-description {
          color: #1f1f1f;
          font-weight: 400;
          line-height: 20px;
          margin: 4px 0 0;
        }
        .more-wrapper {
          text-align: right;
          margin-top: -18px;
        }
        .more-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #fff;
          border: 1px solid #ebebeb;
          border-radius: 8px;
          padding: 9px 62px;
          color: #1f1f1f;
          font: 400 13px/1 Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
          letter-spacing: -0.33px;
          cursor: pointer;
        }
        .more-icon {
          width: 12px;
          height: 12px;
        }
        @media (max-width: 991px) {
          .dictionary-detail-section {
            max-width: 100%; /* 작은 화면에서 너비를 100%로 조정 */
            padding: 16px; /* 패딩 조정 */
          }
        }
      `}</style>
        </section>
    );
};
