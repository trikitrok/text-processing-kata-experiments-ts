import {Request} from "express";
import {Input} from "../domain/input";
import {Options} from "../domain/options";

export class QueryStringParser {
    extractInput(req: Request): Input {
        return {
            text: this.extractText(req),
            options: this.extractOptions(req)
        };
    }

    private extractText(req: Request): string {
        const {text} = req.query;
        return text as string || "";
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