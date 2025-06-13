import {rankedWord, rankedWords} from "../../helpers/builders";
import {WordsRanking} from "../../../src/domain/wordsRanking";
import {RankedWord} from "../../../src/domain/rankedWord";
import {FilteringBelowFrequency} from "../../../src/domain/wordsRankings/filteringBelowFrequency";

describe('filtering low frequencies', () => {
    let decoratedWordsRanking: jest.Mocked<WordsRanking>;
    let wordsRanking: WordsRanking;

    beforeEach(() => {
        decoratedWordsRanking = {rank: jest.fn()};
    })

    it.each([
        [3, []],
        [2, rankedWords(rankedWord("kokikoko").withFrequency(2))],
        [1, rankedWords(rankedWord("kokikoko").withFrequency(2), rankedWord("pepe").withFrequency(1))],
    ])("filters words with frequency lower than the given threshold", (frequencyThreshold: number, expectedRankedWords: RankedWord[]) => {
        decoratedWordsRanking.rank.mockReturnValue(rankedWords(rankedWord("kokikoko").withFrequency(2), rankedWord("pepe").withFrequency(1)));
        wordsRanking = createWordsRankingFilteringFrequenciesBelow(frequencyThreshold);

        const result = wordsRanking.rank(["pepe", "kokikoko", "kokikoko"]);

        expect(result).toEqual(expectedRankedWords);
    });

    function createWordsRankingFilteringFrequenciesBelow(frequencyThreshold: number): WordsRanking {
        return new FilteringBelowFrequency(frequencyThreshold, decoratedWordsRanking);
    }
})