import { expect } from "chai";

export default class Expect {

    /**
     * @function containsWord
     * Checks if the given object contains a specific key and verifies its value contains a specific word.
     */
    static containsWord(value: string, word: string ): void {
      expect(value).to.have.string(word, `El título "${value}" no contiene "${word}"`);
    }
  }