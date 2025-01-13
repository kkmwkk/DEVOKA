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
          font-size: 16px;
          font-weight: 400;
          white-space: nowrap;
          line-height: 1;
          justify-content: start;
          padding: 0px 0px 9px 0px;
        }
        .rank {
          align-self: stretch;
          width: 16px;
          margin: auto 0;
          color: #1F1F1F
          font-weight: 600;
        }
        .rank.top-rank {
          font-weight: 600;
          color: #FF6F1D; /* Top 3 색상 */
        }
        .term {
          color: #1F1F1F;
          letter-spacing: -0.35px;
          align-self: stretch;
          width: 230px;
          margin: auto 0;
        }
      `}</style>
        </div>
    );
};