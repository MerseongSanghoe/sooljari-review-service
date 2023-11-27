'use strict';
//@ts-check

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    alcohol_linked: { type: Boolean },
    alcohol_linked_id: { type: Number },
    alcohol_info: { 
        title: String,
        category: String,
        degree: Number,
    }, // alcohol_linked가 false인 경우에만 사용
    reviews: [{
        block_type: Number,
        tags: [String]
    }],
  },
  {
    timestamps: true,
    collection: "soojari-review-collection",
  }
);

// Create Model & Export
export default mongoose.model("Review", reviewSchema);
