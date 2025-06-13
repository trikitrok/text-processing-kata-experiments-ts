import {Options} from "./options";
import {WordsExtraction} from "./wordsExtraction";
import {ExclusionListWordsExtraction} from "./wordsExtractions/exclusionListWordsExtraction";
import {AllWordsExtraction} from "./wordsExtractions/allWordsExtraction";
import {Analysis} from "./analysis";
import {ByFrequencyWordsRanking} from "./wordsRankings/byFrequencyWordsRanking";
import {WordsRanking} from "./wordsRanking";
import {FilteringBelowFrequency} from "./wordsRankings/filteringBelowFrequency";

export class AnalysisFactory {
    static createAnalysis(options: Options): Analysis {
        return new Analysis(this.createWordsExtraction(options), this.createWordsRanking(options));
    }

    private static createWordsRanking(options: Options): WordsRanking {
        if(options.minFreq) {
            return new FilteringBelowFrequency(options.minFreq, new ByFrequencyWordsRanking());
        }
        return new ByFrequencyWordsRanking();
    }

    private static createWordsExtraction(options: Options): WordsExtraction {
        if (options.noShow) {
            return new ExclusionListWordsExtraction(options.noShow, new AllWordsExtraction());
        }
        return new AllWordsExtraction();
    }
}