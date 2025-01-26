import * as React from 'react';
import { MobileMainCategoryButton } from './MobileMainCategoryButton';
import { MobileMainSearchBar } from './MobileMainSearchBar';
import {useNavigate} from "react-router-dom";

export const MobileDictionary: React.FC = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const categories = [
        { id: 'A0001', name: '개발' },
        { id: 'A0002', name: '경영' },
        { id: 'A0003', name: '디자인' },
        { id: 'A0004', name: '마케팅' },
    ];


    const handleSearchClick = () => {
        // 로컬 스토리지에서 최근 검색어 확인
        const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

        if (recentSearches.length > 0) {
            // 최근 검색어가 있는 경우
            navigate('/mobileSearch2');
        } else {
            // 최근 검색어가 없는 경우
            navigate('/mobileSearch1');
        }
    };

    return (
        <div className="dictionary-main">
            <h1 className="dictionary-title">IT용어 백과사전</h1>
            <div onClick={handleSearchClick} className="dictionary-main">
                <MobileMainSearchBar placeholder="검색어를 입력하세요."/>
            </div>
            <div className="categories-container">
                {categories.map(({ id, name }, index) => (
                    <React.Fragment key={id}>
                        <MobileMainCategoryButton label={name} id={id} />
                        {index < categories.length - 1 && (
                            <span className="category-separator">•</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <style>{
                `
                .dictionary-main {
                  background-color: rgba(255, 255, 255, 1);
                  display: flex;
                  max-width: 480px;
                  width: 100%;
                  flex-direction: column;
                  overflow: hidden;
                  align-items: center;
                  margin: 0 auto;
                }
                
                .dictionary-title {
                  color: #1F1F1F;
                  letter-spacing: -0.5px;
                  width: 166px; // max width 로 바꿔야할듯
                  text-align: center;
                  margin-top: 100px;
                  margin-bottom: 20px;
                  font: 600 26px Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
                }
                
                .categories-container {
                  display: flex;
                  margin-top: 20px;
                  margin-left: 64px;
                  margin-right: 65px;
                  width: 251px;
                  max-width: 100%;
                  gap: 16px; /* 카테고리와 구분 기호 간의 간격 */
                  justify-content: center;
                  align-items: center;
                }
                
                .category-separator {
                  color: #EBEBEB; /* 회색 점 색상 */
                  font-size: 16px; /* 점 크기 */
                }
                
                /* Safari 기본 스타일 제거 */
                input {
                    -webkit-appearance: none; /* iOS 기본 스타일 제거 */
                    appearance: none; /* 다른 브라우저에서도 적용 */
                    background-color: transparent; /* 배경색 투명화 */
                    box-shadow: none; /* 박스 그림자 제거 */
                }
                
                /* 검색 창일 경우 */
                input[type="search"] {
                    -webkit-appearance: none;
                    appearance: none;
                    background-color: transparent;
                    box-shadow: none;
                }
                
                input, textarea {
                    font-size: 16px;
                }
                `
            }</style>
        </div>
    );
};
