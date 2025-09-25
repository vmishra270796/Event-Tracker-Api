import mongoose from 'mongoose';
import crypto from 'crypto';

const eventSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    datetime: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String },
    shareSlug: { type: String, unique: true, sparse: true } // only if shared
  },
  { timestamps: true }
);

// Helper to generate slug
eventSchema.methods.generateShareSlug = function () {
  this.shareSlug = crypto.randomBytes(6).toString('hex'); // 12-char hex
};

export const Event = mongoose.model('Event', eventSchema);
