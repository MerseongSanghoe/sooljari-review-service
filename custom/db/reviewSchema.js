import mongoose from 'mongoose';

const reviewBlock = {
  block_type: Number,
  tags: [String],
};

const reviewSchema = new mongoose.Schema(
  {
    writer_id: Number,
    alcohol_linked: Boolean,
    alcohol_linked_id: Number,
    alcohol_info: {
      title: String,
      category: String,
      degree: Number,
    }, // alcohol_linked가 false인 경우에만 사용
    reviews: [reviewBlock],
  },
  {
    timestamps: true,
    collection: 'soojari-review-collection',
  }
);

// Create Model & Export
export default mongoose.model('Review', reviewSchema);
