import { Document } from 'mongoose';

export interface ICard extends Document {
  _id: string;
  title: string;
  description: string;
  position: number;
  listId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IList extends Document {
  _id: string;
  title: string;
  position: number;
  boardId: string;
  cards: ICard[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IBoard extends Document {
  _id: string;
  title: string;
  backgroundColor: string;
  lists: IList[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
}