import {Options} from "./options";
import {WordsExtraction} from "./wordsExtraction";
import {ExclusionListWordsExtraction} from "./wordsExtractions/exclusionListWordsExtraction";
import {AllWordsExtraction} from "./wordsExtractions/allWordsExtraction";
import {Analysis} from "./analysis";
import {ByFrequencyWordsRanking} from "./wordsRankings/byFrequencyWordsRanking";
import {WordsRanking} from "./wordsRanking";
import {FilteringBelowFrequency} from "./wordsRankings/filteringBelowFrequency";
import {TakingFirstN} from "./wordsRankings/takingFirstN";

export class AnalysisFactory {
    static createAnalysis(options: Options): Analysis {
        return new Analysis(this.createWordsExtraction(options), this.createWordsRanking(options));
    }

    private static createWordsRanking(options: Options): WordsRanking {
        let wordsRanking: WordsRanking = new ByFrequencyWordsRanking();
        if (options.minFreq) {
            wordsRanking = new FilteringBelowFrequency(options.minFreq, wordsRanking);
        }
        if (options.max) {
            wordsRanking = new TakingFirstN(options.max, wordsRanking);
        }
        return wordsRanking;
    }

    private static createWordsExtraction(options: Options): WordsExtraction {
        const wordsExtraction = new AllWordsExtraction();
        if (options.noShow) {
            return new ExclusionListWordsExtraction(options.noShow, wordsExtraction);
        }
        return wordsExtraction;
    }
}