import {Request, Response} from "express";
import {QueryStringParser} from "./QueryStringParser";
import {ForRunningAnalysis} from "../domain/forRunningAnalysis";

export class AnalysisController {
    private readonly runAnalysis: ForRunningAnalysis;

    constructor(runAnalysis: ForRunningAnalysis) {
        this.runAnalysis = runAnalysis;
    }

    analyze(req: Request, res: Response): void {
        try {
            const input = this.queryStringParser().extractInput(req);
            res.json({analysis: this.runAnalysis.execute(input)});
        } catch (err) {
            res.status(500).json({error: 'Internal server error.'});
        }
    }

    private queryStringParser(): QueryStringParser {
        return new QueryStringParser();
    }
}