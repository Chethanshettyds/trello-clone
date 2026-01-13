import React, { useState, memo, useCallback } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { List as ListType, Card as CardType } from '../../types';
import Card from '../Card/Card';
import AddCard from '../Card/AddCard';
import CardModal from '../Card/CardModal';
import ListHeader from './ListHeader';
import styles from './List.module.css';

interface ListProps {
  list: ListType;
  index: number;
}

const List = memo<ListProps>(({ list, index }) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const handleCardClick = useCallback((card: CardType) => {
    setSelectedCard(card);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedCard(null);
  }, []);

  return (
    <>
      <Draggable draggableId={list._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`${styles.list} ${snapshot.isDragging ? styles.listDragging : ''}`}
          >
            <div {...provided.dragHandleProps}>
              <ListHeader list={list} />
            </div>

            <Droppable droppableId={list._id} type="CARD">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${styles.cardList} ${
                    snapshot.isDraggingOver ? styles.cardListDraggingOver : ''
                  }`}
                >
                  {list.cards.map((card, idx) => (
                    <Card
                      key={card._id}
                      card={card}
                      index={idx}
                      onClick={() => handleCardClick(card)}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <AddCard listId={list._id} />
          </div>
        )}
      </Draggable>

      {selectedCard && (
        <CardModal
          card={selectedCard}
          isOpen={!!selectedCard}
          onClose={handleModalClose}
        />
      )}
    </>
  );
});

List.displayName = 'List';

export default List;