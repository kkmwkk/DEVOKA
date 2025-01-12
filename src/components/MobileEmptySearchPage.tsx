import React from 'react';
import MobileSearchBar from './MobileSearchBar';

const EmptySearchPage: React.FC = () => {
    const recommendedKeywords = [
        '커미션', '게이미피케이션', 'ROI', 'MVP',
        '리눅스', '머신러닝', '로우데이터', '대외비',
        '알고리즘', '라디오버튼', 'CTA',
    ];

    return (
        <div style={styles.container}>
            {/* 상단 검색바 */}
            <MobileSearchBar onSearch={(value) => console.log(`검색: ${value}`)} />

            {/* 빈 검색어 메시지 */}
            <div style={styles.messageContainer}>
                <h2 style={styles.messageTitle}>검색어를 입력하지 않았어요.</h2>
                <p style={styles.messageSubtitle}>
                    무엇을 검색할지 고민되신다면, IT용어백과사전 크루가 새로운 용어를 추천드릴게요.
                </p>
            </div>

            {/* 추천 검색어 */}
            <div style={styles.recommendedContainer}>
                {recommendedKeywords.map((keyword, index) => (
                    <div key={index} style={styles.keywordItem}>
                        {keyword}
                    </div>
                ))}
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
        padding: '16px 24px',
        boxSizing: 'border-box',
    },
    messageContainer: {
        marginTop: '24px',
        textAlign: 'left', // 왼쪽 정렬
    },
    messageTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1F1F1F',
        marginBottom: '8px',
    },
    messageSubtitle: {
        fontSize: '14px',
        color: '#767676',
        lineHeight: '1.5',
    },
    recommendedContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', // 왼쪽 정렬
        gap: '12px',
        marginTop: '28px',
    },
    keywordItem: {
        backgroundColor: '#F6F6F6',
        borderRadius: '20px',
        padding: '8px 16px',
        fontSize: '14px',
        color: '#1F1F1F',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
    },
};

export default EmptySearchPage;
