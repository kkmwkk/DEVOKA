export interface MobileMainCategoryButtonProps {
    label: string;
}

export interface MobileMainSearchBarProps {
    placeholder: string;
    onSearch: (value: string) => void;
}

export interface MobileDetailDictionaryItem {
    title: string;
    titleEn: string;
    description: string;
}

export interface MobileDetailCategoryProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

export interface MobileDetailDictionaryCardProps {
    item: MobileDetailDictionaryItem;
}

export interface MobileDetailSearchItemProps {
    rank: number;
    term: string;
    isTop3?: boolean;
}

export interface MobileDetailSearchListProps {
    items: MobileDetailSearchItemProps[];
    timestamp: string;
}