export interface Card {
  _id: string;
  title: string;
  description: string;
  position: number;
  listId: string;
  createdAt: string;
  updatedAt: string;
}

export interface List {
  _id: string;
  title: string;
  position: number;
  boardId: string;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  _id: string;
  title: string;
  backgroundColor: string;
  lists: List[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateBoardDto {
  title: string;
  backgroundColor?: string;
}

export interface UpdateBoardDto {
  title?: string;
  backgroundColor?: string;
}

export interface CreateListDto {
  title: string;
  boardId: string;
  position?: number;
}

export interface UpdateListDto {
  title?: string;
  position?: number;
}

export interface CreateCardDto {
  title: string;
  description?: string;
  listId: string;
  position?: number;
}

export interface UpdateCardDto {
  title?: string;
  description?: string;
  position?: number;
  listId?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}