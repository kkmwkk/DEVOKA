import * as React from 'react';
import { TagSuggestions } from './TagSuggestions';
import { tagSuggestions } from '../Data/tagSuggestions';
import {CategoryDetailList} from "./CategoryDetailList";
import {PopularSearches} from "./PopularSearches";
import {popularSearches} from "../data";


export const DictionaryNoSearchDetail: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('전체');
    return (
        <div className="dictionary">
            <header className="dictionary-header">
                <div className="header-content">
                    <h1 className="header-title">IT용어백과사전</h1>
                    <div className="search-wrapper">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c596cef1c32e760dac901c9a9712d5b1fae14bb84b02a22b20c1256d88027778?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                            alt="" className="search-icon"/>
                    </div>
                </div>
            </header>

            <CategoryDetailList
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
            />

            <main className="main-content">
                <div className="content-grid">
                    <div className="suggestions-column">
                        <div className="suggestions-container">
                            <div className="empty-state">
                                <p className="empty-title">검색어를 입력하지 않았어요.</p>
                                <p className="empty-description">
                                    무엇을 검색할지 고민되신다면 IT용어백과사전 크루가 용어를 추천드릴게요.
                                </p>
                            </div>
                            <TagSuggestions suggestions={tagSuggestions}/>
                        </div>
                    </div>
                    <aside className="sidebar">
                        <PopularSearches items={popularSearches}/>
                    </aside>
                </div>
            </main>



            <style>{`
    html, body {
      margin: 0;
      padding: 0;
      overflow-x: hidden; /* 가로 스크롤 방지 */
      width: 100%;
    }
    
    .dictionary {
      background-color: #f6f8fa;
    }
    
    .dictionary-header {
      background-color: #fff;
      padding: 16px 7%;
      box-sizing: border-box;
      position: sticky; /* 헤더를 고정 */
      top: 0;
      z-index: 1000;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      gap: 16px;
      max-width: 592px;
    }
    
    .header-title {
      color: #1f1f1f;
      font: 600 20px/1.4 Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
      letter-spacing: -0.5px;
      margin: 0;
    }
    
    .search-wrapper {
      flex-grow: 1;
      border: 1px solid #ebebeb;
      border-radius: 8px;
      padding: 8px 20px;
      background-color: #fff;
      display: flex;
      justify-content: flex-end;
    }
    
    .search-icon {
      width: 28px;
      height: 28px;
    }
    
    .dictionary-main {
      padding: 32px 5%;
    }
    
    .content-wrapper {
      min-height: calc(100vh - 50px); /* 헤더를 제외한 전체 높이 */
      margin: 0 auto;
      display: flex;
      gap: 20px;
      box-sizing: border-box;
    }
    
    
    .sidebar {
  width: 30%;
}
    .main-content {
          padding: 32px 5%;
        }
        .content-grid {
          min-height: calc(100vh - 50px); /* 헤더를 제외한 전체 높이 */
          box-sizing: border-box;
          margin: 0 auto;
          display: flex;
          gap: 20px;
        }
        .suggestions-column {
          flex: 0 0 68.441%;
        }
        .popular-column {
          flex: 0 0 28%;
        }
        .suggestions-container {
          border-radius: 16px;
          background-color: #fff;
          padding: 32px;
          border: 1px solid #ebebeb;
        }
        .empty-state {
          margin-bottom: 32px;
        }
        .empty-title {
          color: #1f1f1f;
          font: 500 16px/1 Pretendard, sans-serif;
          letter-spacing: -0.4px;
          margin-bottom: 4px;
          margin-top: 0px;
        }
        .empty-description {
          color: #1f1f1f;
          font: 400 14px/1 Pretendard, sans-serif;
          letter-spacing: -0.35px;
        }
        @media (max-width: 991px) {
          .content-grid {
            flex-direction: column;
            padding: 0 20px;
          }
          .suggestions-container {
            padding: 20px;
          }
          .suggestions-column,
          .popular-column {
            flex: 0 0 100%;
          }
        }
        .sidebar {
            width: 100%;
        }
}

      `}</style>
        </div>


    )
};