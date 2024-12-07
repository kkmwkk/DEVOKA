import * as React from 'react';
import { PopularSearchItem } from '../type';

interface PopularSearchesProps {
    items: PopularSearchItem[];
}

export const PopularSearches: React.FC<PopularSearchesProps> = ({ items }) => {
    return (
        <aside className="popular-searches">
            <header className="popular-header">
                <h2 className="popular-title">인기 검색어</h2>
                <time className="popular-time">12.27 16:00:00</time>
            </header>
            <ul className="popular-list">
                {items.map((item) => (
                    <li key={item.id} className="popular-item">
                        <span className={`popular-rank ${item.isHot ? 'hot' : ''}`}>{item.id}</span>
                        <span className="popular-term">{item.term}</span>
                    </li>
                ))}
            </ul>
            <style>{`
        .popular-searches {
          border-radius: 16px;
          background-color: #fff;
          padding: 28px 32px;
          border: 1px solid #ebebeb;
          font-family: Pretendard, sans-serif;
        }
        .popular-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .popular-title {
          color: #1f1f1f;
          font-size: 15px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.38px;
          margin: 0;
        }
        .popular-time {
          color: #767676;
          font-size: 13px;
          line-height: 1;
        }
        .popular-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .popular-item {
          display: flex;
          align-items: center;
          padding: 9px 0;
          font-size: 13px;
          line-height: 1;
        }
        .popular-rank {
          width: 14px;
          margin-right: 12px;
          color: #1f1f1f;
        }
        .popular-rank.hot {
          color: #ff6f1d;
        }
        .popular-term {
          color: #1f1f1f;
          letter-spacing: -0.33px;
        }
        @media (max-width: 991px) {
          .popular-searches {
            padding: 0 20px;
          }
        }
      `}</style>
        </aside>
    );
};