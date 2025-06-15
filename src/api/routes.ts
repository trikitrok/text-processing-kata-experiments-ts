import {Router} from 'express';
import {AnalysisController} from "./analysisController";
import {RunAnalysis} from "../domain/runAnalysis";

const router = Router();

router.get('/v1/analysis', (req, res) => new AnalysisController(new RunAnalysis()).analyze(req, res));

export default router;