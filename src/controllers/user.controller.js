import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // step retrieve data from frontend
  // validation - not empty
  // check if user already exist: username, email
  // check for images check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove paasword and refresh token field from response
  // check for user creation
  // return res
  const { username, fullName, email, password } = req.body;
  console.log(username, fullName, email, password);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //validation if user already exist
  const isUserExist = User.findOne({ $or: [{ username }, { email }] });
  if (isUserExist) {
    throw new ApiError(409, "user with email or username already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }

  //upload on cloudinary from local server
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  //checking if avatar is successfully uploaded on cloudinary
  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user = await User.create({
    fullName,
    email,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const isUserCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (isUserCreated) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, isUserCreated, "user Registered successfully"));
});

export { registerUser };
