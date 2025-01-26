import React, { useState, useEffect } from 'react';
import MobileSearchBar from './MobileSearchBar';
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface RecentSearchItem {
    id: number;
    label: string;
}

const MobileRecentSearchPage: React.FC = () => {
    const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 데이터를 가져와 상태를 초기화
    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        setRecentSearches(storedSearches);
    }, []);

    const handleSearch = async (value: string) => {
        // 정규식: 영어, 한글, 숫자만 허용
        const validPattern = /^[a-zA-Z가-힣0-9\s]+$/;

        if (!validPattern.test(value)) {
            alert('영어, 한글, 숫자만 입력 가능합니다.');
            return;
        }

        // 로컬 스토리지에서 기존 데이터 가져오기
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

        // 중복 제거 및 최신 검색어 추가
        const updatedSearches = [
            { id: Date.now(), label: value },
            ...storedSearches.filter((item: RecentSearchItem) => item.label !== value)
        ].slice(0, 10); // 최근 검색어 최대 10개 유지

        // 로컬 스토리지에 저장
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

        setRecentSearches(updatedSearches);
        // 기존 API 호출 로직
        const url = 'http://192.168.0.7:8080/api/terms/search';
        try {
            const response = await axios.get(url, { params: { keyword: value } });
            if(response.data.response.length > 0){
                navigate('/mobileDetail', { state: { results: response.data.response, searchValue: value } });
            }else{
                navigate('/mobileSearch3', {state: {emptySearchValue: value}})
            }

        } catch (e) {
            console.error('검색 중 에러가 발생: ', e);
        }
    };

    const handleRecentSearchClick = (label: string) => {
        // 최근 검색어를 클릭했을 때 검색 실행
        handleSearch(label);
    };


    const handleClearAll = () => {
        // 상태 및 로컬 스토리지 초기화
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    return (
        <div style={styles.container}>
            <MobileSearchBar onSearch={handleSearch} />
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
                            <div key={item.id} style={styles.searchItem} onClick={()=>{handleRecentSearchClick(item.label)}}>
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
        maxWidth: '375px',
        margin: '0 auto',
        padding: '16px',
        boxSizing: 'border-box', // 패딩 계산 방식을 명시적으로 설정

    },
    searchBarContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '16px auto',
    },
    recentSearchContainer: {
        marginTop: '26px',
        padding: '0px',
        overflowX: 'hidden',

    },
    header: {
        display: 'flex', // 플렉스박스 활성화
        justifyContent: 'space-between', // 좌우로 정렬
        alignItems: 'center', // 세로 중앙 정렬
        marginBottom: '16px',
        padding: '0', // 좌우 여백 추가
        width: '100%', // 부모 요소의 너비를 100%로 설정
        boxSizing: 'border-box', // 패딩 포함 크기 계산
    },
    title: {
        fontSize: '16px',
        fontWeight: 600, // Semibold와 동일
        color: '#1F1F1F',
        margin: 0, // 여백 제거
    },
    clearButton: {
        fontSize: '14px',
        color: '#767676',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        margin: 0, // 여백 제거
        padding: 0, // 불필요한 패딩 제거
    },
    searchItemWrapper: {
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        padding: '0', // 패딩 제거
        margin: '0 auto', // 중앙 정렬
        boxSizing: 'border-box',
    },
    searchItemContainer: {
        paddingLeft : '0px',
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
