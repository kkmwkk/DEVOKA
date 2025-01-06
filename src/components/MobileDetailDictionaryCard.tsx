import * as React from 'react';
import { MobileDetailDictionaryCardProps } from './mobile/types';

export const MobileDetailDictionaryCard: React.FC<MobileDetailDictionaryCardProps> = ({ item }) => {
    return (
        <div className="dictionary-card">
            <h3 className="title">{item.title}</h3>
            <div className="title-en">{item.titleEn}</div>
            <p className="description">{item.description}</p>
            <style>{`
        .dictionary-card {
          width: 327px;
          height: 156px;
          border-bottom: 1px solid rgba(235, 235, 235, 1);
          display: flex;
          flex-direction: column;
          padding: 16px 0;
        }
        .title {
          font-size: 16px;
          width: 327px;
          height: 20px;
          line-height: 1.4;
          margin: 0 0 4px;
        }
        .title-en {
          color: rgba(181, 181, 183, 1);
          font-size: 14px;
          width: 327px;
          height: 20px;
          margin: 0 0 4px;
        }
        .description {
          font-size: 14px;
          width: 327px;
          height: 69px;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
        </div>
    );
};