import { Schema, model, models } from 'mongoose';

const summarySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authorID: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  description: {
    type: String,
    required: true,
  },
  topicID: {
    type: String,
    required: true,
  },
  isLocked: {
    type: Boolean,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: null,
  },
});

const Summary = models.Summary || model('Summary', summarySchema);

export default Summary;
