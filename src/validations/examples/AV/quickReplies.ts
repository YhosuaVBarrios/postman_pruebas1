import { expect } from 'chai';
import { ObjectType } from '@classes/objectType';

export default class QuickReplies {
  /**
   * @function checkQuickReply
   *
   * @description Checks QuickReplies that are in the response payload are correct.
   * @param response {ObjectType} - Response of the Virtual Assistant after sending an event or a text.
   * @param quickReply {ObjectType} - Object with expected quickReplies located in fixtures/quickReplies.json file.
   */
  static checkQuickReply(response: ObjectType, quickReply: ObjectType): void {
    const { responseMessages } = response.json.queryResult;
    let receivedQuickReplies = [];
    let foundType = false;

    for (const message of responseMessages) {
      if (message.payload.type === 'quick_replies') {
        receivedQuickReplies = message.payload.responses[0].elements;
        foundType = true;
        break;
      }
    }

    expect(foundType).to.equal(true, 'The specified message is not a quick reply');

    let quickReplyFound = false;
    for (const receivedQuickReply of receivedQuickReplies) {
      if (this.deepEqual(receivedQuickReply, quickReply)) {
        quickReplyFound = true;
        break;
      }
    }
    expect(quickReplyFound).to.eql(true, `${JSON.stringify(quickReply)} quick reply was not found in the response`);
  }

  /**
   * @function deepEqual
   *
   * @description Compares two objects for deep equality. This function checks if two objects are equal by comparing
   * their properties recursively. It returns true if both objects have the same properties with the same values,
   * regardless of the order of the properties.
   *
   * @param obj1 {ObjectType} - The first object to compare.
   * @param obj2 {ObjectType} - The second object to compare.
   * @returns {boolean} - Returns true if the objects are deeply equal, otherwise false.
   */
  static deepEqual(obj1: ObjectType, obj2: ObjectType): boolean {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key) || !this.deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }
}
