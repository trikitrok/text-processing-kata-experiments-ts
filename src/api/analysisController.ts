import {Request, Response} from "express";
import {QueryStringParser} from "./queryStringParser";
import {ForRunningAnalysis} from "../domain/forRunningAnalysis";

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
            res.json({analysis: this.runAnalysis.execute(input)});
        } catch (err) {
            res.status(500).json({error: 'Internal server error.'});
        }
    }
}