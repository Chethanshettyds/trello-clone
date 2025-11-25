import api from './api';
import { List, CreateListDto, UpdateListDto, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const listService = {
  async createList(data: CreateListDto): Promise<List> {
    const response = await api.post<ApiResponse<List>>('/lists', data);
    if (!response.data.data) {
      throw new Error('Failed to create list');
    }
    return response.data.data;
  },

  async updateList(id: string, data: UpdateListDto): Promise<List> {
    const response = await api.put<ApiResponse<List>>(`/lists/${id}`, data);
    if (!response.data.data) {
      throw new Error('Failed to update list');
    }
    return response.data.data;
  },

  async updateListPositions(lists: { id: string; position: number }[]): Promise<void> {
    await api.put('/lists/positions', { lists });
  },

  async deleteList(id: string): Promise<void> {
    await api.delete(`/lists/${id}`);
  }
};