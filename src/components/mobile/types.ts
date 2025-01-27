export interface MobileMainCategoryButtonProps {
    label: string;
    id:string;
}

export interface MobileMainSearchBarProps {
    placeholder: string;
    onSearch?: (value: string) => void;
}

export interface MobileDetailDictionaryItem {
    korName: string;
    engName: string;
    definition: string;
}

export interface MobileDetailCategoryProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

export interface MobileDetailDictionaryCardProps {
    item: MobileDetailDictionaryItem;
    isLast?: boolean; // 새로운 속성 추가
    searchKeyword?: string // 검색 키워드 추가
}

export interface MobileDetailSearchItemProps {
    rank: number;
    term: string;
    isTop3?: boolean;
    onSearch? : (value : string) => void;
}

export interface MobileDetailSearchListProps {
    items: MobileDetailSearchItemProps[];
    timestamp: string;
}