import React, {useEffect, useState} from 'react';
import MobileSearchBar from './MobileSearchBar';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const EmptySearchPage: React.FC = () => {
    const location = useLocation()
    const { emptySearchValue = '' } = location.state || {};
    const [recommendedKeywords, setRecommendedKeywords] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState(emptySearchValue);
    const navigate = useNavigate(); // 페이지 이동을 위한 훅



    useEffect(() => {
        const fetchRecommendWordsData = async () => {
            try {
                const response = await axios.get('http://192.168.0.7:8080/api/terms/recommend');
                const tmpData = response.data.response
                const fnlData: string[] = []
                tmpData.forEach((val: { [x: string]: any }, index: number) => {
                    if (index <= 10) {
                        if (val.hasOwnProperty('korName') && val.korName !== "") {
                            fnlData.push(val.korName)
                        }
                    }
                })

                setRecommendedKeywords(fnlData || []); // API 응답 데이터를 상태로 저장
            } catch (e) {
                console.error('추천 검색어를 가져오는 중 오류 발생:', e);
            }
        }
        fetchRecommendWordsData(); // 컴포넌트 마운트 시 호출
    }, []) // 최초 1회 렌더링에서만 호출.

    useEffect(() => {
        // emptySearchValue가 변경될 때마다 상태를 업데이트
        setSearchValue(emptySearchValue || '');
    }, [emptySearchValue]);


    const handleSearch = async (value: string) => {
        const url = 'http://192.168.0.7:8080/api/terms/search'; // 프로토콜 포함
        try {
            const response = await axios.get(url, {params: {keyword: value}});
            if (response.data.response.length > 0) {
                navigate('/mobileDetail', {state: {results: response.data.response, searchValue: value}});
            } else {
                navigate('/mobileSearch3', {state: {emptySearchValue: value}})
            }
        } catch (e) {
            console.error('검색 중 에러가 발생 : ', e)
        }
    };


    return (
        <div style={styles.container}>
            {/* 상단 검색바 */}
            <MobileSearchBar onSearch={handleSearch}/>

            <div style={styles.messageContainer}>
                {searchValue ? (
                    <>
                        <h2 style={styles.messageTitle}>
                            '{searchValue}'에 대한 결과를 찾을 수 없어요.
                        </h2>
                        <p style={styles.messageSubtitle}>
                            무엇을 검색할지 고민되신다면, IT용어백과사전 크루가 새로운 용어를 추천드릴게요.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 style={styles.messageTitle}>검색어를 입력하지 않았어요.</h2>
                        <p style={styles.messageSubtitle}>
                            무엇을 검색할지 고민되신다면, IT용어백과사전 크루가 새로운 용어를 추천드릴게요.
                        </p>
                    </>
                )}
            </div>

            {/* 추천 검색어 */}
            <div style={styles.recommendedContainer}>
                {recommendedKeywords.map((keyword, index) => (
                    <div key={index} style={styles.keywordItem} onClick={() => {
                        handleSearch(keyword)
                    }}>
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
        fontSize: '16px',
        fontWeight: '600',
        color: '#1F1F1F',
        marginBottom: '12px',
    },
    messageSubtitle: {
        fontSize: '16px',
        color: '#767676',
        lineHeight: '1.5',
        marginTop: '0px',
        marginBottom: '0px'
    },
    recommendedContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', // 왼쪽 정렬
        gap: '12px',
        marginTop: '32px',
    },
    keywordItem: {
        backgroundColor: '#F6F6F6',
        borderRadius: '20px',
        padding: '8px 16px',
        fontSize: '14px',
        color: '#1F1F1F',
        textAlign: 'center',
        cursor: 'pointer',
        border: '1px solid #EBEBEB', // 테두리 추가
    },
};

export default EmptySearchPage;
