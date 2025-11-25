import { Request, Response, NextFunction } from 'express';
import List from '../models/List';
import Card from '../models/Card';
import Board from '../models/Board';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const createList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, boardId, position } = req.body;

    const board = await Board.findById(boardId);
    if (!board) {
      sendError(res, 'Board not found', 'Not Found', 404);
      return;
    }

    let listPosition = position;
    if (listPosition === undefined) {
      const maxPositionList = await List.findOne({ boardId }).sort({ position: -1 });
      listPosition = maxPositionList ? maxPositionList.position + 1 : 0;
    }

    const list = await List.create({
      title,
      boardId,
      position: listPosition
    });

    sendSuccess(res, list, 'List created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, position } = req.body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (position !== undefined) updateData.position = position;

    const list = await List.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!list) {
      sendError(res, 'List not found', 'Not Found', 404);
      return;
    }

    sendSuccess(res, list, 'List updated successfully');
  } catch (error) {
    next(error);
  }
};

export const updateListPositions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { lists } = req.body;

    if (!Array.isArray(lists)) {
      sendError(res, 'Lists must be an array', 'Bad Request', 400);
      return;
    }

    const updatePromises = lists.map((item: { id: string; position: number }) =>
      List.findByIdAndUpdate(item.id, { position: item.position }, { new: true })
    );

    await Promise.all(updatePromises);

    sendSuccess(res, { updated: lists.length }, 'List positions updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const list = await List.findByIdAndDelete(id);

    if (!list) {
      sendError(res, 'List not found', 'Not Found', 404);
      return;
    }

    await Card.deleteMany({ listId: id });

    sendSuccess(res, { id }, 'List deleted successfully');
  } catch (error) {
    next(error);
  }
};