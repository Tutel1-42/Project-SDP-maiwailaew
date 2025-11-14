import mongoose from "mongoose";

const ToySchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, "Please add toy sku"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please add toy name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add description"],
    },
    arrivalDate: {
      type: String,
      required: [true, "Please add arrivalDate"],
    },
    availableQuota: {
      type: Number,
      required: [true, "Please add availableQuota"],
      min: [0, "Quota cannot be less than 0"],
    },
    posterPicture: {
      type: String,
      required: [true, "please add image URL"]
    }
    },
    {
        collection: 'arttoys',
        timestamps: true
    }
  );

const Toy = mongoose.models.Toy || mongoose.model("Toy",ToySchema)

export default Toy