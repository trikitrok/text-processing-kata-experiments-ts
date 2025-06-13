import {InputParser} from "./inputParser";
import {TextAnalyzerFactory} from "../domain/textAnalyzerFactory";
import {Display} from "./display";
import {TextBasedReporter} from "./textBasedReporter";

export class TextAnalyzerConsoleApp {
    private readonly reporter: TextBasedReporter;
    private inputParser: InputParser;

    constructor(display: Display) {
        this.reporter = new TextBasedReporter(display);
        this.inputParser = new InputParser();
    }

    analyze(input: string): void {
        const {text, options} = this.inputParser.parseInput(input);
        const analysis = TextAnalyzerFactory.createAnalysis(options);
        this.reporter.report(analysis.runOn(text));
    }
}

