import { ObjectType } from '@classes/objectType';

class Common {
  /**
     * @function replaceTextInArray
     * @description This function replaces texts in an array of strings and returns an array with the modified values.
     * @arrayToReplace Array of strings which contains the texts to be replaced.
     * @replacers Strings that are going to be included in the array strings.
     */
  static replaceTextInArray(arrayToReplace: string[], [...replacers]: string[]): string[] {
    const arrayToReturn = [];

    arrayToReplace.forEach((row) => {
      arrayToReturn.push(Common.replace(row, replacers));
    });

    return arrayToReturn;
  }

  /**
   * @function replaceCustomTextInArray
   * @description This command replaces xpath templates with its final values. It uses the object keys as text to
   * replace and those values are replaced with their value
   * @arrayToReplace Array of strings which contains the texts to be replaced
   * @replacements Object where its keys are the strings to replace and its values are the values that need to be placed
   */
  static replaceCustomTextInArray(arrayToReplace: string[], replacements: ObjectType): string[] {
    const arrayToReturn = [];

    arrayToReplace.forEach((row) => {
      let modifiedRow = row;
      for (const key of Object.keys(replacements)) {
        modifiedRow = Common.replace(modifiedRow, [replacements[key]], key);
      }
      arrayToReturn.push(modifiedRow);
    });

    return arrayToReturn;
  }

  /**
   * @function replace
   * @description This command replaces xpath templates with its final values.
   * @replacers Strings that are going to be included in the xpath
   */
  static replace = (textToReplace: string, [...replacers]: string[], searchValue?: string): string => {
    let res = textToReplace;
    // eslint-disable-next-line no-template-curly-in-string
    let stringToReplace = '${string}';
    if (searchValue) {
      stringToReplace = stringToReplace.replace('string', searchValue);
    }
    for (const replacer of replacers) {
      res = res.replace(stringToReplace, replacer);
    }
    return res;
  };
}

export default Common;
