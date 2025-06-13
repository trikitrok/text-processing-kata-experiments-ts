import {Input} from "./input";
import {AnalysisResult} from "./analysisResult";

export interface ForRunningAnalysis {
    execute(input: Input): AnalysisResult;
}