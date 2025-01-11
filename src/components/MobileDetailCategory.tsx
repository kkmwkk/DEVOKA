import * as React from 'react';
import { MobileDetailCategoryProps } from './mobile/types';

export const MobileDetailCategory: React.FC<MobileDetailCategoryProps> = ({ label, isActive, onClick }) => {
    return (
        <div className={`MobileDetailCategory ${isActive ? 'active' : ''}`} onClick={onClick}>
            {label}
            <style>{`
        .MobileDetailCategory {
          width: 66px !important;
          height: 40px !important;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(246, 248, 250, 1);
          border-radius: 0;
          cursor: pointer;
          font-weight: 500;
          font-size: 16px;
          line-height: 2;
          font-family: 'Pretendard', -apple-system, Roboto, Helvetica, sans-serif;
        }
        .active {
          background-color: rgba(255, 111, 29, 1);
          color: rgba(255, 255, 255, 1);
          border-radius: 6px;
        }
      `}</style>
        </div>
    );
};
