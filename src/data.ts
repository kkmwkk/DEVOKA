import { DictionaryItem, PopularSearchItem } from './type';

export const dictionaryItems: DictionaryItem[] = [
    {
        title: "프론트엔드 개발자",
        englishTitle: "Front-end Developer",
        description: "웹 브라우저를 통해 유저가 직접 마주하는 웹 서비스의 앞단(front-end)을 담당하는 개발자. 클라이언트/서버를 기준으로 보면 웹 페이지 화면을 비롯한 클라이언트 영역을 프론트엔드라고 할 수 있다.",
        category: "개발"
    },
    {
        title: "백엔드 개발자",
        englishTitle: "BackEnd Developer",
        description: "웹 브라우저를 통해 유저가 직접 마주하는 웹 서비스의 앞단(front-end)을 담당하는 개발자. 클라이언트/서버를 기준으로 보면 웹 페이지 화면을 비롯한 클라이언트 영역을 프론트엔드라고 할 수 있다.",
        category: "개발"
    },
    {
        title: "레거시",
        englishTitle: "Legacy",
        description: "오래된 소스 및 기술 또는 소프트웨어",
        category: "개발"
    },
    {
        title: "옵티마이저",
        englishTitle: "Optimizer",
        description: "데이터베이스에서 여러 쿼리 실행 방법을 분석하여 가장 효율적인 실행 계획을 생성하는 시스템.",
        category: "개발"
    },
    {
        title: "킥오프 미팅",
        englishTitle: "Kickoff Meeting",
        description: "프로젝트, 프로그램의 시작을 알리는 첫 번째 공식적인 회의",
        category: "경영"
    },
    {
        title: "올핸즈 미팅",
        englishTitle: "All Hands Meeting",
        description: "조직 내 모든 직원이 참석하는 회의",
        category: "경영"
    },
    {
        title: "이니셔티브",
        englishTitle: "Initiative",
        description: "특정 목표를 달성하기 위해 조직이나 개인이 자발적으로 시작한 프로젝트",
        category: "경영"
    }
];

export const popularSearches: PopularSearchItem[] = [
    { id: 1, term: "UIUX", isHot: true },
    { id: 2, term: "버그", isHot: true },
    { id: 3, term: "MAU", isHot: true },
    { id: 4, term: "개발자" },
    { id: 5, term: "SEO" },
    { id: 6, term: "검색엔진" },
    { id: 7, term: "디자이너" },
    { id: 8, term: "그로스 해킹" },
    { id: 9, term: "PMF" },
    { id: 10, term: "AOV" }
];