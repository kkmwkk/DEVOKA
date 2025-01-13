import React, { useState } from 'react';
import MobileSearchBar from './MobileSearchBar';

interface RecentSearchItem {
    id: number;
    label: string;
}

const MobileRecentSearchPage: React.FC = () => {
    const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);

    const handleSearch = (value: string) => {
        if (!value.trim()) return;

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
            <div style={styles.searchBarContainer}>
                <MobileSearchBar onSearch={handleSearch} />
            </div>

            <div style={styles.recentSearchContainer}>
                <div style={styles.header}>
                    <span style={styles.title}>최근 검색어</span>
                    <button style={styles.clearButton} onClick={handleClearAll}>
                        전체삭제
                    </button>
                </div>
                <div style={styles.searchItemWrapper} className="searchItemWrapper">
                    <div style={styles.searchItemContainer}>
                        {recentSearches.map((item) => (
                            <div key={item.id} style={styles.searchItem}>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>
                {`
                .searchItemWrapper::-webkit-scrollbar {
                    display: none; /* Chrome, Safari 스크롤바 숨기기 */
                }
                `}
            </style>
        </div>
    );
};




const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        height: '100vh',
        maxWidth: '390px',
        margin: '0 auto',
    },
    searchBarContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '16px auto',
    },
    recentSearchContainer: {
        marginTop: '0px',
        padding: '8px 0',
        overflowX: 'hidden',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        padding: '0 16px',
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
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        padding: '0', // 패딩 제거
        margin: '0 auto', // 중앙 정렬
        boxSizing: 'border-box',
    },
    searchItemContainer: {
        paddingLeft : '16px',
        display: 'inline-flex',
        gap: '8px',

    },
    searchItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F6F6F6',
        borderRadius: '50px', // 둥근 모서리 유지
        padding: '8px 16px',
        fontSize: '14px',
        color: '#1F1F1F',
        cursor: 'pointer',
        border: '1px solid #EBEBEB', // 테두리 추가
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
