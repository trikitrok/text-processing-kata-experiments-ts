import {RankedWord} from "./rankedWord";

export interface WordsRanking {
    rank(wordsToRank: string[]): RankedWord[];
}