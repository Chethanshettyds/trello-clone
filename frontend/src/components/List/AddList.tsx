import React, { useState } from 'react';
import { CreateListDto } from '../../types';
import { listService } from '../../services/listService';
import { useBoardContext } from '../../context/BoardContext';
import Button from '../common/Button';
import Input from '../common/Input';
import styles from './List.module.css';

interface AddListProps {
  boardId: string;
}

const AddList: React.FC<AddListProps> = ({ boardId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const { addListToBoard } = useBoardContext();

  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      const listData: CreateListDto = {
        title: title.trim(),
        boardId
      };

      const newList = await listService.createList(listData);
      addListToBoard({ ...newList, cards: [] });
      setTitle('');
      setIsAdding(false);
    } catch (err) {
      console.error('Failed to create list:', err);
      alert('Failed to create list');
    }
  };

  if (!isAdding) {
    return (
      <button className={styles.addListButton} onClick={() => setIsAdding(true)}>
        + Add another list
      </button>
    );
  }

  return (
    <div className={styles.addListForm}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter list title..."
        fullWidth
        autoFocus
        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
      />
      <div className={styles.addListActions}>
        <Button size="small" className={styles.addBtn} onClick={handleAdd} disabled={!title.trim()}>
          Add List
        </Button>
        <Button
          size="small"
          variant="ghost"
          className={styles.cancelBtn}
          onClick={() => {
            setIsAdding(false);
            setTitle('');
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddList;