import {WordsRanking} from "../wordsRanking";
import {RankedWord} from "../rankedWord";

export class ByFrequencyWordsRanking implements WordsRanking {
    rank(wordsToRank: string[]): RankedWord[] {
        const wordFrequencies = this.generateWordFrequencyMap(wordsToRank);
        const rankedWords = this.rankWordFrom(wordFrequencies);
        this.sortByFrequency(rankedWords);
        return rankedWords;
    }

    private sortByFrequency(rankedWords: RankedWord[]): void {
        rankedWords.sort((a, b) => b.frequency - a.frequency);
    }

    private rankWordFrom(wordFrequencyMap: Map<string, number>): RankedWord[] {
        return Array.from(wordFrequencyMap.entries()).map(
            ([word, frequency]) => new RankedWord(word, frequency)
        );
    }

    private generateWordFrequencyMap(wordsToRank: string[]): Map<string, number> {
        return wordsToRank.reduce(
            (acc: Map<string, number>, word: string) => {
                acc.set(word, (acc.get(word) ?? 0) + 1);
                return acc;
            },
            new Map<string, number>()
        );
    }
}