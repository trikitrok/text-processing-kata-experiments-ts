import {InputParser} from "./inputParser";
import {Display} from "./display";
import {TextBasedReporter} from "./textBasedReporter";
import {RunAnalysis} from "../domain/runAnalysis";
import {ForRunningAnalysis} from "../domain/forRunningAnalysis";

export class TextAnalyzerConsoleApp {
    private readonly reporter: TextBasedReporter;
    private readonly inputParser: InputParser;
    private readonly forRunningAnalysis: ForRunningAnalysis;

    constructor(display: Display, forRunningAnalysis: ForRunningAnalysis = new RunAnalysis()) {
        this.reporter = new TextBasedReporter(display);
        this.inputParser = new InputParser();
        this.forRunningAnalysis = forRunningAnalysis;
    }

    analyze(consoleInput: string): void {
        const input = this.inputParser.parseInput(consoleInput);
        const analysisResult =  this.forRunningAnalysis.execute(input);
        this.reporter.report(analysisResult);
    }
}

