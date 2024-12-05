import * as React from 'react';
import { CategoryProps } from '../type';

const categories = ['개발', '경영', '디자인', '마케팅'];

export const CategoryList: React.FC = () => {
    return (
        <nav className="categories-container" role="navigation">
            {categories.map((category, index) => (
                <Category key={index} label={category} />
            ))}
        </nav>
    );
};

const Category: React.FC<CategoryProps> = ({ label }) => {
    return (
        <div
            className="category-item"
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                }
            }}
        >
            {label}
        </div>
    );
};