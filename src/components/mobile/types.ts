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