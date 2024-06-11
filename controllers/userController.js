import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { User } from "../models/userSchema.js";
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !role || !password) {
    console.log("Missing fields:", { name, email, phone, role, password }); // Log which fields are missing
    return next(new ErrorHandler("Please enter all the details."));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("User with this email already exists."));
  }

  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });
  res.status(200).json({
    success: true,
    message: "User registered!",
    user,
  });
});
