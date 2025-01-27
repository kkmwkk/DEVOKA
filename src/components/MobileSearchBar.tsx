import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as ResetButtonIcon } from '../assets/reset-button.svg';
import { ReactComponent as SearchButtonIcon } from '../assets/search-buttton.svg';

import {useNavigate} from "react-router-dom";
interface MobileSearchBarProps {
    onSearch?: (value: string) => void; // 검색 결과를 상위 컴포넌트로 전달하는 콜백 함수 (선택적)
    value?: string
}

const MobileSearchBar: React.FC<MobileSearchBarProps> = ({ onSearch, value = '' }) => {
    const [searchValue, setSearchValue] = useState(value); // 검색어 상태 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // 페이지가 렌더링된 후 검색창에 포커스
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);


    const handleBackClick = () => {
        navigate('/'); // 메인 페이지로 이동
    };

    // 검색 실행 함수
    // 1. 아무것도 되지 않았을 때
    const handleSearch = () => {
        // 정규식: 영어, 한글, 숫자만 허용
/*        const validPattern = /^[a-zA-Z가-힣0-9\s]+$/;

        if (!validPattern.test(searchValue)) {
            alert('영어, 한글, 숫자만 입력 가능합니다.');
            return;
        }*/

        const trimValue:string = searchValue.trim()
        if (trimValue && onSearch) {
            onSearch(searchValue); // 상위 컴포넌트로 검색어 전달
        }else if(!trimValue){
            navigate('/search/empty', { state: { emptySearchValue: '' } }); // 빈 값 명시적으로 전달
        }
    };



    // 입력 필드 변경 시 호출
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value); // 검색어 상태 업데이트
    };

    // Enter 키 입력 시 검색 실행
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleResetSearchValue = () => {
        setSearchValue('')
    }

    return (
        <>
        <div className="header">
            {/* 메뉴 아이콘 */}
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1797704ffd031a3fcab260af819c3ff5d494f1f31f507f39402d1a3d98b38808?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                alt="Menu icon"
                className="menu-icon"
                onClick={handleBackClick} // 클릭 시 메인 페이지로 이동
            />

            {/* 검색 입력 */}
            <div className="mobile-search-container">
                <div className="search-wrapper">
                    {/* 돋보기 아이콘 버튼 */}
                    <SearchButtonIcon
                        className="search-icon"
                        onClick={handleSearch} // 돋보기 클릭 시 검색 실행
                    />
                    {/* 검색 입력 필드 */}
                    <input
                        ref={searchInputRef} // 검색창에 ref 연결
                        type="text"
                        className="search-input"
                        placeholder="검색어를 입력하세요."
                        value={searchValue}
                        onChange={handleInputChange} // 검색어 변경 시 호출
                        onKeyPress={handleKeyPress} // Enter 키 입력 시 호출
                        aria-label="Search input"
                    />
                </div>
                {/* Clear 아이콘 */}
                <ResetButtonIcon
                    className="options-icon"
                    onClick={handleResetSearchValue}
                />
            </div>

            {/* 스타일 정의 */}
            <style>{`
                .header {
                  display: flex;
                  max-width: 390px;
                  background-color: #fff;
                  gap: 8px;
                  padding: 0;
                }
                .menu-icon {
                    width: 28px;
                    margin: auto 0;
                    color: #444449; /* 텍스트나 폰트 아이콘 색상 */
                    fill: #444449; /* SVG 아이콘 색상을 위한 fill 속성 */
                }
                .mobile-search-container {
                    width: 100%; /* 고정 너비 대신 유동적 너비 */
                    max-width: 400px; /* 최대 너비 설정 */
                    height: 48px;
                    display: flex;
                    align-items: center; /* 아이템 세로 가운데 정렬 */
                    align-items: center;
                    /*                    
                    background-color: #fff;
                    border: 1px solid #FF6F1D;
                    */
                    background-color: #f6f8fa;
                    border-radius: 8px;
                    padding: 0px 10px 0px 10px !important; /* 우선순위 강제 */
                    box-sizing: border-box;
                    overflow: hidden; /* 레이아웃 깨짐 방지 */
                }
                .search-wrapper {
                  align-items: center; /* 추가적으로 가운데 정렬 */
                  display: flex;
                  gap: 6px;
                  flex-grow: 1;
                }
                .search-icon {
                  background: none;
                  border: none;
                  cursor: pointer;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  vertical-align: middle; /* SVG를 가운데로 정렬 */

                }
                .search-input {
                  border: none;
                  outline: none;
                  font-size: 16px;
                  flex-grow: 1;
                  background: transparent;
                }
                .options-icon {
                    width: 24px;
                    margin-left: auto; /* 오른쪽으로 정렬 */
                    box-sizing: border-box;
                    max-width: calc(100% - 16px); /* 삐져나감 방지 */
                    object-fit: contain; /* 이미지 왜곡 방지 */
                    flex-shrink: 0; /* 아이콘 크기 유지 */
                    -webkit-text-size-adjust: 100%; /* 텍스트 크기 조정 방지 */
                    color: #767676; 
                    fill: #767676;
                }
            `}</style>
        </div>


        </>
    );
};

export default MobileSearchBar;
