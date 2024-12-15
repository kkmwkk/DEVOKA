export const styles = `
/* 후보1. 윤초록우산어린이 만세 */
@font-face {
    font-family: 'YoonChildfundkoreaManSeh';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408@1.0/YoonChildfundkoreaManSeh.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

/* 추가된 나머지 폰트 정의도 여기에 포함 */

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
  font-family: 'YoonChildfundkoreaManSeh', Pretendard, sans-serif; /* NanumSquareNeoBold 폰트를 우선 적용 */
  color: rgba(31, 31, 31, 1);
  font-size: 46px;
  font-weight: 600;
  letter-spacing: -1.15px;
  text-align: center;
  margin-bottom: 26px; /* 타이틀 아래 간격을 26px로 설정 */
}

.search-container {
  position: relative;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 1);
  align-self: center;
  display: flex;
  width: 600px; /* 검색 바의 폭 설정 */
  height: 48px; /* 검색 바의 높이 설정 */
  gap: 10px;
  font-size: 14px;
  color: #5e5e5e;
  font-weight: 400;
  letter-spacing: -0.35px;
  line-height: 1;
  padding: 0 20px; /* 높이에 맞게 패딩 조정 */
  border: 1px solid rgba(235, 235, 235, 1);
  margin-bottom: 26px; /* 타이틀 아래 간격을 26px로 설정 */
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
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #5e5e5e;
  pointer-events: none;
}

.categories-container {
  display: flex;
  width: 100%;
  max-width: 600px;
  gap: 0px; /* 텍스트 사이 간격 */
  font-size: 20px;
  color: rgba(118, 118, 118, 1);
  font-weight: 500;
  text-align: center;
  letter-spacing: -0.45px;
  justify-content: center; /* 텍스트 간격 균등 분배 */
  align-items: center; /* 점 포함 모든 요소 중앙 정렬 */
  margin: 0 auto; /* 중앙으로 정렬 */
}

.category-item {
  position: relative; /* 점을 추가하기 위해 상대 위치 지정 */
  cursor: pointer;
  display: flex; /* 텍스트와 점을 수평 및 수직 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
    justify-content: center;

}



.category-item:not(:last-child)::after {
  content: '•'; /* 원형 점 추가 */
  display: inline-block; /* 점을 텍스트와 같은 라인에 배치 */
  margin-left: 16px; /* 텍스트 오른쪽과 점 사이 간격 */
  margin-right: 16px;
  font-size: 20px; /* 점 크기 */
  color: rgba(200, 200, 200, 0.5); /* 점 색상 */
  vertical-align: center; /* 점의 세로 정렬 */
}


.search-input::placeholder {
  font-size: 15px; /* Regular 폰트 크기 */
  font-weight: 400; /* Regular 폰트 스타일 */
  color: rgba(118, 118, 118, 1); /* 텍스트 색상 */
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



/* 카테고리 항목에 따라 툴팁 위치 조정 */
.category-item:not(:last-child) .ant-tooltip {
  transform: translateX(-50%) translateX(-16px) !important; /* 점의 영향을 제거 (-16px은 점의 margin 값) */
}

.category-item:last-child .ant-tooltip {
  transform: translateX(-50%) !important; /* 마지막 항목은 기본 중앙 정렬 */
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
    width: auto; /* 작은 화면에서 폭 조정 */
  }
  
  .categories-container {
    white-space: initial;
  }
}
`
