import React, { useState } from 'react';
import MobileSearchBar from './MobileSearchBar';

interface RecentSearchItem {
    id: number;
    label: string;
}

const MobileRecentSearchPage: React.FC = () => {
    const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);

    const handleSearch = (value: string) => {
        if (!value.trim()) return; // 빈 검색어는 추가하지 않음

        // 중복 제거 및 최신 검색어 우선
        setRecentSearches((prevSearches) => {
            const filteredSearches = prevSearches.filter(
                (item) => item.label !== value
            );
            return [{ id: Date.now(), label: value }, ...filteredSearches];
        });
    };

    const handleDeleteItem = (id: number) => {
        setRecentSearches(recentSearches.filter((item) => item.id !== id));
    };

    const handleClearAll = () => {
        setRecentSearches([]);
    };

    return (
        <div style={styles.container}>
            {/* Search Bar */}
            <div style={styles.searchBarContainer}>
                <MobileSearchBar onSearch={handleSearch}/>
            </div>


            {/* Recent Searches */}
            <div style={styles.recentSearchContainer}>
                <div style={styles.header}>
                    <span style={styles.title}>최근 검색어</span>
                    <button style={styles.clearButton} onClick={handleClearAll}>
                        전체삭제
                    </button>
                </div>
                <div style={styles.searchItemWrapper}>
                    <div style={styles.searchItemContainer}>
                        {recentSearches.map((item) => (
                            <div key={item.id} style={styles.searchItem}>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        height: '100vh',
        maxWidth: '375px',
        margin: '0 auto',
    },
    searchBarContainer: {
        display: 'flex',
        justifyContent: 'center', // 가운데 정렬
        margin: '16px auto',
    },
    recentSearchContainer: {
        marginTop: '16px',
        padding: '16px 24px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    },
    title: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#1F1F1F',
    },
    clearButton: {
        fontSize: '14px',
        color: '#767676',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    searchItemWrapper: {
        overflowX: 'auto', // 가로 스크롤 활성화
        whiteSpace: 'nowrap', // 검색 아이템이 한 줄로 정렬되도록 설정
    },
    searchItemContainer: {
        display: 'inline-flex', // 가로로 나열
        gap: '8px', // 검색 아이템 간격
    },
    searchItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F6F6F6',
        borderRadius: '50px',
        padding: '8px 16px',
        fontSize: '14px',
        color: '#1F1F1F',
        cursor: 'pointer',
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        fontSize: '16px',
        marginLeft: '8px',
        color: '#767676',
        cursor: 'pointer',
    },
};

export default MobileRecentSearchPage;
