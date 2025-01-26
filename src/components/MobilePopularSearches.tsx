import * as React from 'react';
import { MobileDetailSearchItem } from './MobileDetailSearchItem';
import {useEffect, useState} from "react";
import axios from "axios";

interface MobilePopularSearchesProps {
    onSearch?: (value: string) => void; // 반환값이 void인 함수
}

export const MobilePopularSearches: React.FC<MobilePopularSearchesProps> = ({onSearch}) => {
    const [popularSearchWord, setPopularSearchWord] = useState<string[]>([]);
    const [timeStamp, setTimeStamp] = useState<string>(''); // 단일 문자열로 초기화

    useEffect(() => {
        const fetchRecommendWordsData = async () => {
            try{
                const response = await axios.get('http://192.168.0.7:8080/api/terms/popular');
                setTimeStamp(response.data.response.dateTime || ''); // 날짜 데이터 설정
                const tmpData = response.data.response.rankDataList
                const fnlData: any[] = [];
                tmpData.forEach((val: { [x: string]: any }, index: number) => {
                    if (index <= 10 && typeof val === "object" && val.hasOwnProperty("rank") && val.hasOwnProperty("termName") && val.hasOwnProperty("count")) {
                        const data = {
                            isTop3: index <= 2,
                            rank: val.rank,
                            term: val.termName,
                            count: val.count,
                        };
                        fnlData.push(data);
                    }
                });
                setPopularSearchWord(fnlData);
            }catch(e){
                console.error('인기검색어 가져오는 중 오류 발생:', e);
            }
        }
        fetchRecommendWordsData(); // 컴포넌트 마운트 시 호출
    }, []) // 최초 1회 렌더링에서만 호출.

    const handleOnSearch = (value: string) => {
        if (onSearch) {
            onSearch(value); // 타입 단언 필요 없음
        }
    };

    return (
        <div className="popular-searches">
            <div className="search-container">
                <div className="popular-header">
                    <h2 className="popular-title">인기 검색어</h2>
                    <span className="timestamp">{`${timeStamp} 기준`}</span>
                </div>
                {popularSearchWord.map((item:any) => (
                    <MobileDetailSearchItem
                        key={item.rank}
                        rank={item.rank}
                        term={item.term}
                        isTop3={item.rank <= 3} // Top 3 랭크에 대해 블루 색상 적용
                        onSearch = {handleOnSearch}
                    />
                ))}
            </div>
            <style>{`
        .popular-searches {
          border-radius: 0;
          display: flex;
          max-width: 375px;
          flex-direction: column;
          font-family: Pretendard, sans-serif;
        }
        .search-container {
          background-color: rgba(255, 255, 255, 1);
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: start;
        }
        .popular-header {
            display: flex; /* 플렉스박스 설정 */
            justify-content: space-between; /* 좌우 간격 자동 조정 */
            align-items: center; /* 세로 중앙 정렬 */
            width: 100%; /* 전체 너비 사용 */
            padding: 0; /* 좌우 패딩 추가 */
            box-sizing: border-box; /* 패딩 포함 크기 계산 */
            margin: 0; /* 외부 여백 제거 */
        }
        
        .popular-title {
            color: #1F1F1F;
            font-size: 16px;
            font-weight: 600;
            line-height: 24px; /* 피그마와 동일한 라인 높이 */
            margin: 0;
        }
        
        .timestamp {
            color: #767676;
            font-size: 14px;
            font-weight: 400;
            white-space: nowrap; /* 텍스트가 한 줄로 유지되도록 설정 */
            margin: 0;
        }
      `}</style>
        </div>
    );
};