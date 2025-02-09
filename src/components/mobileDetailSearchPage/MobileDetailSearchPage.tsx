import React from 'react';
import MobileSearchBar from '../MobileSearchBar';
import { MobilePopularSearches } from '../MobilePopularSearches';
import {useNavigate} from "react-router-dom";
import apiClient from "../../api/api"
import styles from "./MobileDetailSearchPage.module.css"

interface RecentSearchItem {
    id: number;
    label: string;
}

interface MobileDetailSearchPageProps {}
const MobileDetailSearchPage: React.FC<MobileDetailSearchPageProps> = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const handleSearch = async (value: string) => {
        // 정규식: 특수문자 허용 X
        const validPattern = /^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
        if (!validPattern.test(value)) {
            alert('특수문자는 검색이 불가합니다.');
            return;
        }
        // 최근 검색어 저장 로직
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        const updatedSearches = [
            { id: Date.now(), label: value },
            ...storedSearches.filter((item: RecentSearchItem) => item.label !== value)
        ].slice(0, 10);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

        // 기존 API 호출 로직
        try {
            const response = await apiClient.get('/api/terms/search', { params: { keyword: value } }); // URL과 params 전달
            if(response.data.response.length > 0){
                navigate('/mobileDetail', { state: { results: response.data.response, searchValue: value } });
            }else{
                navigate('/search/empty', {state: {emptySearchValue: value}})
            }
        } catch (e) {
            console.error('검색 중 에러가 발생: ', e);
        }
    };


    return (
        <div className={styles.container}>
            <MobileSearchBar onSearch={handleSearch}/>
            {/* Popular Searches Component */}
            <div className={styles.popularSearchContainer}>
                <MobilePopularSearches onSearch={handleSearch}/>
            </div>
        </div>
    );
};


export default MobileDetailSearchPage;
