import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'; // React Router 사용
import { MobileDetailCategory } from './MobileDetailCategory';
import { MobileDetailDictionaryCard } from './MobileDetailDictionaryCard';
import MobileSearchBar from "./MobileSearchBar";
import {Pagination} from "./Pagination";
import axios from "axios";
import apiClient from "../api/api";


export const MobileDetailDictionaryPage: React.FC = () => {

    /**
     * results : 단어 검색 후, 검색결과
     * searchValue : 어떤 단어를 검색했는지의 값
     * categoryId : 메인 페이지에서 클릭한 카테고리의 ID(A0001 ~ A0005)
     * */
    const location = useLocation();
    const { results: initialResults, searchValue: initialSearchValue, categoryId } = location.state || {};
    const [results, setResults] = useState(initialResults || []); // 검색 결과 상태
    const [searchValue, setSearchValue] = useState(initialSearchValue || ''); // 검색 입력 값
    const [activeCategory, setActiveCategory] = useState(categoryId || 'ALL'); // 초기 활성화된 카테고리
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const pageSize = 10; // 한 페이지에 표시할 데이터 수


    // 검색 기능
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
            ...storedSearches.filter((item: {id:number, label : string}) => item.label !== value)
        ].slice(0, 10);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));


        setSearchValue(value);

        if (!value.trim()) return; // 빈 값 처리

        try {
            const response = await apiClient.get("/api/terms/search", {
                params: { keyword: value },
            });
            if(response.data.response.length > 0){
                setResults(response.data.response); // 검색 결과 업데이트
                setActiveCategory('ALL'); // 카테고리 초기화
                setCurrentPage(1); // 페이지 초기화
            }else{
                navigate('/search/empty', {state: {emptySearchValue: value}})
            }

        } catch (error) {
            console.error("검색 실패:", error);
        }
    };
    // 카테고리 데이터
    const predefinedCategories = [
        { categoryId: 'ALL', categoryName: '전체'},
        { categoryId: 'A0001', categoryName: '개발' },
        { categoryId: 'A0002', categoryName: '경영' },
        { categoryId: 'A0003', categoryName: '디자인' },
        { categoryId: 'A0004', categoryName: '마케팅' },
    ];

    const displayedCategories =
        activeCategory === 'ALL'
            ? results
            : results.filter((category: any) => category.categoryId === activeCategory);

    // 현재 활성화된 카테고리 데이터 페이징 처리
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData =
        activeCategory === 'ALL'
            ? displayedCategories // 전체 카테고리는 각 카테고리에서 4개씩 표시
            : displayedCategories[0]?.data.slice(startIndex, endIndex) || [];


    const totalPages = Math.ceil((displayedCategories[0]?.data.length || 0) / pageSize);

    const handleCategoryChange = async (categoryId: string) => {
        // 1. 카테고리 클릭 시 active 된 카테고리를 바꾼다.
        setActiveCategory(categoryId);

        // 2. 현재 페이지를 초기화
        setCurrentPage(1);

        // 2. result 가 존재한다면 ? 카테고리 클릭으로 들어왔다는 거니까 다른 카테고리 클릭 시, 해당 카테고리의 데이터로 다 보여주기.
        if(initialResults && Array.isArray(initialResults) && initialResults.length > 0 && searchValue === ''){
            // initialResults 가 존재한다면 ? 카테고리 클릭으로 들어왔다는 것.
            if(categoryId !== "ALL"){
                try{
                    const response = await apiClient.get('/api/terms', {
                        params: {
                            page : 0,
                            size: 10000000,
                            categoryId: categoryId
                        },
                    });
                    // 메인페이지에서 카테고리 클릭 시, 들어오는 데이터와 인터페이스 통일화
                    const categoryData = response.data.response.data
                    const fnlResults = [{
                        categoryId : categoryId,
                        data : categoryData
                    }]
                    setResults(fnlResults)
                }catch (e){
                    console.error('데이터 로드 중 오류:', e);
                }
            }else{
                try{
                    const response = await apiClient.get('/api/terms/all', {
                        params: {
                            page : 0,
                            size: 4,
                        },
                    });
                    setResults(response.data.response)
                }catch(e){
                    console.error('데이터 로드 중 오류:', e);
                }
                console.log("ALL 클릭")
            }

        }
        // 3. 전체 카테고리 클릭 시, 전체 카테고리에 클릭 API 출력,
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 변경 시 스크롤 상단으로 이동
    };


    // 더보기 클릭 핸들러
    const handleMoreClick = (categoryId: string) => {
        handleCategoryChange(categoryId);
    };



    return (
        <div className="dictionary-container">
            <MobileSearchBar value={searchValue || ''} onSearch={handleSearch}/>
            <main className="main-content">
                <div className="categories-outer">
                    <div className="categories-inner">
                        {predefinedCategories.map((category: any) => (
                            <MobileDetailCategory
                                key={category.categoryId}
                                label={category.categoryName}
                                isActive={activeCategory === category.categoryId}
                                onClick={() => handleCategoryChange(category.categoryId)}
                            />
                        ))}
                    </div>
                </div>
                {/* 데이터 렌더링 */}
                {activeCategory === 'ALL' && displayedCategories.length > 0 ? (
                        displayedCategories.map((category: any) => (
                            <div key={category.categoryId}     className={`category-section ${activeCategory === 'ALL' ? 'all-category' : ''}`}>
                                {category.data.slice(0,4).map((item: any, index: number) => (
                                    <MobileDetailDictionaryCard
                                        key={item.termNo}
                                        item={item}
                                        isLast={index === 3}
                                        searchKeyword = {searchValue}

                                    />
                                ))}
                                {category.data.length > 0 && (
                                    <div className="more-button-wrapper">
                                        <div className="divider"></div> {/* 위쪽 구분선 */}
                                            <button
                                                className="more-button"
                                                onClick={() => handleMoreClick(category.categoryId)}
                                            >
                                                <span>{category.categoryName} 더보기</span>
                                                <img
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb167a14231989934acb5333885386e7d98b1b768ea1e7c68e9cbe0ebe4f8cfd?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                                                    alt=""
                                                    className="arrow-icon"
                                                />
                                            </button>
                                        <div className="divider"></div> {/* 아래쪽 구분선 */}
                                    </div>
                                )}
                            </div>
                        ))
                    )
                    : currentData.map((item: any, index: number) => (
                        <div key={item.termNo} className="category-section">
                            <MobileDetailDictionaryCard
                                key={item.termNo}
                                item={item}
                                isLast={index === currentData.length - 1}
                                searchKeyword = {searchValue}
                            />
                        </div>
                    ))}
                {/* 페이징 UI */}
                {activeCategory !== 'ALL' && totalPages > 1 && (
                    <div className="pagination-wrapper">
                        <div className="pagination-divider"></div> {/* 페이징 버튼 위 구분선 */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            groupSize={5}
                        />
                    </div>
                )}


            </main>
            <style>{`
                html, body {
                  width: 100%;
                  height: 100%;
                  margin: 0;
                  padding: 0;
                  overflow-x: hidden;
                }          

                .pagination-wrapper {
                    position: relative;
                    margin-top: 22px; /* 기존 24px → 22px로 조정 (2px 올림) */
                }
                
                .pagination-wrapper .pagination-divider {
                    position: absolute;
                    top: -22px; /* 기존 -18px → -20px로 조정 (2px 더 위로) */
                    left: 0;
                    width: calc(100% + 32px); /* 좌우 패딩(16px * 2) 무시 */
                    height: 8px;
                    background-color: rgba(246, 248, 250, 1);
                    transform: translateX(-16px); /* 패딩 제거 */
                }

                .all-category .more-button-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px; /* 버튼과 구분선 사이 간격 */
                    width: 100%;
                    position: relative; /* 부모 기준 위치 조정 */
                }
                
                .all-category .divider {
                    width: 100vw; /* 좌우 패딩 제거 효과 */
                    height: 8px;
                    background-color: rgba(246, 248, 250, 1);
                    margin: 0 -16px; /* 왼쪽 + 오른쪽 모두 16px 확장 */
                }

                .dictionary-container {
                  background-color: rgba(246, 248, 250, 1);
                  display: flex;
                  max-width: 375px;
                  width: 100%;
                  min-width: 100vw;
                  flex-direction: column;
                  overflow-y: auto;
                    margin: 0 auto; /* 중앙 정렬 */

                  height: 100%;
                  -webkit-overflow-scrolling: touch; /* iOS에서 스크롤 부드럽게 */
                  margin: 0 auto;
                }
                .header {
                  background-color: #fff;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  height: 62px;
                  max-width: 400px; /* main-content와 동일한 크기로 맞춤 */
                  width: 100%;
                  padding: 0 16px;
                  box-sizing: border-box;
                  margin: 0 auto; /* 중앙 정렬 */
                }


                .header h1 {
                  font: 600 26px Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
                  margin: 0;
                }
                .search-icon {
                  cursor: pointer;
                }
                .main-content {
                  max-width: 400px; /* 최대 크기 제한 */
                  width: 100%; /* 부모 요소를 꽉 채움 */
                  background-color: #fff;
                  padding: 0 16px 16px;
                  margin: 0 auto; /* 중앙 정렬 */
                  box-sizing: border-box;
                  min-height: 100vh; /* 뷰포트 높이만큼 최소 크기 유지 */
                }

                .categories-outer {
                  width: 343px;
                  height: 52px;
                  margin: 10px auto;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: rgba(246, 248, 250, 1);
                  border-radius: 8px;
                }
                .categories-inner {
                  width: 330px;
                  height: 40px;
                  display: flex;
                  gap: 0;
                }
                .category-section .dictionary-card {
                  width: 343px;
                  min-height: 156px;
                  border-bottom: 1px solid rgba(235, 235, 235, 1);
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-start;
                  align-items: flex-start;
                  padding: 24px 0px 24px 0px;
                  box-sizing: border-box;
                }
                

        
                .more-button {
                  width: 343px; /* 버튼 전체 너비 */
                  height: 48px; /* 버튼 전체 높이 */
                  display: flex;
                  align-items: center; /* 세로 중앙 정렬 */
                  justify-content: center; /* 가로 중앙 정렬 */ㄴ
                  gap: 6px; /* 아이콘과 텍스트 간격 설정 */
                  border: 1px solid rgba(235, 235, 235, 1); /* 테두리 */
                  border-radius: 8px; /* 모서리 둥글게 */
                  padding: 0; /* 내부 여백 제거 */
                  background: none; /* 배경 없음 */
                  cursor: pointer; /* 클릭 커서 */
                  color: #000; /* 글자 색상 */
                  text-decoration: none; /* 링크 스타일 제거 */
                  box-sizing: border-box; /* 크기 계산 포함 */
                  margin-bottom: 4px;
                }
                
                .more-button span {
                  font-size: 16px; /* 폰트 크기 */
                  font-weight: 400; /* 기본 굵기 */
                  line-height: 1; /* 텍스트 높이 */
                  text-align: center; /* 텍스트 중앙 정렬 */
                  white-space: nowrap; /* 텍스트를 한 줄로 유지 */
                }
                
                .arrow-icon {
                  width: 16px; /* 아이콘 너비 */
                  height: 16px; /* 아이콘 높이 */
                }
                
                .pagination-container {
                  display: flex;
                  justify-content: center; /* 중앙 정렬 */
                  align-items: center;
                  gap: 4px;
                  color: #b5b5b7;
                  white-space: nowrap;
                  text-align: center;
                  letter-spacing: -0.35px;
                  font: 400 14px/1 Pretendard, sans-serif;
                }
        
                .pagination-number {
                  background-color: rgba(255, 255, 255, 1);
                  border-radius: 50%;
                  width: 37px;
                  height: 37px;
                  padding: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                }
        
                .pagination-number.active {
                  color: #1f1f1f;
                  font-weight: 600;
                }
                
                .pagination-arrow {
                  aspect-ratio: 1;
                  object-fit: contain;
                  object-position: center;
                  width: 37px;
                }
      `}</style>
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
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        gap: '5px',
        marginTop: '20px',
    },
    pageButton: {
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    activePageButton: {
        backgroundColor: '#FF4500', // 현재 페이지 강조 색상
        color: '#fff',
    },


};
