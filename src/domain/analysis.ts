import {WordsExtraction} from "./wordsExtraction";
import {AllWordsExtraction} from "./wordsExtractions/allWordsExtraction";
import {AnalysisResult} from "./analysisResult";
import {RankedWord} from "./rankedWord";
import {WordsRanking} from "./wordsRanking";

export class Analysis {
    private readonly wordsToRankExtraction: WordsExtraction;
    private readonly textWordsExtraction: WordsExtraction;
    private wordsRanking: WordsRanking;

    constructor(wordsToRankExtraction: WordsExtraction, wordsRanking: WordsRanking) {
        this.wordsToRankExtraction = wordsToRankExtraction;
        this.textWordsExtraction = new AllWordsExtraction();
        this.wordsRanking = wordsRanking;
    }

    runOn(text: string): AnalysisResult {
        return new AnalysisResult(this.rankWordsIn(text), this.countWordsIn(text));
    }

    private countWordsIn(text: string): number {
        return this.textWordsExtraction.extractFrom(text).length;
    }

    private rankWordsIn(text: string): RankedWord[] {
        const wordsToRank = this.wordsToRankExtraction.extractFrom(text);
        return this.wordsRanking.rank(wordsToRank);
    }
}