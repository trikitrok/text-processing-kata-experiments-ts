import {WordsExtraction} from "./wordsExtraction";
import {AllWordsExtraction} from "./wordsExtractions/allWordsExtraction";
import {AnalysisResult} from "./analysisResult";
import {RankedWord} from "./rankedWord";
import {ByFrequencyWordsRanking} from "./wordsRankings/byFrequencyWordsRanking";

export class Analysis {
    private readonly wordsToRankExtraction: WordsExtraction;
    private readonly textWordsExtraction: WordsExtraction;
    private wordsRanking: ByFrequencyWordsRanking;

    constructor(wordsToRankExtraction: WordsExtraction) {
        this.wordsToRankExtraction = wordsToRankExtraction;
        this.textWordsExtraction = new AllWordsExtraction();
        this.wordsRanking = new ByFrequencyWordsRanking();
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