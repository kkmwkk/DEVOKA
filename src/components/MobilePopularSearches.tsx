import * as React from 'react';
import { MobileDetailSearchItem } from './MobileDetailSearchItem';
import { MobileDetailSearchListProps } from './mobile/types';

const searchData: MobileDetailSearchListProps = {
    timestamp: '16:00 기준',
    items: [
        { rank: 1, term: 'UIUX', isTop3: true },
        { rank: 2, term: '버그', isTop3: true },
        { rank: 3, term: 'MAU', isTop3: true },
        { rank: 4, term: '개발자' },
        { rank: 5, term: 'SEO' },
        { rank: 6, term: '검색엔진' },
        { rank: 7, term: '디자이너' },
        { rank: 8, term: '그로스 해킹' },
        { rank: 9, term: 'PMF' },
        { rank: 10, term: 'AOV' }
    ]
};

export const MobilePopularSearches: React.FC = () => {
    return (
        <div className="popular-searches">
            <div className="search-container">
                <div className="popular-header">
                    <h2 className="popular-title">인기 검색어</h2>
                    <span className="timestamp">{searchData.timestamp}</span>
                </div>
                {searchData.items.map((item:any) => (
                    <MobileDetailSearchItem
                        key={item.rank}
                        rank={item.rank}
                        term={item.term}
                        isTop3={item.rank <= 3} // Top 3 랭크에 대해 블루 색상 적용
                    />
                ))}
            </div>
            <style>{`
        .popular-searches {
          border-radius: 0;
          display: flex;
          max-width: 375px;
          flex-direction: column;
          font-family: Pretendard, sans-serif;
        }
        .search-container {
          background-color: rgba(255, 255, 255, 1);
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: start;
        }
        .popular-header {
          margin-top: 8px;
          border-radius: 16px;
          display: flex;
          max-width: 343px;
          
          align-items: start;
          gap: 184px;
          font-family: Pretendard, sans-serif;
          justify-content: space-between;
        }
        .popular-title {
          height:22px;
          width:81px;
          color: #1F1F1F;
          font-size: 16px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.45px;
          margin: 0;
          padding: 0px 0px 12px 0px;
        }
        .timestamp {
          font-size: 14px;
          font-weight: 400;
          color: #767676;
          white-space: nowrap; /* 한 줄로 표시 */
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};