import mongoose, { Schema } from 'mongoose';
import { ICard } from '../types';

const cardSchema = new Schema<ICard>(
  {
    title: {
      type: String,
      required: [true, 'Card title is required'],
      trim: true,
      maxlength: [500, 'Card title cannot exceed 500 characters']
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: [5000, 'Card description cannot exceed 5000 characters']
    },
    position: {
      type: Number,
      required: true,
      default: 0
    },
    listId: {
      type: String,
      required: [true, 'List ID is required'],
      ref: 'List'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

cardSchema.index({ listId: 1, position: 1 });

const Card = mongoose.model<ICard>('Card', cardSchema);

export default Card;