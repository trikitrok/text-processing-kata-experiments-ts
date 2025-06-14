import {WordToKey} from "../wordToKey";

export class CaseSensitiveWordToKey implements WordToKey {
    getKey(word: string): string {
        return word;
    }
}