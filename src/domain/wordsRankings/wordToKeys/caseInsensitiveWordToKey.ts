import {WordToKey} from "../wordToKey";

export class CaseInsensitiveWordToKey implements WordToKey {
    getKey(word: string): string {
        return word.toLowerCase();
    }
}