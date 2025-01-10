import mongoose from "mongoose";

// Feedback Schema

const FeedbackSchema = new mongoose.Schema(
  {
    customerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", // Reference to the users collection
      required: true 
    },
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product", // Reference to the product collection
      required: true 
    },
    feedbackText: { 
      type: String, 
      required: true 
    },
    rating: { 
      type: Number, 
      required: true 
    },
    submissionDate: { 
      type: Date, 
      default: Date.now 
    }
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;

