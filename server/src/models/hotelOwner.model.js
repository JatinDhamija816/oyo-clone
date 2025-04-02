import { model, Schema, Types } from 'mongoose';

const hotelOwnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hotels: [
      {
        type: Types.ObjectId,
        ref: 'Hotel',
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      code: String,
      expiresAt: Date,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    accountLocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'owner',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const HotelOwner = model('HotelOwner', hotelOwnerSchema);
export default HotelOwner;
