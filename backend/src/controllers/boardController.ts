import { Request, Response, NextFunction } from 'express';
import Board from '../models/Board';
import List from '../models/List';
import Card from '../models/Card';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const createBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, backgroundColor } = req.body;

    const board = await Board.create({
      title,
      backgroundColor: backgroundColor || '#0079bf'
    });

    sendSuccess(res, board, 'Board created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getAllBoards = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const boards = await Board.find().sort({ createdAt: -1 });
    sendSuccess(res, boards, 'Boards retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getBoardById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const lists = await List.find({ boardId: id }).sort({ position: 1 });

    const listIds = lists.map(list => list._id.toString());
    const cards = await Card.find({ listId: { $in: listIds } }).sort({ position: 1 });

    const listsWithCards = lists.map(list => {
      const listCards = cards.filter(card => card.listId === list._id.toString());
      return {
        ...list.toObject(),
        cards: listCards
      };
    });

    const board = await Board.findById(id);
    
    if (!board) {
      sendError(res, 'Board not found', 'Not Found', 404);
      return;
    }

    const boardWithLists = {
      ...board.toObject(),
      lists: listsWithCards
    };

    sendSuccess(res, boardWithLists, 'Board retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const updateBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, backgroundColor } = req.body;

    const board = await Board.findByIdAndUpdate(
      id,
      { title, backgroundColor },
      { new: true, runValidators: true }
    );

    if (!board) {
      sendError(res, 'Board not found', 'Not Found', 404);
      return;
    }

    sendSuccess(res, board, 'Board updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const board = await Board.findByIdAndDelete(id);

    if (!board) {
      sendError(res, 'Board not found', 'Not Found', 404);
      return;
    }

    const lists = await List.find({ boardId: id });
    const listIds = lists.map(list => list._id.toString());

    await Card.deleteMany({ listId: { $in: listIds } });
    await List.deleteMany({ boardId: id });

    sendSuccess(res, { id }, 'Board deleted successfully');
  } catch (error) {
    next(error);
  }
};