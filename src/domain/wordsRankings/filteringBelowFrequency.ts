import {WordsRanking} from "../wordsRanking";
import {RankedWord} from "../rankedWord";

export class FilteringBelowFrequency implements WordsRanking {
    private readonly frequencyThreshold: number;
    private readonly wordsRanking: WordsRanking;

    constructor(frequencyThreshold: number, wordsRanking: WordsRanking) {
        this.frequencyThreshold = frequencyThreshold;
        this.wordsRanking = wordsRanking;
    }

    rank(wordsToRank: string[]): RankedWord[] {
        return this.wordsRanking.rank(wordsToRank).filter(word => word.frequency >= this.frequencyThreshold);
    }
}