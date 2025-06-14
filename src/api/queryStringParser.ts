import {Request} from "express";
import {Input} from "../domain/input";
import {Options} from "../domain/options";

export class QueryStringParser {
    extractInput(req: Request): Input {
        let {text} = req.query;
        text = text as string || "";

        const options = this.extractOptions(req);

        return {text, options};
    }

    private extractOptions(req: Request): Options {
        const {excludedWords, freqAbove, wordsListed, caseInsensitive} = req.query;

        const options: Options = {};
        if (freqAbove) {
            options.minFreq = parseInt(freqAbove as string, 10) + 1;
        }
        if (caseInsensitive) {
            options.noCase = caseInsensitive === 'true';
        }
        if (wordsListed) {
            options.max = parseInt(wordsListed as string, 10);
        }
        if (excludedWords) {
            options.noShow = excludedWords as string[];
        }
        return options;
    }
}