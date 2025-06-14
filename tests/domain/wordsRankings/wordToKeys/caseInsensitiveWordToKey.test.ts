import {CaseInsensitiveWordToKey} from "../../../../src/domain/wordsRankings/wordToKeys/caseInsensitiveWordToKey";

describe('case insensitive word to key', () => {
    it.each([
        ["a", "a"],
        ["A", "a"],
        ["3AbCdX", "3abcdx"],
    ])("keys are only lower case", (word: string, key: string) => {
        const wordToKey = new CaseInsensitiveWordToKey();

        const result = wordToKey.getKey(word);

        expect(result).toEqual(key);
    });
})