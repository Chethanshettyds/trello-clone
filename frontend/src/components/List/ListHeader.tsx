import React, { useState } from 'react';
import { List, UpdateListDto } from '../../types';
import { listService } from '../../services/listService';
import { useBoardContext } from '../../context/BoardContext';
import Input from '../common/Input';
import styles from './List.module.css';

interface ListHeaderProps {
  list: List;
}

const ListHeader: React.FC<ListHeaderProps> = ({ list }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [showMenu, setShowMenu] = useState(false);
  const { updateListInBoard, removeListFromBoard } = useBoardContext();

  const handleSave = async () => {
    if (!title.trim() || title === list.title) {
      setTitle(list.title);
      setIsEditing(false);
      return;
    }

    try {
      const updateData: UpdateListDto = { title: title.trim() };
      await listService.updateList(list._id, updateData);
      updateListInBoard(list._id, updateData);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update list:', err);
      alert('Failed to update list title');
      setTitle(list.title);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this list? All cards will be deleted.')) {
      return;
    }

    try {
      await listService.deleteList(list._id);
      removeListFromBoard(list._id);
    } catch (err) {
      console.error('Failed to delete list:', err);
      alert('Failed to delete list');
    }
  };

  return (
    <div className={styles.listHeader}>
      {isEditing ? (
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
          fullWidth
        />
      ) : (
        <h3 className={styles.listTitle} onClick={() => setIsEditing(true)}>
          {list.title}
        </h3>
      )}

      <div className={styles.listMenu}>
        <button
          className={styles.menuButton}
          onClick={() => setShowMenu(!showMenu)}
        >
          •••
        </button>
        {showMenu && (
          <div className={styles.menuDropdown}>
            <button onClick={() => { setIsEditing(true); setShowMenu(false); }}>
              Rename List
            </button>
            <button onClick={handleDelete} className={styles.deleteOption}>
              Delete List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListHeader;