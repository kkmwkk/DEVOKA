import * as React from 'react';

import { MobileMainCategoryButtonProps } from './mobile/types';

export const MobileMainCategoryButton: React.FC<MobileMainCategoryButtonProps> = ({ label }) => {
    return (
        <button className="category-button" tabIndex={0}>
            {label}
            <style>{`
        .category-button {
          color: #1F1F1F;
          white-space: nowrap;
          text-align: center;
          letter-spacing: -0.45px;
          font: 500 16px/2 Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .category-button:hover {
          color: rgba(31, 31, 31, 1);
        }
      `}</style>
        </button>
    );
};