import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Board, UpdateBoardDto } from '../../types';
import { boardService } from '../../services/boardService';
import { BOARD_COLORS } from '../../utils/constants';
import Input from '../common/Input';
import Button from '../common/Button';
import Modal from '../common/Modal';
import styles from './Board.module.css';

interface BoardHeaderProps {
  board: Board;
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ board }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title.trim() || title === board.title) {
      setTitle(board.title);
      setIsEditing(false);
      return;
    }

    try {
      const updateData: UpdateBoardDto = { title: title.trim() };
      await boardService.updateBoard(board._id, updateData);
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      console.error('Failed to update board:', err);
      alert('Failed to update board title');
      setTitle(board.title);
    }
  };

  const handleColorChange = async (color: string) => {
    try {
      const updateData: UpdateBoardDto = { backgroundColor: color };
      await boardService.updateBoard(board._id, updateData);
      setShowColorPicker(false);
      window.location.reload();
    } catch (err) {
      console.error('Failed to update board color:', err);
      alert('Failed to update board color');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this board? All lists and cards will be deleted.')) {
      return;
    }

    try {
      await boardService.deleteBoard(board._id);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete board:', err);
      alert('Failed to delete board');
    }
  };

  return (
    <div className={styles.boardHeader}>
      {isEditing ? (
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
          className={styles.boardTitleInput}
        />
      ) : (
        <h2 className={styles.boardTitle} onClick={() => setIsEditing(true)}>
          {board.title}
        </h2>
      )}

      <div className={styles.boardActions}>
        <Button variant="ghost" onClick={() => setShowColorPicker(true)}>
          <span style={{marginRight: '6px'}}>🎨</span>
          Change Background
        </Button>
        <Button variant="danger" className={styles.deleteBtn} onClick={handleDelete}>
          Delete Board
        </Button>
      </div>

      
      <Modal
        isOpen={showColorPicker}
        onClose={() => setShowColorPicker(false)}
        title="Change Background"
        size="small"
      >
        <div className={styles.colorPickerGrid}>
          {BOARD_COLORS.map(color => (
            <button
              key={color}
              className={`${styles.colorPickerOption} ${board.backgroundColor === color ? styles.colorPickerOptionSelected : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
      </Modal>

</div>
);
};
export default BoardHeader;