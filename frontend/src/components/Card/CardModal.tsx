import React, { useState, useEffect } from 'react';
import { Card, UpdateCardDto } from '../../types';
import { cardService } from '../../services/cardService';
import { useBoardContext } from '../../context/BoardContext';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import styles from './Card.module.css';

interface CardModalProps {
  card: Card;
  isOpen: boolean;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, isOpen, onClose }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { updateCardInBoard, removeCardFromList } = useBoardContext();

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [card]);

  const handleSave = async () => {
    if (!title.trim()) return;

    try {
      setIsSaving(true);
      const updateData: UpdateCardDto = {
        title: title.trim(),
        description: description.trim()
      };

      await cardService.updateCard(card._id, updateData);
      updateCardInBoard(card._id, card.listId, updateData);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update card:', err);
      alert('Failed to update card');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this card?')) {
      return;
    }

    try {
      await cardService.deleteCard(card._id);
      removeCardFromList(card.listId, card._id);
      onClose();
    } catch (err) {
      console.error('Failed to delete card:', err);
      alert('Failed to delete card');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <div className={styles.modalContent}>
        <div className={styles.titleSection}>
          {isEditing ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              isTitle
              autoFocus
            />
          ) : (
            <h2 className={styles.modalTitle} onClick={() => setIsEditing(true)}>
              {card.title}
              <span className={styles.editHint}>Click to edit</span>
            </h2>
          )}
        </div>

        <div className={styles.modalSection}>
          <h3 className={styles.sectionTitle}>Description</h3>
          {isEditing ? (
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a more detailed description..."
              rows={6}
              fullWidth
            />
          ) : (
            <div
              className={styles.descriptionContent}
              onClick={() => setIsEditing(true)}
            >
              {card.description || 'Click to add a description...'}
              {card.description && <span className={styles.editHint}>Click to edit</span>}
            </div>
          )}
        </div>

        <div className={styles.modalActions}>
          {isEditing && (
            <div className={styles.editActions}>
              <Button onClick={handleSave} disabled={isSaving || !title.trim()}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setTitle(card.title);
                  setDescription(card.description);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
          {!isEditing && (
            <Button variant="secondary" size="small" onClick={() => setIsEditing(true)}>
              ✏️ Edit
            </Button>
          )}
          <Button variant="danger" onClick={handleDelete}>
            🗑️ Delete Card
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;