import { Router } from "express";
import { register,login,uploadProfilePicture,updateUser,getUserAndProfile,updateProfileData,getAllUserProfiles,downloadUserResume, sendConnectionRequest, sentConnectionsRequests, recievedConnectionsRequests, respondToConnectionRequest } from "../controllers/userController.js";
import multer from "multer";


const router=Router();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads/");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload=multer({storage:storage});

router.route("/update_profile_picture").post(upload.single("profile_picture"),uploadProfilePicture);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user_update").post(updateUser)
router.route("/get_user_and_profile").get(getUserAndProfile);
router.route("/update_profile_data").post(updateProfileData);
router.route("/all_user_profiles").get(getAllUserProfiles);
router.route("/download_user_resume").get(downloadUserResume);
router.route("/send_connection_request").post(sendConnectionRequest);
router.route("/sent_connection_request").get(sentConnectionsRequests);
router.route("/received_connection_request").get(recievedConnectionsRequests); 
router.route("/respond_connection_request").post(respondToConnectionRequest);
router

export default router;