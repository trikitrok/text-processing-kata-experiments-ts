import {Options} from "../options";
import {WordsExtraction} from "../wordsExtraction";
import {ExclusionListWordsExtraction} from "../wordsExtractions/exclusionListWordsExtraction";
import {AllWordsExtraction} from "../wordsExtractions/allWordsExtraction";
import {Analysis} from "../analysis";
import {createWordsRanking} from "./wordsRankingFactory";

export class AnalysisFactory {
    static createAnalysis(options: Options): Analysis {
        return new Analysis(this.createWordsExtraction(options), createWordsRanking(options));
    }

    private static createWordsExtraction(options: Options): WordsExtraction {
        const wordsExtraction = new AllWordsExtraction();
        if (options.noShow) {
            return new ExclusionListWordsExtraction(options.noShow, wordsExtraction);
        }
        return wordsExtraction;
    }
}



