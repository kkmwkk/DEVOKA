import * as React from 'react';
import { SearchBarProps } from '../type';

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
    return (
        <form className="search-container" role="search">
            <label htmlFor="searchInput" className="visually-hidden">
                검색어를 입력하세요
            </label>
            <input
                type="search"
                id="searchInput"
                className="search-input"
                placeholder={placeholder}
                onChange={(e) => onSearch(e.target.value)}
            />
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/86521faa23116738325aca392936b804fd0e7298e93a12020f9145fa4a3895e1?apiKey=a7fa475a1710478787384e06fe692f60&"
                className="search-icon"
                alt="검색"
                role="button"
                tabIndex={0}
            />
        </form>
    );
};