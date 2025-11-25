import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Board, CreateBoardDto } from '../../types';
import { boardService } from '../../services/boardService';
import { BOARD_COLORS, DEFAULT_BOARD_COLOR } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';
import Loader from '../common/Loader';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(DEFAULT_BOARD_COLOR);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const data = await boardService.getAllBoards();
      setBoards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch boards');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async () => {
    if (!newBoardTitle.trim()) {
      return;
    }

    try {
      const boardData: CreateBoardDto = {
        title: newBoardTitle.trim(),
        backgroundColor: selectedColor
      };

      const newBoard = await boardService.createBoard(boardData);
      setBoards([newBoard, ...boards]);
      setIsModalOpen(false);
      setNewBoardTitle('');
      setSelectedColor(DEFAULT_BOARD_COLOR);
      navigate(`/board/${newBoard._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create board');
    }
  };

  const handleDeleteBoard = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this board?')) {
      return;
    }

    try {
      await boardService.deleteBoard(id);
      setBoards(boards.filter(board => board._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete board');
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>My Boards</h2>
        <Button className={styles.createBtn} onClick={() => setIsModalOpen(true)}>
          Create New Board
        </Button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className={styles.boardGrid}>
        {boards.map(board => (
          <div
            key={board._id}
            className={styles.boardCard}
            style={{ backgroundColor: board.backgroundColor }}
            onClick={() => navigate(`/board/${board._id}`)}
          >
            <div className={styles.boardContent}>
              <h3 className={styles.boardTitle}>{board.title}</h3>
              <p className={styles.boardDate}>{formatDate(board.createdAt)}</p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={(e) => handleDeleteBoard(board._id, e)}
            >
              ×
            </button>
          </div>
        ))}

        {boards.length === 0 && (
          <div className={styles.emptyState}>
            <p>No boards yet. Create your first board to get started!</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Board"
        size="small"
      >
        <div className={styles.modalContent}>
          <label className={styles.boardTitleLabel}>
     Board Title
   </label>
          <Input
            
            className={styles.boardTitleInput}
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            placeholder="Enter board title"
            fullWidth
            autoFocus
            onKeyPress={(e) => e.key === 'Enter' && handleCreateBoard()}
          />

          <div className={styles.colorSection}>
            <label className={styles.colorLabel}>Background Color</label>
            <div className={styles.colorGrid}>
              {BOARD_COLORS.map(color => (
                <button
                  key={color}
                  className={`${styles.colorOption} ${
                    selectedColor === color ? styles.colorOptionSelected : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.modalActions}>
            <Button variant="secondary" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button className={styles.createBtn}onClick={handleCreateBoard} disabled={!newBoardTitle.trim()}>
              Create Board
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;