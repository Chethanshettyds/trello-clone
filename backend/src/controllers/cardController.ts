import { Request, Response, NextFunction } from 'express';
import Card from '../models/Card';
import List from '../models/List';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, listId, position } = req.body;

    const list = await List.findById(listId);
    if (!list) {
      sendError(res, 'List not found', 'Not Found', 404);
      return;
    }

    let cardPosition = position;
    if (cardPosition === undefined) {
      const maxPositionCard = await Card.findOne({ listId }).sort({ position: -1 });
      cardPosition = maxPositionCard ? maxPositionCard.position + 1 : 0;
    }

    const card = await Card.create({
      title,
      description: description || '',
      listId,
      position: cardPosition
    });

    sendSuccess(res, card, 'Card created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateCard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, position, listId } = req.body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (position !== undefined) updateData.position = position;
    if (listId !== undefined) {
      const list = await List.findById(listId);
      if (!list) {
        sendError(res, 'List not found', 'Not Found', 404);
        return;
      }
      updateData.listId = listId;
    }

    const card = await Card.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!card) {
      sendError(res, 'Card not found', 'Not Found', 404);
      return;
    }

    sendSuccess(res, card, 'Card updated successfully');
  } catch (error) {
    next(error);
  }
};

export const updateCardPositions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { cards } = req.body;

    if (!Array.isArray(cards)) {
      sendError(res, 'Cards must be an array', 'Bad Request', 400);
      return;
    }

    const updatePromises = cards.map((item: { id: string; position: number; listId: string }) =>
      Card.findByIdAndUpdate(
        item.id,
        { position: item.position, listId: item.listId },
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    sendSuccess(res, { updated: cards.length }, 'Card positions updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const card = await Card.findByIdAndDelete(id);

    if (!card) {
      sendError(res, 'Card not found', 'Not Found', 404);
      return;
    }

    sendSuccess(res, { id }, 'Card deleted successfully');
  } catch (error) {
    next(error);
  }
};