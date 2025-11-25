import mongoose, { Schema } from 'mongoose';
import { IBoard } from '../types';

const boardSchema = new Schema<IBoard>(
  {
    title: {
      type: String,
      required: [true, 'Board title is required'],
      trim: true,
      minlength: [1, 'Board title must be at least 1 character'],
      maxlength: [255, 'Board title cannot exceed 255 characters']
    },
    backgroundColor: {
      type: String,
      default: '#0079bf',
      validate: {
        validator: function(v: string) {
          return /^#[0-9A-F]{6}$/i.test(v);
        },
        message: 'Invalid color format. Use hex color code (e.g., #0079bf)'
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

boardSchema.virtual('lists', {
  ref: 'List',
  localField: '_id',
  foreignField: 'boardId'
});

const Board = mongoose.model<IBoard>('Board', boardSchema);

export default Board;