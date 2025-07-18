import {Display} from "../../src/cliApp/display";
import {TextBasedReporter} from "../../src/cliApp/textBasedReporter";
import {anAnalysisResult, rankedWord} from "../helpers/builders";

describe('TextBasedReporter', () => {
    let display: jest.Mocked<Display>;
    let analyzer: TextBasedReporter;

    beforeEach(() => {
        display = {showText: jest.fn()};
        analyzer = new TextBasedReporter(display);
    })

    it('reporting no words', () => {
        analyzer.report(anAnalysisResult().build());

        expect(display.showText).toHaveBeenCalledWith("The text contains 0 words.\n");
    });

    it.each([
        ["pies"],
        ["text"],
    ])('reporting one word "%s"', (word: string) => {
        analyzer.report(
            anAnalysisResult().ofTextWithLength(1).add(
                rankedWord(word).withFrequency(1)
            ).build()
        );

        expect(display.showText).toHaveBeenCalledWith(
            "This is the top 1 most used word:\n" +
            `1 ${word} (1)\n` +
            "The text contains 1 word.\n"
        );
    });

    it('reporting some words', () => {
        analyzer.report(
            anAnalysisResult().ofTextWithLength(3).add(
                rankedWord("koko").withFrequency(2)
            ).add(
                rankedWord("word").withFrequency(1)
            ).build()
        );

        expect(display.showText).toHaveBeenCalledWith(
            "These are the top 2 most used words:\n" +
            `1 koko (2)\n` +
            `2 word (1)\n` +
            "The text contains 3 words.\n"
        );
    });
});