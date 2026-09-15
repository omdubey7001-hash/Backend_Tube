import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message:"Maze Kro pagal chal gya"
    // })



    //get user detail from frontend
    //validation - not empty
    //check if user already exists
    //check for images, check for avatars
    //upload them to cloudinary
    //create user object - check entry in db
    //remove password and refresh token response field
    //check for user creation
    //return response


    //Get user detail 
    const {fullname, email, username, password} = req.body
    console.log("email",email);


    //check validation
    if(
        [fullname,email,username,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    //check if user already exists
    const existedUser = User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with this username or email already exists")
    }

    //check for images and avatar

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar File is required")
    }

    //Upload on Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    
    if(!avatar){
        throw new ApiError(400, "Avatar File is required");
    }

    //Create User 

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    //check In DB that user is created or not
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while creating the user")
    }

    return response.status(201).json(
        new ApiResponse(200,createdUser, "User registers Successfully")
    )

})

export {registerUser}