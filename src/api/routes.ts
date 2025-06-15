import {Router} from 'express';
import {runAnalysis} from "./analysisController";

const router = Router();

router.get('/v1/analysis', runAnalysis);

export default router;