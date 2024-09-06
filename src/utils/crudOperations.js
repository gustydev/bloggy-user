import { apiRequest } from './api';
import { API_URL } from './config';

export async function createResource(resource, data, token) {
    return await apiRequest(`${API_URL}/${resource}`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(data),
    });
}