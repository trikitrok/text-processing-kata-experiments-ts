import {AnalysisResult} from "./analysisResult";
import {Input} from "./input";
import {Options} from "./options";
import {Analysis} from "./analysis";
import {AnalysisFactory} from "./factories/analysisFactory";
import {ForRunningAnalysis} from "./forRunningAnalysis";

export class RunAnalysis implements ForRunningAnalysis {
    execute(input: Input): AnalysisResult {
        return this.createAnalysis(input.options).runOn(input.text);
    }

    private createAnalysis(options: Options): Analysis {
        return AnalysisFactory.createAnalysis(options);
    }
}