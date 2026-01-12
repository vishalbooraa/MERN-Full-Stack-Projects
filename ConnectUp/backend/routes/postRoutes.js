import { Router } from "express";
const router=Router();
import { activeCheck, createPost,getAllPosts,deletePost, commentPost, getComments, deleteComment, increaseLikes } from "../controllers/postController.js";
import multer from "multer";

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads/");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload=multer({storage:storage});

router.route("/").get(activeCheck);


router.route("/create_post").post(upload.single("media"),createPost);
router.route("/get_all_posts").get(getAllPosts);
router.route("/delete_post").delete(deletePost);
router.route("/comment_post").post(commentPost);
router.route("/get_comments").get(getComments);
router.route("delete_comment").delete(deleteComment);
router.route("/increment_post_likes").post(increaseLikes);







export default router;