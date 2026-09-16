import {v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs from "fs";


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        }) 

        //File has been uploaded successfully
        console.log(`File is uploaded on cloudinary ${response.url}`);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.error("Cloudinary upload failed:", error)
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload op. got failed
        }
        return null
        
    }
}

export {uploadOnCloudinary}
