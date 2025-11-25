import { useState, useEffect, useCallback } from 'react';
import { Board } from '../types';
import { boardService } from '../services/boardService';

export const useBoard = (boardId: string | undefined) => {
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoard = useCallback(async () => {
    if (!boardId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await boardService.getBoardById(boardId);
      setBoard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch board');
      console.error('Error fetching board:', err);
    } finally {
      setLoading(false);
    }
  }, [boardId]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  const refreshBoard = useCallback(() => {
    fetchBoard();
  }, [fetchBoard]);

  return { board, loading, error, refreshBoard, setBoard };
};