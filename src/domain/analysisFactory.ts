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
        return this.wordsRankingCreationChain(options).create();
    }

    private static wordsRankingCreationChain(options: Options): RankingCreation {
        return new TakingFirstNRankingCreation(options, new FilteringBelowFrequencyCreation(options, new ByFrequencyWordsRankingCreation()));
    }

    private static createWordsExtraction(options: Options): WordsExtraction {
        const wordsExtraction = new AllWordsExtraction();
        if (options.noShow) {
            return new ExclusionListWordsExtraction(options.noShow, wordsExtraction);
        }
        return wordsExtraction;
    }
}

abstract class RankingCreation {
    public abstract create(): WordsRanking;

    protected abstract applies(): boolean;
}

class ByFrequencyWordsRankingCreation extends RankingCreation {
    public create(): WordsRanking {
        return new ByFrequencyWordsRanking();
    }

    protected applies(): boolean {
        return true;
    }
}

class TakingFirstNRankingCreation extends RankingCreation {
    private readonly rankingCreation: RankingCreation;
    private readonly options: Options;

    constructor(options: Options, rankingCreation: RankingCreation) {
        super();
        this.options = options;
        this.rankingCreation = rankingCreation;
    }

    public create(): WordsRanking {
        if (this.applies() && this.options?.max !== undefined) {
            return new TakingFirstN(this.options?.max, this.rankingCreation.create());
        }
        return this.rankingCreation.create();
    }

    protected applies(): boolean {
        return ('max' in this.options);
    }
}

class FilteringBelowFrequencyCreation extends RankingCreation {
    private readonly rankingCreation: RankingCreation;
    private readonly options: Options;

    constructor(options: Options, rankingCreation: RankingCreation) {
        super();
        this.options = options;
        this.rankingCreation = rankingCreation;
    }

    public create(): WordsRanking {
        if (this.applies() && this.options?.minFreq !== undefined) {
            return new FilteringBelowFrequency(this.options?.minFreq, this.rankingCreation.create());
        }
        return this.rankingCreation.create();
    }

    protected applies(): boolean {
        return ('minFreq' in this.options);
    }
}