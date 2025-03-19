import assert from "@validations/examples/applications/assert";
import { ObjectType } from "@classes/objectType";
import LoadEnvironment from "@utils/loadEnvironment";
import { any, string } from "pactum-matchers";

class CharactersValidation {
  private static charactersValidation: CharactersValidation;

  private FIXTURES_PATH = "examples/applications/dragon-ball";

  private DATA = LoadEnvironment.getFixture(
    `${this.FIXTURES_PATH}/data/characters.json`
  );

  static getInstance(): CharactersValidation {
    if (!CharactersValidation.charactersValidation) {
      CharactersValidation.charactersValidation = new CharactersValidation();
    }
    return CharactersValidation.charactersValidation;
  }


  /**
   * @description Check the characters description is not empty
   */
  public checkCharactersDescriptionNotEmpty = (
    characters: ObjectType
  ): void => {
    for (const character of characters.json.items) {
      assert.notEmpty(
        character.description,
        `The character with ID: ${character.id} must have description`
      );
    }
  };


  /**
   * @description Check the characters name is not empty
   */
  public checkCharacterNameByID = (
    characterID: number,
    characterName: string
  ): void => {
    for (const character of this.DATA.items) {
      if (character.id === characterID) {
        assert.beEqual(
          characterName,
          character.name,
          `The character with ID: ${characterID} must have name`
        );
      }
    }
  };

  /**
   * @description Check the characters description is not empty
   */
  public checkCharacterIDByName = (
    characterID: number,
    characterName: string
  ): void => {
    for (const character of this.DATA.items) {
      if (character.name === characterName) {
        assert.beEqual(
          characterID,
          character.id,
          `The character with ID: ${characterID} must have a description`
        );
      }
    }
  };

  /**
   * @description Check the characters description is not empty
   */
  public checkCharacterIsString = (
    characterID: number,
    characterName: string
  ): void => {};
}

export default CharactersValidation;
