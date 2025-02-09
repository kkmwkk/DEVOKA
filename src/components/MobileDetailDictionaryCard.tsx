import * as React from 'react';
import { MobileDetailDictionaryCardProps } from './mobile/types';

export const MobileDetailDictionaryCard: React.FC<MobileDetailDictionaryCardProps> = ({ item, isLast, searchKeyword }) => {
    // HTML 엔티티 인코딩 함수
    const encodeHTML = (str: string) => {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    // 검색어를 강조하는 함수
    const highlightText = (text: string, keyword: string) => {
        if (!keyword.trim()) return encodeHTML(text);
        const regex = new RegExp(`(${keyword})`, 'gi');
        return encodeHTML(text).replace(regex, '<span class="highlight">$1</span>');
    };

    return (
        <div className="dictionary-card" style={{ borderBottom: isLast ? 'none' : '0.5px solid rgba(235, 235, 235, 1)' }}>
            <h3
                className="title"
                dangerouslySetInnerHTML={{
                    __html: highlightText(item?.korName || "제목 없음", searchKeyword || ""),
                }}
            />
            <div
                className="title-en"
                dangerouslySetInnerHTML={{
                    __html: highlightText(item?.engName || "No English title available", searchKeyword || ""),
                }}
            />
            <p
                className="description"
                dangerouslySetInnerHTML={{
                    __html: highlightText(item?.definition || "No description provided.", searchKeyword || ""),
                }}
            />
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
                    margin: 0 auto; /* 중앙 정렬 */
                }

                .title {
                    font-size: 18px;
                    color: #1F1F1F;
                    font-weight: 500;
                    margin: 0 0 6px;
                    line-height: 1.4;
                }
                .title-en {
                    color: #8D8D8D;
                    font-size: 14px;
                    margin: 0 0 6px;
                }
                .description {
                    color: #444449;
                    font-size: 16px;
                    line-height: 24px;
                    margin: 0;
                }
                .highlight {
                    /*background-color: #FFE4A3;*/
                    color: #FF6F1D;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};
