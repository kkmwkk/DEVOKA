import * as React from 'react';
import { MobileDetailCategoryProps } from './mobile/types';

export const MobileDetailCategory: React.FC<MobileDetailCategoryProps> = ({ label, isActive, onClick }) => {
    return (
        <div className={`MobileDetailCategory ${isActive ? 'active' : ''}`} onClick={onClick}>
            {label}
            <style>{`
        .MobileDetailCategory {
          width: 63px;
          height: 40px;
          font-size: 14px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(246, 248, 250, 1);
          border-radius: 0;
          cursor: pointer;
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
