import * as React from 'react';
import { MobileMainCategoryButton } from '../MobileMainCategoryButton';
import { MobileMainSearchBar } from '../MobileMainSearchBar';
import {useNavigate} from "react-router-dom";
import styles from './MobileDictionary.module.css' // ts에서 module.css 파일 인식하게끔 설정하려면 global.d.ts 설정이 필수임.

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
            navigate('/search/recent');
        } else {
            // 최근 검색어가 없는 경우
            navigate('/search/popular');
        }
    };

    return (
        <div className={styles.dictionaryMain}>
            <h1 className={styles.dictionaryTitle}>IT용어 백과사전</h1>
            <div onClick={handleSearchClick} className={styles.dictionaryMain}>
                <MobileMainSearchBar placeholder="검색어를 입력하세요."/>
            </div>
            <div className={styles.categoriesContainer}>
                {categories.map(({ id, name }, index) => (
                    <React.Fragment key={id}>
                        <MobileMainCategoryButton label={name} id={id} />
                        {index < categories.length - 1 && (
                            <span className={styles.categorySeparator}>•</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
