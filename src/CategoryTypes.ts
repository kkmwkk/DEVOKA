export interface CategoryItemProps {
    label: string;
    isActive?: boolean;
}

export interface SearchBarProps {
    placeholder: string;
    onSearch: (value: string) => void;
}