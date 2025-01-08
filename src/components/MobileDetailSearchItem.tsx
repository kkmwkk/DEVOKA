import * as React from 'react';
import { MobileDetailSearchItemProps } from './mobile/types';

export const MobileDetailSearchItem: React.FC<MobileDetailSearchItemProps> = ({ rank, term, isTop3 }) => {
    return (
        <div className="mobile-detail-search-item">
            <span className={`rank ${isTop3 ? 'top-rank' : ''}`}>{rank}</span>
            <span className="term">{term}</span>
            <style>{`
        .mobile-detail-search-item {
          border-radius: 16px;
          display: flex;
          min-height: 36px;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 400;
          white-space: nowrap;
          line-height: 1;
          justify-content: start;
          padding: 0px 0px 9px 0px;
        }
        .rank {
          align-self: stretch;
          width: 15px;
          margin: auto 0;
          color: rgba(31, 31, 31, 1); /* 기본 색상 */
        }
        .rank.top-rank {
          color: rgba(22, 39, 223, 1); /* Top 3 색상 */
        }
        .term {
          color: rgba(31, 31, 31, 1);
          letter-spacing: -0.35px;
          align-self: stretch;
          width: 230px;
          margin: auto 0;
        }
      `}</style>
        </div>
    );
};