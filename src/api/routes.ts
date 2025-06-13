import {Router} from 'express';
import {AnalysisController} from "./analysisController";
import {RunAnalysis} from "../domain/runAnalysis";

const router = Router();

router.get('/v1/analysis', new AnalysisController(new RunAnalysis()).analyze);

export default router;