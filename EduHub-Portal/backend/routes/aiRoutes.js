import express from "express";
import { chatWithAssistant,getAllThreads,getParticularThread,deleteThread} from "../controllers/aiControllers.js"

const router=express.Router();


router.post("/chat",chatWithAssistant);
router.get("/threads",getAllThreads)
router.get("/thread/:threadId",getParticularThread)
router.delete("/thread/:threadId",deleteThread)

export default router;
