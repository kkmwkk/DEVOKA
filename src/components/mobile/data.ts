export const categories = ['전체', '개발', '경영', '디자인', '마케팅'];

export const allCategoryItems: Record<string, Array<{ title: string; titleEn: string; description: string }>> = {
    '전체': [
        {
            title: '프론트엔드 개발자',
            titleEn: 'Front-end Developer',
            description: '웹 브라우저를 통해 유저가 직접 마주하는 웹 서비스의 앞단(front-end)을 담당하는 개발자로 클라이언트/서버를 기준으로 보면 웹 페이지 화면을 비롯한 클라이언트 영역을 담당한다'
        },
        {
            title: '백엔드 개발자',
            titleEn: 'BackEnd Developer',
            description: '서버와 데이터베이스와 관련된 모든 것을 책임지는 개발자로, 사용자에게 데이터를 제공하는 서버 영역을 담당한다'
        },
        {
            title: '레거시',
            titleEn: 'Legacy',
            description: '오래된 소스 및 기술 또는 소프트웨어'
        },
        {
            title: '옵티마이저',
            titleEn: 'Optimizer',
            description: '데이터베이스에서 여러 쿼리 실행 방법을 분석하여 가장 효율적인 실행 계획을 생성하는 시스템.'
        }
    ],
    '개발': [
        {
            title: '프론트엔드 개발자',
            titleEn: 'Front-end Developer',
            description: '웹 브라우저를 통해 유저가 직접 마주하는 웹 서비스의 앞단(front-end)을 담당하는 개발자로 클라이언트/서버를 기준으로 보면 웹 페이지 화면을 비롯한 클라이언트 영역을 담당한다'
        },
        {
            title: '백엔드 개발자',
            titleEn: 'BackEnd Developer',
            description: '서버와 데이터베이스와 관련된 모든 것을 책임지는 개발자로, 사용자에게 데이터를 제공하는 서버 영역을 담당한다'
        },
        {
            title: '레거시',
            titleEn: 'Legacy',
            description: '오래된 소스 및 기술 또는 소프트웨어'
        },
        {
            title: '옵티마이저',
            titleEn: 'Optimizer',
            description: '데이터베이스에서 여러 쿼리 실행 방법을 분석하여 가장 효율적인 실행 계획을 생성하는 시스템.'
        }
    ],
    '경영': [
        {
            title: '경영 전략',
            titleEn: 'Business Strategy',
            description: '기업의 목표를 달성하기 위한 장기적 계획 및 실행 전략'
        },
        {
            title: '회계',
            titleEn: 'Accounting',
            description: '재무 정보의 기록, 요약, 분석 및 보고 과정'
        }
    ],
    '디자인': [
        {
            title: 'UX 디자인',
            titleEn: 'UX Design',
            description: '사용자 경험을 설계하고 최적화하는 디자인 프로세스'
        },
        {
            title: 'UI 디자인',
            titleEn: 'UI Design',
            description: '사용자 인터페이스를 시각적으로 설계하는 프로세스'
        }
    ],
    '마케팅': [
        {
            title: '디지털 마케팅',
            titleEn: 'Digital Marketing',
            description: '디지털 채널을 통해 제품 또는 서비스를 홍보하는 활동'
        },
        {
            title: '브랜딩',
            titleEn: 'Branding',
            description: '브랜드의 이미지와 가치를 구축하는 과정'
        }
    ]
};