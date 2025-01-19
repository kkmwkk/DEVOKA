import * as React from 'react';
import { MobileMainSearchBarProps } from './mobile/types';

export const MobileMainSearchBar: React.FC<MobileMainSearchBarProps> = ({ placeholder, onSearch }) => {
    // TODO 1. Input 값 데이터로 검색이 가능하도록
    // TODO 2. 카테고리 클릭 시, (detailPage)로 이동 하면서 클릭한 해당 카테고리 데이터로 이동.
    // Input 값을 상태값으로 정의
    const [searchValue, setSearchValue] = React.useState<string>('');

    const handleSearch = (value : string) => {
        if(onSearch){
            onSearch(value)
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        handleSearch(searchValue)
    }

    return (
        <form className="search-container" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="searchInput" className="visually-hidden">
                {placeholder}
            </label>
            <input
                id="searchInput"
                type="search"
                className="search-input"
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => {setSearchValue(e.target.value)}} // Input 상태값 최신화
            />
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b83b7c7b865871e6f30f4762b53c8b7beadc4b549f10d894055a0320608b230?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                alt="Search"
                className="search-icon"
                role="presentation"
                onClick={()=>{handleSearch(searchValue)}} // 클릭 이벤트 핸들러
                onKeyUp={(e) => e.key === 'Enter' && handleSearch(searchValue)} // 키보드 접근성
            />

            <style>{
                `
                .search-container {
                  border-radius: 8px;
                  margin-left: 42px;
                  margin-right: 42px;
                  background-color: rgba(255, 255, 255, 1);
                  display: flex;
                  width: 100%;
                  max-width: 307px;
                  gap: 20px;
                  justify-content: space-between;
                  box-shadow: 0px 4px 10px rgba(35, 48, 59, 0.08); /* 그림자 효과 */
                  padding: 10px 20px;
                  border: 1px solid #FF6F1D;
                }
                
                .search-input {
                  border: none;
                  outline: none;
                  color: #5e5e5e;
                  letter-spacing: -0.35px;
                  font: 400 14px/1 Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
                  width: 100%;
                }
                
                .search-icon {
                  aspect-ratio: 1;
                  object-fit: contain;
                  object-position: center;
                  width: 28px;
                }
                
                .visually-hidden {
                  position: absolute;
                  width: 1px;
                  height: 1px;
                  padding: 0;
                  margin: -1px;
                  overflow: hidden;
                  clip: rect(0, 0, 0, 0);
                  border: 0;
                }
                `
            }</style>
        </form>
    );
};