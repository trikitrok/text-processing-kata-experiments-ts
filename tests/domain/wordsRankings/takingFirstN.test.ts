import {WordsRanking} from "../../../src/domain/wordsRanking";
import {rankedWord, rankedWords} from "../../helpers/builders";
import {RankedWord} from "../../../src/domain/rankedWord";
import {TakingFirstN} from "../../../src/domain/wordsRankings/takingFirstN";

describe('taking first n ranked words', () => {
    let decoratedWordsRanking: jest.Mocked<WordsRanking>;
    let wordsRanking: WordsRanking;

    beforeEach(() => {
        decoratedWordsRanking = {rank: jest.fn()};
    })

    it.each([
        [0, []],
        [1, rankedWords(rankedWord("kokikoko").withFrequency(2))],
        [2, rankedWords(rankedWord("kokikoko").withFrequency(2), rankedWord("pepe").withFrequency(1))],
        [3, rankedWords(rankedWord("kokikoko").withFrequency(2), rankedWord("pepe").withFrequency(1))],
    ])("takes first %d ranked words", (numberOfWords: number, expectedRankedWords: RankedWord[]) => {
        decoratedWordsRanking.rank.mockReturnValue(rankedWords(rankedWord("kokikoko").withFrequency(2), rankedWord("pepe").withFrequency(1)));
        wordsRanking = createWordsRankingFilteringFrequenciesBelow(numberOfWords);

        const result = wordsRanking.rank(["pepe", "kokikoko", "kokikoko"]);

        expect(result).toEqual(expectedRankedWords);
    });

    function createWordsRankingFilteringFrequenciesBelow(numberOfWords: number): WordsRanking {
        return new TakingFirstN(numberOfWords, decoratedWordsRanking);
    }
})