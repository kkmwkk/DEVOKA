export const styles = `
.dictionary-container {
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  font-family: Pretendard, sans-serif;
  padding: 140px 80px 20vh; /* 하단 패딩을 비율로 조정 */
  min-height: 100vh; /* 화면 전체 높이를 보장 */
  box-sizing: border-box; /* 패딩 포함 계산 */
}

  .content-wrapper {
    display: flex;
    width: 500px;
    max-width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .dictionary-title {
    color: rgba(31, 31, 31, 1);
    font-size: 46px;
    font-weight: 600;
    letter-spacing: -1.15px;
    text-align: center;
  }

    .search-container {
    position: relative; /* 추가 */
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 1);
    align-self: stretch;
    display: flex;
    margin-top: 28px;
    gap: 10px; /* gap 값을 줄여 검색창과 아이콘 간 거리 조정 */
    font-size: 14px;
    color: #5e5e5e;
    font-weight: 400;
    letter-spacing: -0.35px;
    line-height: 1;
    padding: 10px 20px;
    border: 1px solid rgba(235, 235, 235, 1);
}

.search-input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
    color: #5e5e5e;
    padding-right: 40px; /* 돋보기 아이콘 공간 확보 */
}

.search-icon {
    position: absolute; /* 절대 위치 */
    right: 20px; /* 오른쪽 여백 */
    top: 50%; /* 수직 가운데 정렬 */
    transform: translateY(-50%); /* 가운데 정렬 보정 */
    font-size: 16px;
    color: #5e5e5e; /* 돋보기 색상 */
    pointer-events: none; /* 클릭 방지 */
}

  .categories-container {
    display: flex;
    margin-top: 28px;
    width: 299px;
    max-width: 100%;
    gap: 20px;
    font-size: 18px;
    color: rgba(118, 118, 118, 1);
    font-weight: 500;
    white-space: nowrap;
    text-align: center;
    letter-spacing: -0.45px;
    line-height: 2;
    justify-content: space-between;
  }

  .category-item {
    cursor: pointer;
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

  @media (max-width: 991px) {
    .dictionary-container {
      padding: 100px 20px;
    }
    
    .dictionary-title {
      font-size: 40px;
    }
    
    .search-container {
      max-width: 100%;
    }
    
    .categories-container {
      white-space: initial;
    }
  }
`






