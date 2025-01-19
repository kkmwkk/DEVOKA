import apiClient from './api';

export async function searchTerm(keyword: string) {
    const response = await apiClient.get('/terms/search', { params: { keyword } });
    return response.data;
}