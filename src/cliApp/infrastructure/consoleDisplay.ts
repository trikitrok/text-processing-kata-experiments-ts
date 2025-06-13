import {Display} from "../display";

class ConsoleDisplay implements Display {
    showText(text: string): void {
        console.log(text);
    }
}