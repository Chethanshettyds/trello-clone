import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card as CardType } from '../../types';
import styles from './Card.module.css';

interface CardProps {
  card: CardType;
  index: number;
  onClick: () => void;
}

const Card = memo<CardProps>(({ card, index, onClick }) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
  };

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${styles.card} ${snapshot.isDragging ? styles.cardDragging : ''}`}
          onClick={onClick}
        >
          <div className={styles.cardTitle}>{card.title}</div>
          {card.description && (
            <div className={styles.cardDescription}>
              <svg className={styles.descIcon} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18v2H3V3zm0 4h12v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2z" />
              </svg>
            </div>
          )}
          <div className={styles.cardDateTime}>
            <svg className={styles.clockIcon} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <span>{formatDateTime(card.createdAt)}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip render), false otherwise (render)
  return (
    prevProps.card._id === nextProps.card._id &&
    prevProps.card.title === nextProps.card.title &&
    prevProps.card.description === nextProps.card.description &&
    prevProps.card.createdAt === nextProps.card.createdAt &&
    prevProps.index === nextProps.index &&
    prevProps.onClick === nextProps.onClick
  );
});

Card.displayName = 'Card';

export default Card;