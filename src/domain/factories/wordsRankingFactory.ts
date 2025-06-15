import {WordsRanking} from "../wordsRanking";
import {Options} from "../options";
import {FilteringBelowFrequency} from "../wordsRankings/filteringBelowFrequency";
import {CaseSensitiveWordToKey} from "../wordsRankings/wordToKeys/caseSensitiveWordToKey";
import {CaseInsensitiveWordToKey} from "../wordsRankings/wordToKeys/caseInsensitiveWordToKey";
import {ByFrequencyWordsRanking} from "../wordsRankings/byFrequencyWordsRanking";
import {TakingFirstN} from "../wordsRankings/takingFirstN";
import {WordToKey} from "../wordsRankings/wordToKey";

export function createWordsRanking(options: Options): WordsRanking {
    return wordsRankingCreationChain(options).create();
}

function wordsRankingCreationChain(options: Options): WordsRankingCreation {
    return new TakingFirstNWordsRankingCreation(options,
        new FilteringBelowFrequencyWordsRankingCreationCreation(options,
            new ByFrequencyWordsRankingCreation(options)));
}

export abstract class WordsRankingCreation {
    public abstract create(): WordsRanking;

    protected abstract applies(): boolean;
}

export class ByFrequencyWordsRankingCreation extends WordsRankingCreation {
    private readonly options: Options;

    constructor(options: Options) {
        super();
        this.options = options;
    }

    public create(): WordsRanking {
        let wordToKey = this.createWorToKey();
        return new ByFrequencyWordsRanking(wordToKey);
    }

    protected applies(): boolean {
        return true;
    }

    private createWorToKey(): WordToKey {
        if (this.options.noCase) {
            return new CaseInsensitiveWordToKey()
        }
        return new CaseSensitiveWordToKey();
    }
}

export class TakingFirstNWordsRankingCreation extends WordsRankingCreation {
    private readonly rankingCreation: WordsRankingCreation;
    private readonly options: Options;

    constructor(options: Options, rankingCreation: WordsRankingCreation) {
        super();
        this.options = options;
        this.rankingCreation = rankingCreation;
    }

    public create(): WordsRanking {
        const wordsRanking = this.rankingCreation.create();
        if (this.applies() && this.options?.max !== undefined) {
            return new TakingFirstN(this.options?.max, wordsRanking);
        }
        return wordsRanking;
    }

    protected applies(): boolean {
        return this.options?.max !== undefined;
    }
}

export class FilteringBelowFrequencyWordsRankingCreationCreation extends WordsRankingCreation {
    private readonly rankingCreation: WordsRankingCreation;
    private readonly options: Options;

    constructor(options: Options, rankingCreation: WordsRankingCreation) {
        super();
        this.options = options;
        this.rankingCreation = rankingCreation;
    }

    public create(): WordsRanking {
        const wordsRanking = this.rankingCreation.create();
        if (this.applies() && this.options?.minFreq !== undefined) {
            return new FilteringBelowFrequency(this.options?.minFreq, wordsRanking);
        }
        return wordsRanking;
    }

    protected applies(): boolean {
        return this.options?.minFreq !== undefined;
    }
}