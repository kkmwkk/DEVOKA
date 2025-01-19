import React from 'react';
import MobileSearchBar from './MobileSearchBar';
import { MobilePopularSearches } from './MobilePopularSearches';
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface MobileDetailSearchPageProps {}
const MobileDetailSearchPage: React.FC<MobileDetailSearchPageProps> = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const handleSearch = async (value: string) => {
        // 검색한 데이터를 가지고 detailPage 로 이동.
        // 1. 검색한 데이터를 가지고 백엔드 서버 api 호출
        // 2. 리턴받는 단어 데이터를 가지고 디테일 페이지로 이동
        // 3. 개발와 관련된 데이터만 들어온다면 개발 카테고리만 보여주면 되지만, 여러 카테고리의 데이터가 들어온다면 전체로 보여주는게 맞는건가?
        const url = 'http://localhost:8080/api/terms/search'; // 프로토콜 포함
        try{
            const response = await axios.get(url, {params: {keyword: value}});
            console.log('검색 결과 : ', response) // response: array
            navigate('/mobileDetail', { state: { results: response.data.response, searchValue : value} });
        }catch(e){
            console.error('검색 중 에러가 발생 : ', e)
        }
    };


    return (
        <div style={styles.container}>
            {/* Search Bar Component */}
            <div style={styles.searchBarContainer}>
                <MobileSearchBar onSearch={handleSearch}/>
            </div>

            {/* Popular Searches Component */}
            <div style={styles.popularSearchContainer}>
                <MobilePopularSearches/>
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
        boxSizing: 'border-box', // 패딩 계산 방식을 명시적으로 설정
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
