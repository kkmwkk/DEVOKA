import * as React from 'react';
import { TagItem } from '../type';

interface TagSuggestionsProps {
    suggestions: TagItem[][];
}

export const TagSuggestions: React.FC<TagSuggestionsProps> = ({ suggestions }) => {
    return (
        <div className="tag-suggestions">
            {suggestions.map((row, rowIndex) => (
                <div key={rowIndex} className="tag-row">
                    {row.map((tag) => (
                        <button key={tag.id} className="tag">
                            {tag.text}
                        </button>
                    ))}
                </div>
            ))}
            <style>{`
        .tag-suggestions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tag {
          border-radius: 100px;
          background-color: #f7f7fb;
          padding: 12px 20px;
          border: 1px solid #ebebeb;
          color: #1f1f1f;
          font: 600 14px/1 Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
          letter-spacing: -0.35px;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .tag {
            white-space: normal;
          }
        }
      `}</style>
        </div>
    );
};