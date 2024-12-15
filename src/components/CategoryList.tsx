import * as React from 'react';
import { Tooltip } from 'antd'; // Tooltip을 위해 antd를 사용합니다.
import {CategoryItemProps} from "../CategoryTypes";

const categories = [
    { label: '개발', isActive: false },
    { label: '경영', isActive: false },
    { label: '디자인', isActive: false },
    { label: '마케팅', isActive: false }
];
export const CategoryList: React.FC = () => {
    return (
        <nav className="categories-container" role="navigation">
            {categories.map((category, index) => (
                <CategoryItem
                    key={index}
                    label={category.label}
                    isActive={category.isActive}
                />
            ))}
        </nav>
    );
};


const CategoryItem: React.FC<CategoryItemProps> = ({ label, isActive = false }) => (
    <Tooltip title={`${label} 용어 페이지로 이동해요!`}
             placement="bottom"
             overlayClassName={`tooltip-${label}`}
             overlayInnerStyle={{
                 backgroundColor: '#1f1f1f', // 배경색
                 color: '#fff', // 텍스트 색상
                 padding: '5px 12px 5px 13px', // 텍스트 주변 패딩
                 borderRadius: '6px', // 모서리 둥글게
                 fontSize: '14px', // 폰트 크기
                 fontWeight: '400', // 폰트 굵기
                 textAlign: 'center', // 텍스트 중앙 정렬
             }}
    >

    <div className={`category-item ${isActive ? 'active' : ''}`}>
        {label}
        <style>{`
      .category-item {
        color: rgba(118, 118, 118, 1);
        font-size: 18px;
        font-weight: 500;
        line-height: 2;
        letter-spacing: -0.45px;
        text-align: center;
        cursor: pointer;
      }
      .active {
        color: rgba(255, 111, 29, 1);
      }
      .category-item:hover {
        color: rgba(255, 111, 29, 1); /* 마우스 hover 시 색 변경 */
      }
      
    `}</style>
    </div>
    </Tooltip>
);