export interface CategoryProps {
    label: string;
}

export interface SearchBarProps {
    placeholder: string;
    onSearch: (value: string) => void;
}

export interface DictionaryItem {
    title: string;
    englishTitle: string;
    description: string;
    category: string;
}

export interface PopularSearchItem {
    id: number;
    term: string;
    isHot?: boolean;
}