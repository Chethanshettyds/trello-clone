import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card as CardType } from '../../types';
import styles from './Card.module.css';

interface CardProps {
  card: CardType;
  index: number;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, index, onClick }) => {
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
        </div>
      )}
    </Draggable>
  );
};

export default Card;