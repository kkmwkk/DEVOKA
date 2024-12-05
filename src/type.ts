export interface CategoryProps {
    label: string;
}

export interface SearchBarProps {
    placeholder: string;
    onSearch: (value: string) => void;
}