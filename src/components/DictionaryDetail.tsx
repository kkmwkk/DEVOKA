import * as React from 'react';
import { CategoryDetailList } from './CategoryDetailList';
import { DictionaryDetailList } from './DictionaryDetailList';
import { PopularSearches } from './PopularSearches';
import { dictionaryItems, popularSearches } from '../data';

export const DictionaryDetail: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('전체');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [recentSearches, setRecentSearches] = React.useState<string[]>([]); // 초기 상태는 빈 리스트
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setIsDropdownVisible(value.trim() === ''); // 검색어가 없을 때만 드롭다운 표시
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
            setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]); // 최근 검색어 업데이트 (최대 5개)
        }
        setIsDropdownVisible(false); // 검색 후 드롭다운 숨김
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(); // 엔터 키 입력 시 검색 동작 수행
        }
    };

    const handleSearchFocus = () => {
        if (searchQuery.trim() === '') {
            setIsDropdownVisible(true); // 검색어가 없을 때만 드롭다운 표시
        }
    };

    const handleSearchBlur = () => {
        setTimeout(() => setIsDropdownVisible(false), 150); // 블러 시 드롭다운 숨김 (딜레이 추가)
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
    };

    const handleRecentSearchClick = (search: string) => {
        setSearchQuery(search); // 검색어를 클릭한 값으로 설정
        handleSearchSubmit(); // 검색 동작 수행
    };

    const filteredItems = dictionaryItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dictionary">
            <header className="dictionary-header">
                <div className="header-content">
                    <h1 className="header-title">IT용어백과사전</h1>
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="검색어를 입력하세요..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                        />
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c596cef1c32e760dac901c9a9712d5b1fae14bb84b02a22b20c1256d88027778?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                            alt="search-icon"
                            className="search-icon"
                            onClick={handleSearchSubmit}
                        />
                        {isDropdownVisible && (
                            <div className="recent-searches">
                                {recentSearches.length > 0 ? (
                                    <>
                                        <div className="recent-header">
                                            <span className="recent-title">최근검색어</span>
                                            <button onClick={clearRecentSearches} className="clear-button">
                                                검색 전체 삭제
                                            </button>
                                        </div>
                                        <ul className="recent-list">
                                            {recentSearches.map((search, index) => (
                                                <li
                                                    key={index}
                                                    className="recent-item"
                                                    onClick={() => handleRecentSearchClick(search)}
                                                >
                                                    {search}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <div className="no-recent-searches">
                                        <p className="no-recent-title">최근 검색어 없음</p>
                                        <p className="no-recent-description">
                                            검색 기록이 없습니다. 검색어를 입력해보세요.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
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
                        <DictionaryDetailList items={filteredItems} category={selectedCategory} />
                    </div>
                    <aside className="sidebar">
                        <PopularSearches items={popularSearches} />
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

                .dictionary {
                    background-color: #f6f8fa;
                }

                .dictionary-header {
                    background-color: #fff;
                    padding: 16px 16.8423%;
                    box-sizing: border-box;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }

                .header-content {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .header-title {
                    color: #1f1f1f;
                    font: 600 24px/1.4 Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
                    font-weight: 600;
                    letter-spacing: -0.5px;
                    margin: 0;
                }

                .search-wrapper {
                    display: flex;
                    align-items: center;
                    border: 1px solid #ebebeb;
                    border-radius: 8px;
                    padding: 8px 16px;
                    background-color: #fff;
                    max-width: 680px; /* 서칭바 길이 */
                    width: 100%;
                    position: relative;
                    box-sizing: border-box;
                    z-index: 2000; 
                }

                .search-bar {
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    color: #1f1f1f;
                    background-color: transparent;
                }

                .search-bar::placeholder {
                    color: #767676;
                }

                .search-icon {
                    width: 28px;
                    height: 28px;
                    cursor: pointer;
                }

                .recent-searches {
                    position: absolute;
                    top: calc(100% + 4px);
                    left: 0;
                    width: 100%;
                    max-width: inherit;
                    border: 1px solid #ebebeb;
                    border-radius: 8px;
                    background-color: #fff;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    z-index: 2000;
                    padding: 12px;
                    box-sizing: border-box;
                }

                .recent-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #1f1f1f;
                }

                .clear-button {
                    background: none;
                    border: none;
                    color: #767676;
                    font-size: 12px;
                    cursor: pointer;
                }

                .recent-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .recent-item {
                    font-size: 14px;
                    color: #1f1f1f;
                    padding: 8px 0;
                    cursor: pointer;
                }

                .no-recent-searches {
                    text-align: center;
                    padding: 20px 0;
                    color: #767676;
                }

                .no-recent-title {
                    font-size: 16px;
                    font-weight: bold;
                    color: #1f1f1f;
                    margin-bottom: 8px;
                }

                .no-recent-description {
                    font-size: 12px;
                    color: #767676;
                }

                .dictionary-main {
                    padding: 32px 16.8422%;
                    margin-top: 16px;
                }

                .content-wrapper {
                    display: flex;
                    gap: 80px;
                }

                .dictionary-content {
                    flex: 1;
                }

                .sidebar {
                    width: 30%;
                }

                @media (max-width: 991px) {
                    .content-wrapper {
                        flex-direction: column;
                        gap: 10px;
                    }

                    .sidebar {
                        width: 100%;
                    }
                }
                        
            `}</style>
        </div>
    );
};
