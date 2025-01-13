import React from 'react';
import MobileSearchBar from './MobileSearchBar';
import { MobilePopularSearches } from './MobilePopularSearches';

const MobileDetailSearchPage: React.FC = () => {
    return (
        <div style={styles.container}>
            {/* Search Bar Component */}
            <div style={styles.searchBarContainer}>
                <MobileSearchBar />
            </div>

            {/* Popular Searches Component */}
            <div style={styles.popularSearchContainer}>
                <MobilePopularSearches />
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        height: '100vh', // 화면 전체를 채우기 위해 사용
        maxWidth: '375px',
        margin: '0 auto',
    },
    searchBarContainer: {
        display: 'flex',
        justifyContent: 'center', // 가운데 정렬
        margin: '16px auto',
    },
    popularSearchContainer: {
        flex: 1,
        padding: '0px 16px 16px 16px',
    },
};

export default MobileDetailSearchPage;
