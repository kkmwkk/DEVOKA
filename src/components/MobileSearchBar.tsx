import React, { useState } from 'react';

const MobileSearchBar: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        console.log('Search value:', value); // 검색 로직 추가 가능
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        handleSearch(value);
    };

    return (
        <div className="header">
            {/* 메뉴 아이콘 */}
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1797704ffd031a3fcab260af819c3ff5d494f1f31f507f39402d1a3d98b38808?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                alt="Menu icon"
                className="menu-icon"
            />

            {/* 검색 입력 */}
            <div className="mobile-search-container">
                <div className="search-wrapper">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a85e20ee8e286f8e52bbd8e1ee5cafe73ccfa9449f1201a9b3cec027d81de3b9?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                        alt="Search icon"
                        className="search-icon"
                    />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="검색어를 입력하세요."
                        value={searchValue}
                        onChange={handleInputChange}
                        aria-label="Search input"
                    />
                </div>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/358b043f13d6ea5d59b0b6e3e906dd664c92e06eb9d6bca4fcdf69c118e128b6?placeholderIfAbsent=true&apiKey=a7fa475a1710478787384e06fe692f60"
                    alt="Clear icon"
                    className="options-icon"
                />
            </div>

            <style>{`
        .header {
          border-radius: 0;
          display: flex;
          max-width: 375px;
          color: #767676;
          letter-spacing: -0.35px;
          font: 400 14px/1 Pretendard, -apple-system, Roboto, Helvetica, sans-serif;
          background-color: #fff;
          gap: 8px;
          padding: 0px 0px 0px 0px;
        }
        .menu-icon {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 28px;
          margin: auto 0;
        }
        .mobile-search-container {
            width: 289px !important;
            height: 48px !important;
            display: flex;
            align-items: center;
            background-color: #fff;
            border: 1px solid #ebebeb;
            border-radius: 8px;
            padding: 0 12px;
            box-sizing: border-box;
        }
        .search-wrapper {
          display: flex;
          gap: 6px;
          flex-grow: 1; /* 검색 입력 필드가 가용 공간을 채움 */
        }
        .search-icon {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 28px;
        }
        .search-input {
          border: none;
          outline: none;
          font-size: 14px;
          color: #767676;
          flex-grow: 1;
          background: transparent;
        }
        .options-icon {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 24px;
          margin-left: 16px; /* X 아이콘과 검색 입력 필드 사이의 간격 증가 */
          margin: auto 0;
        }
      `}</style>
        </div>
    );
};

export default MobileSearchBar;
