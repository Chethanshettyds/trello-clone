import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useBoard } from '../../hooks/useBoard';
import { BoardProvider } from '../../context/BoardContext';
import { listService } from '../../services/listService';
import { cardService } from '../../services/cardService';
import { reorder, move } from '../../utils/helpers';
import BoardHeader from './BoardHeader';
import List from '../List/List';
import AddList from '../List/AddList';
import Loader from '../common/Loader';
import styles from './Board.module.css';

const BoardContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { board, loading, error, setBoard } = useBoard(id);

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { destination, source, type } = result;

      if (!destination || !board) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === 'LIST') {
        const reorderedLists = reorder(board.lists, source.index, destination.index);
        
        setBoard({ ...board, lists: reorderedLists });

        try {
          const listPositions = reorderedLists.map((list, index) => ({
            id: list._id,
            position: index
          }));
          await listService.updateListPositions(listPositions);
        } catch (err) {
          console.error('Failed to update list positions:', err);
        }
      }

      if (type === 'CARD') {
        const sourceList = board.lists.find(list => list._id === source.droppableId);
        const destList = board.lists.find(list => list._id === destination.droppableId);

        if (!sourceList || !destList) return;

        if (source.droppableId === destination.droppableId) {
          const reorderedCards = reorder(sourceList.cards, source.index, destination.index);
          
          const newLists = board.lists.map(list =>
            list._id === sourceList._id ? { ...list, cards: reorderedCards } : list
          );

          setBoard({ ...board, lists: newLists });

          try {
            const cardPositions = reorderedCards.map((card, index) => ({
              id: card._id,
              position: index,
              listId: sourceList._id
            }));
            await cardService.updateCardPositions(cardPositions);
          } catch (err) {
            console.error('Failed to update card positions:', err);
          }
        } else {
          // renamed variable from `result` to `moved` to avoid shadowing the outer `result` param
          const moved = move(
            sourceList.cards,
            destList.cards,
            source,
            destination
          );

          const newLists = board.lists.map(list => {
            if (list._id === source.droppableId) {
              return { ...list, cards: moved[source.droppableId] };
            }
            if (list._id === destination.droppableId) {
              return { ...list, cards: moved[destination.droppableId] };
            }
            return list;
          });

          setBoard({ ...board, lists: newLists });

          try {
            const allCardPositions = [
              ...moved[source.droppableId].map((card, index) => ({
                id: card._id,
                position: index,
                listId: source.droppableId
              })),
              ...moved[destination.droppableId].map((card, index) => ({
                id: card._id,
                position: index,
                listId: destination.droppableId
              }))
            ];
            await cardService.updateCardPositions(allCardPositions);
          } catch (err) {
            console.error('Failed to update card positions:', err);
          }
        }
      }
    },
    [board, setBoard]
  );

  if (loading) {
    return <Loader fullScreen />;
  }

  if (error || !board) {
    return (
      <div className={styles.error}>
        <h2>Error</h2>
        <p>{error || 'Board not found'}</p>
      </div>
    );
  }

  return (
    <div className={styles.board} style={{ backgroundColor: board.backgroundColor }}>
      <BoardHeader board={board} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="LIST">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.listsContainer}
            >
              {board.lists.map((list, index) => (
                <List key={list._id} list={list} index={index} />
              ))}
              {provided.placeholder}
              <AddList boardId={board._id} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const Board: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { board, loading, error, setBoard } = useBoard(id);

  return (
    <BoardProvider board={board} setBoard={setBoard}>
      <BoardContent />
    </BoardProvider>
  );
};

export default Board;