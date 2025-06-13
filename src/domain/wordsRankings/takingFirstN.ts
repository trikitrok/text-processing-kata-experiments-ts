import {WordsRanking} from "../wordsRanking";
import {RankedWord} from "../rankedWord";

export class TakingFirstN implements WordsRanking {
    private readonly numberOfWords: number;
    private readonly wordsRanking: WordsRanking;

    constructor(numberOfWords: number, wordsRanking: WordsRanking) {
        this.numberOfWords = numberOfWords;
        this.wordsRanking = wordsRanking;
    }

    rank(wordsToRank: string[]): RankedWord[] {
        return this.wordsRanking.rank(wordsToRank).slice(0, this.numberOfWords);
    }
}