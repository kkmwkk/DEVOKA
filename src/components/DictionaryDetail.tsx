import * as React from 'react';
import { CategoryDetailList } from './CategoryDetailList';
import { DictionaryDetailList } from './DictionaryDetailList';
import { PopularSearches } from './PopularSearches';
import { dictionaryItems, popularSearches } from '../data';

export const DictionaryDetail: React.FC = () => {
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

            <main className="dictionary-main">
                <div className="content-wrapper">
                    <div className="dictionary-content">
                        <DictionaryDetailList
                            items={dictionaryItems}
                            category={selectedCategory}
                        />
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

.dictionary-content {
  flex: 1;
}

.sidebar {
  width: 30%;
}

@media (max-width: 991px) {
  .dictionary-header {
    padding: 10px 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 10px;
  }

  .content-wrapper {
    flex-direction: column;
    padding: 0 16px;
  }

  .sidebar {
    width: 100%;
  }
}

      `}</style>
        </div>
    );
};