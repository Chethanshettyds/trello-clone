import React, { useState, useRef, useEffect } from 'react';
import { CreateCardDto } from '../../types';
import { cardService } from '../../services/cardService';
import { useBoardContext } from '../../context/BoardContext';
import Button from '../common/Button';
import Textarea from '../common/Textarea';
import styles from './Card.module.css';

interface AddCardProps {
  listId: string;
}

const AddCard: React.FC<AddCardProps> = ({ listId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const formRef = useRef<HTMLDivElement>(null);
  const { addCardToList } = useBoardContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsAdding(false);
        setTitle('');
      }
    };

    if (isAdding) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isAdding]);

  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      const cardData: CreateCardDto = {
        title: title.trim(),
        listId
      };

      const newCard = await cardService.createCard(cardData);
      addCardToList(listId, newCard);
      setTitle('');
      setIsAdding(false);
    } catch (err) {
      console.error('Failed to create card:', err);
      alert('Failed to create card');
    }
  };

  if (!isAdding) {
    return (
      <button className={styles.addCardButton} onClick={() => setIsAdding(true)}>
        + Add a card
      </button>
    );
  }

  return (
    <div ref={formRef} className={styles.addCardForm}>
      <Textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title for this card..."
        rows={3}
        fullWidth
        autoFocus
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAdd();
          }
        }}
      />
      <div className={styles.addCardActions}>
        <div className={styles.actionRow}>
          <Button 
            size="small" 
            className={styles.addBtn}
            onClick={handleAdd} 
            disabled={!title.trim()}
          >
            Add Card
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
    </div>
  );
};

export default AddCard;