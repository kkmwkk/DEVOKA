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
  overflow-x: hidden;
  width: 100%;
}



/* 전체 페이지에서 스크롤바가 안 보이게 설정 */
body {
  overflow: hidden;
}

/* 콘텐츠 영역에서만 스크롤바 표시 */
.content-wrapper {
  overflow-y: auto;
  height: calc(100vh - 50px); /* 상단 헤더를 제외한 나머지 영역에 스크롤을 적용 */
}


.dictionary {
  background-color: #f6f8fa;
}

.dictionary-header {
  background-color: #fff;
  padding: 16px 7%; /* 비율 기반 패딩으로 수정 */
  box-sizing: border-box;
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
  padding: 32px 5%; /* 비율 기반 패딩 */

}

.content-wrapper {
  max-width: 1238px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  box-sizing: border-box;
}

.dictionary-content {
  flex: 1;
  overflow-y: auto; /* 이 부분만 스크롤 가능 */

}

.sidebar {
  width: 30%; /* 비율 기반 너비 */
}

@media (max-width: 991px) {
  .dictionary-header {
    padding: 10px 16px; /* 작은 화면에서 패딩 감소 */
  }

  .header-content {
    flex-direction: column; /* 헤더 콘텐츠를 세로로 정렬 */
    gap: 10px;
  }

  .content-wrapper {
    flex-direction: column;
    padding: 0 16px; /* 작은 화면에서 양쪽 패딩 축소 */
  }

  .sidebar {
    width: 100%; /* 작은 화면에서 전체 너비로 확장 */
  }
}
      `}</style>
        </div>
    );
};