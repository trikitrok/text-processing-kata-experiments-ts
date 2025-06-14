import {RankedWord} from "../../src/domain/rankedWord";
import {rankedWord, rankedWords} from "../helpers/builders";
import {AllWordsExtraction} from "../../src/domain/wordsExtractions/allWordsExtraction";
import {Analysis} from "../../src/domain/analysis";
import {ByFrequencyWordsRanking} from "../../src/domain/wordsRankings/byFrequencyWordsRanking";
import {CaseSensitiveWordToKey} from "../../src/domain/wordsRankings/wordToKeys/caseSensitiveWordToKey";

describe('analysing text', () => {
    let analysis: Analysis;

    beforeEach(() => {
        analysis = new Analysis(
            new AllWordsExtraction(),
            new ByFrequencyWordsRanking(new CaseSensitiveWordToKey()));
    });

    it.each([
        ["", 0],
        ["text", 1],
        ['-_*(!@#$%^&*()_-={}[]:\"<>,.?/~`', 0],
        ["text longer", 2],
        ["text      longer", 2],
        ["text text longer", 3],
    ])('counting words of "%s"', (text: string, countedWords: number) => {
        expect(analysis.runOn(text).countedWords).toBe(countedWords);
    });

    it.each([
        ["", []],
        ['-_*(!@#$%^&*()_-={}[]:\"<>,.?/~`', []],
        ["text", rankedWords(rankedWord("text").withFrequency(1))],
        ["text ranking text ranking", rankedWords(rankedWord("text").withFrequency(2), rankedWord("ranking").withFrequency(2))],
        ["text ranking text ranking ranking", rankedWords(rankedWord("ranking").withFrequency(3), rankedWord("text").withFrequency(2))],
    ])('ranking words by frequency "%s"', (text: string, rankedWords: RankedWord[]) => {
        expect(analysis.runOn(text).rankedWords).toEqual(rankedWords);
    });
});