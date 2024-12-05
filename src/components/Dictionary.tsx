import * as React from 'react';
import { SearchBar } from './SearchBar';
import { CategoryList } from './CategoryList';
import { styles } from './styles';

export const Dictionary: React.FC = () => {
    const handleSearch = (value: string) => {
        // Search implementation
    };


    return (
        <>
            <main className="dictionary-container">
                <div className="content-wrapper">
                    <h1 className="dictionary-title">IT용어 백과사전</h1>
                    <SearchBar
                        placeholder="검색어를 입력하세요."
                        onSearch={handleSearch}
                    />
                    <CategoryList />
                </div>
            </main>
            <style>{styles}</style>
        </>
    );
};