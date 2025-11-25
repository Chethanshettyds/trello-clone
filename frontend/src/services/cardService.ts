import api from './api';
import { Card, CreateCardDto, UpdateCardDto, ApiResponse } from '../types';

export const cardService = {
  async createCard(data: CreateCardDto): Promise<Card> {
    const response = await api.post<ApiResponse<Card>>('/cards', data);
    if (!response.data.data) {
      throw new Error('Failed to create card');
    }
    return response.data.data;
  },

  async updateCard(id: string, data: UpdateCardDto): Promise<Card> {
    const response = await api.put<ApiResponse<Card>>(`/cards/${id}`, data);
    if (!response.data.data) {
      throw new Error('Failed to update card');
    }
    return response.data.data;
  },

  async updateCardPositions(cards: { id: string; position: number; listId: string }[]): Promise<void> {
    await api.put('/cards/positions', { cards });
  },

  async deleteCard(id: string): Promise<void> {
    await api.delete(`/cards/${id}`);
  }
};