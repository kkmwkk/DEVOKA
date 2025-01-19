import * as React from 'react';
import { MobileDetailDictionaryCardProps } from './mobile/types';

export const MobileDetailDictionaryCard: React.FC<MobileDetailDictionaryCardProps> = ({ item }) => {
    return (
        <div className="dictionary-card">
            <h3 className="title">{item.korName || "Untitled"}</h3>
            <div className="title-en">{item.engName || "No English title available"}</div>
            <p className="description">{item.definition || "No description provided."}</p>
            <style>{`
        .dictionary-card {
          width: 343px;
          min-height: 156px;
          border-bottom: 1px solid rgba(235, 235, 235, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0px;
          box-sizing: border-box;
        }
        .title {
          font-size: 18px;
          color: #1048BE;
          font-weight: 500;
          margin: 0 0 6px;
          line-height: 1.4;
        }
        .title-en {
          color: rgba(181, 181, 183, 1);
          font-size: 14px;
          margin: 0 0 6px;
          line-height: 1.4;
        }
        .description {
          color: #444449;
          font-size: 16px;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
        </div>
    );
};
