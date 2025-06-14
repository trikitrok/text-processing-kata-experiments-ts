import {Display} from "../../src/cliApp/display";
import {TextAnalyzerConsoleApp} from "../../src/cliApp/textAnalyzerConsoleApp";

describe('Text Analyzer Console App', () => {
    let display: jest.Mocked<Display>;
    let analyzerApp: TextAnalyzerConsoleApp;

    beforeEach(() => {
        display = {showText: jest.fn()};
        analyzerApp = new TextAnalyzerConsoleApp(display);
    });

    it('analyzing text with 0 words', () => {
        analyzerApp.analyze("");

        expect(display.showText).toHaveBeenCalledWith("The text contains 0 words.\n");
    });

    it('analyzing text with several words', () => {
        analyzerApp.analyze("koko word koko");

        expect(display.showText).toHaveBeenCalledWith(
            "These are the top 2 most used words:\n" +
            `1 koko (2)\n` +
            `2 word (1)\n` +
            "The text contains 3 words.\n"
        );
    });

    it('analyzing text excluding some words', () => {
        analyzerApp.analyze("koko word koko --noshow=[koko]");

        expect(display.showText).toHaveBeenCalledWith(
            "This is the top 1 most used word:\n" +
            `1 word (1)\n` +
            "The text contains 3 words.\n"
        );
    });

    it('analyzing text filtering words below a given frequency', () => {
        analyzerApp.analyze("koko word koko --minfreq=2");

        expect(display.showText).toHaveBeenCalledWith(
            "This is the top 1 most used word:\n" +
            `1 koko (2)\n` +
            "The text contains 3 words.\n"
        );
    });

    it('analyzing text taking first n words', () => {
        analyzerApp.analyze("koko word koko pepe pepe pepe --max=2");

        expect(display.showText).toHaveBeenCalledWith(
            "These are the top 2 most used words:\n" +
            `1 pepe (3)\n` +
            `2 koko (2)\n` +
            "The text contains 6 words.\n"
        );
    });

    it.each([
        ["koko word koko pepe pepe pepe word --max=2 --minfreq=2"],
        ["koko word koko pepe pepe pepe word --minfreq=2 --max=2"],
    ])
    ('analyzing text filtering words below a given frequency and taking first n words', (consoleInput: string) => {
        analyzerApp.analyze(consoleInput);

        expect(display.showText).toHaveBeenCalledWith(
            "These are the top 2 most used words:\n" +
            `1 pepe (3)\n` +
            `2 koko (2)\n` +
            "The text contains 7 words.\n"
        );
    });

    it('analyzing text -nocase option activated', () => {
        analyzerApp.analyze("Word word --nocase=true");

        expect(display.showText).toHaveBeenCalledWith(
            "This is the top 1 most used word:\n" +
            `1 word (2)\n` +
            "The text contains 2 words.\n"
        );
    });

    it.each([
        ["Word word --nocase=false"],
        ["Word word"],
    ])
    ('analyzing text -nocase option deactivated (default behaviour)', (consoleInput: string) => {
        analyzerApp.analyze(consoleInput);

        expect(display.showText).toHaveBeenCalledWith(
            "These are the top 2 most used words:\n" +
            `1 Word (1)\n` +
            `2 word (1)\n` +
            "The text contains 2 words.\n"
        );
    });
});