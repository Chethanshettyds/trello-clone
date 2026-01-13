import React, { createContext, useContext, ReactNode } from 'react';
import { Board, List, Card } from '../types';

interface BoardContextType {
  board: Board | null;
  setBoard: React.Dispatch<React.SetStateAction<Board | null>>;
  updateListInBoard: (listId: string, updates: Partial<List>) => void;
  updateCardInBoard: (cardId: string, listId: string, updates: Partial<Card>) => void;
  addListToBoard: (list: List) => void;
  addCardToList: (listId: string, card: Card) => void;
  removeListFromBoard: (listId: string) => void;
  removeCardFromList: (listId: string, cardId: string) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within BoardProvider');
  }
  return context;
};

interface BoardProviderProps {
  children: ReactNode;
  board: Board | null;
  setBoard: React.Dispatch<React.SetStateAction<Board | null>>;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children, board, setBoard }) => {
  const updateListInBoard = (listId: string, updates: Partial<List>) => {
    setBoard(prevBoard => {
      if (!prevBoard) return null;
      return {
        ...prevBoard,
        lists: prevBoard.lists.map(list =>
          list._id === listId ? { ...list, ...updates } : list
        )
      };
    });
  };

  const updateCardInBoard = (cardId: string, listId: string, updates: Partial<Card>) => {
    setBoard(prevBoard => {
      if (!prevBoard) return null;
      return {
        ...prevBoard,
        lists: prevBoard.lists.map(list =>
          list._id === listId
            ? {
                ...list,
                cards: list.cards.map(card =>
                  card._id === cardId ? { ...card, ...updates } : card
                )
              }
            : list
        )
      };
    });
  };

  const addListToBoard = (list: List) => {
    console.log('addListToBoard called with:', list);
    setBoard(prevBoard => {
      if (!prevBoard) {
        console.error('Cannot add list: board is null');
        return null;
      }
      const updatedBoard = {
        ...prevBoard,
        lists: [...prevBoard.lists, list]
      };
      console.log('Board updated with new list. New lists:', updatedBoard.lists);
      return updatedBoard;
    });
  };

  const addCardToList = (listId: string, card: Card) => {
    setBoard(prevBoard => {
      if (!prevBoard) return null;
      return {
        ...prevBoard,
        lists: prevBoard.lists.map(list =>
          list._id === listId
            ? { ...list, cards: [...list.cards, card] }
            : list
        )
      };
    });
  };

  const removeListFromBoard = (listId: string) => {
    setBoard(prevBoard => {
      if (!prevBoard) return null;
      return {
        ...prevBoard,
        lists: prevBoard.lists.filter(list => list._id !== listId)
      };
    });
  };

  const removeCardFromList = (listId: string, cardId: string) => {
    setBoard(prevBoard => {
      if (!prevBoard) return null;
      return {
        ...prevBoard,
        lists: prevBoard.lists.map(list =>
          list._id === listId
            ? { ...list, cards: list.cards.filter(card => card._id !== cardId) }
            : list
        )
      };
    });
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
        updateListInBoard,
        updateCardInBoard,
        addListToBoard,
        addCardToList,
        removeListFromBoard,
        removeCardFromList
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};