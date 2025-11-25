import mongoose, { Schema } from 'mongoose';
import { IList } from '../types';

const listSchema = new Schema<IList>(
  {
    title: {
      type: String,
      required: [true, 'List title is required'],
      trim: true,
      maxlength: [255, 'List title cannot exceed 255 characters']
    },
    position: {
      type: Number,
      required: true,
      default: 0
    },
    boardId: {
      type: String,
      required: [true, 'Board ID is required'],
      ref: 'Board'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

listSchema.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'listId'
});

listSchema.index({ boardId: 1, position: 1 });

const List = mongoose.model<IList>('List', listSchema);

export default List;