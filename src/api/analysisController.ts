import {Request, Response} from "express";
import {QueryStringParser} from "./queryStringParser";
import {ForRunningAnalysis} from "../domain/forRunningAnalysis";
import {Input} from "../domain/input";
import {AnalysisResult} from "../domain/analysisResult";

export class AnalysisController {
    private readonly runAnalysis: ForRunningAnalysis;
    private readonly parser: QueryStringParser;

    constructor(runAnalysis: ForRunningAnalysis) {
        this.runAnalysis = runAnalysis;
        this.parser = new QueryStringParser();
    }

    analyze(req: Request, res: Response): void {
        try {
            const input = this.parser.extractInput(req);
            res.json({analysis: this.runAnalysisOn(input)});
        } catch (err) {
            res.status(500).json({error: 'Internal server error.'});
        }
    }

    private runAnalysisOn(input: Input): AnalysisResult {
        return this.runAnalysis.execute(input);
    }
}