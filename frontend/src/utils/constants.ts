export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const BOARD_COLORS = [
  '#0079bf', // Blue
  '#d29034', // Orange
  '#519839', // Green
  '#b04632', // Red
  '#89609e', // Purple
  '#cd5a91', // Pink
  '#4bbf6b', // Lime
  '#00aecc', // Sky
  '#838c91'  // Gray
];

export const DEFAULT_BOARD_COLOR = '#0079bf';

export const DRAG_TYPES = {
  CARD: 'CARD',
  LIST: 'LIST'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  BOARD_NOT_FOUND: 'Board not found.',
  LIST_NOT_FOUND: 'List not found.',
  CARD_NOT_FOUND: 'Card not found.',
  GENERIC_ERROR: 'An error occurred. Please try again.'
};