import {Options} from "./options";
import {WordsExtraction} from "./wordsExtraction";
import {ExclusionListWordsExtraction} from "./wordsExtractions/exclusionListWordsExtraction";
import {AllWordsExtraction} from "./wordsExtractions/allWordsExtraction";
import {Analysis} from "./analysis";

export class TextAnalyzerFactory {
    static createAnalysis(options: Options): Analysis {
        return new Analysis(this.createWordsExtraction(options));
    }

    private static createWordsExtraction(options: Options): WordsExtraction {
        if (options.noShow) {
            return new ExclusionListWordsExtraction(options.noShow, new AllWordsExtraction());
        }
        return new AllWordsExtraction();
    }
}