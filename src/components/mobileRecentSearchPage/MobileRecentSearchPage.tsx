import React, { useState, useEffect } from 'react';
import MobileSearchBar from '../MobileSearchBar';
import {useNavigate} from "react-router-dom";
import apiClient from "../../api/api"
import styles from './MobileRecentSearchPage.module.css';

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
        // 정규식: 특수문자 허용 X
        const validPattern = /^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
        if (!validPattern.test(value)) {
            alert('특수문자는 검색이 불가합니다.');
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
        try {
            const response = await apiClient.get('/api/terms/search', { params: { keyword: value } }); // URL과 params 전달
            if (response.data.response.length > 0) {
                navigate('/mobileDetail', { state: { results: response.data.response, searchValue: value } });
            } else {
                navigate('/search/empty', { state: { emptySearchValue: value } });
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
        <div className={styles.container}>
            <MobileSearchBar onSearch={handleSearch}/>

            <div className={styles.recentSearchContainer}>
                <div className={styles.header}>
                    <span className={styles.title}>최근 검색어</span>
                    <button className={styles.clearButton} onClick={handleClearAll}>
                        전체삭제
                    </button>
                </div>

                <div className={styles.searchItemWrapper}>
                    <div className={styles.searchItemContainer}>
                        {recentSearches.map((item) => (
                            <div key={item.id} className={styles.searchItem}
                                 onClick={() => handleRecentSearchClick(item.label)}>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileRecentSearchPage;
