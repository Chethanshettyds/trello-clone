import api from './api';
import { Board, CreateBoardDto, UpdateBoardDto, ApiResponse } from '../types';

export const boardService = {
  async getAllBoards(): Promise<Board[]> {
    const response = await api.get<ApiResponse<Board[]>>('/boards');
    return response.data.data || [];
  },

  async getBoardById(id: string): Promise<Board> {
    const response = await api.get<ApiResponse<Board>>(`/boards/${id}`);
    if (!response.data.data) {
      throw new Error('Board not found');
    }
    return response.data.data;
  },

  async createBoard(data: CreateBoardDto): Promise<Board> {
    const response = await api.post<ApiResponse<Board>>('/boards', data);
    if (!response.data.data) {
      throw new Error('Failed to create board');
    }
    return response.data.data;
  },

  async updateBoard(id: string, data: UpdateBoardDto): Promise<Board> {
    const response = await api.put<ApiResponse<Board>>(`/boards/${id}`, data);
    if (!response.data.data) {
      throw new Error('Failed to update board');
    }
    return response.data.data;
  },

  async deleteBoard(id: string): Promise<void> {
    await api.delete(`/boards/${id}`);
  }
};