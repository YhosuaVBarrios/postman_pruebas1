import { ObjectType } from '@classes/objectType';
import { expect } from 'chai';

export default class TextValidation {
  /**
   * @function checkMessage
   *
   * @description Checks that a text received from the Virtual Assistant in a defined position is the expected.
   * @param response {ObjectType} - Response of the Virtual Assistant after sending an event or a text.
   * @param messages {string[]} - Array of possible messages that can be received from the VA, in case that
   * the message would be random and had several possibilities.
   * @param exact {boolean} - Indicates if we are checking the string in a exact or includes way:
   * - true: exact
   * - false: includes
   */
  static checkMessage(response: ObjectType, messages: string[], exact: boolean): void {
    const { responseMessages } = response.json.queryResult;
    let actualText = '';
    let foundType = false;

    for (const message of responseMessages) {
      if (message.payload.type === 'text') {
        actualText = message.payload.responses[0].text;
        foundType = true;
        break;
      }
    }

    expect(foundType).to.equal(true, 'The specified message is not a text');

    let found = false;
    for (const message of messages) {
      if (
        (exact && actualText === message)
        || (!exact && actualText.includes(message))
      ) {
        found = true;
        break;
      }
    }
    expect(found).to.eql(true, `Message "${actualText}" does not coincide with the expected phrases: ${messages}`);
  }
}
