
import apiClient from '../api/apiClient';

export const getEvent = async () => {
    const res = await apiClient.get('/event/');
    return res.data;
};

export const getSpeakers = async (params = {}) => {
    const res = await apiClient.get('/speakers/', { params });
    return res.data;
};

export const getSpeaker = async (id: number) => {
    const res = await apiClient.get(`/speakers/${id}/`);
    return res.data;
};

export const getSessions = async (params = {}) => {
    const res = await apiClient.get('/sessions/', { params });
    return res.data;
};

export const getRooms = async () => {
    const res = await apiClient.get('/rooms/');
    return res.data;
};

export const createRegistration = async (payload: any) => {
    const res = await apiClient.post('/registrations/', payload);
    return res.data;
};
