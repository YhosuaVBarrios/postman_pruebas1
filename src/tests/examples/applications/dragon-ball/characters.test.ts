import Requests from "@requests/examples/applications/dragon-ball/request"; //importamos porque necesitamos hacer uso de request para la url endpoint headers
import LoadEnvironment from "@utils/loadEnvironment"; //Utilizamos para buscar la url que indicamos por consola
import CharactersValidation from "@validations/examples/applications/dragon-ball/charactersValidation";

// Fixtures:archivo de datos
const data = LoadEnvironment.getFixture(
  "examples/applications/dragon-ball/data/characters.json"
);

// Instances
const requests = Requests.getInstance();
const charactersValidation = CharactersValidation.getInstance();

// QASE TEST RUN EXAMPLE: https://app.qase.io/public/report/6c71a530848030ad1b9be748338e7fd97e3c36f8

/**
 * @group EN
 * @group DragonBall
 * @group Regression
 */
describe("Characters", () => {
  it("DEMO2023-49 - Get all characters and check any description is empty", async () => {
    //Definimos el nombre del test
    const characters = await requests.getCharacters(); //Esperamos a que retorne con la informacion de request.getCharacters
    // console.log(characters.body);
    charactersValidation.checkCharactersDescriptionNotEmpty(characters);
  });


  it("DEMO2023-50 - Get a character by ID and check its name in an existing file.", async () => {
    const characterIds = data.items.map((character) => character.id);
    const randomID =
      characterIds[Math.floor(Math.random() * characterIds.length)];
    const character = await requests.getCharacterByID(randomID);
    charactersValidation.checkCharacterNameByID(randomID, character.json.name);
  });

  it("DEMO2023-51 - Get a character by Name and check its id in an existing file.", async () => {
    const characterName = "Freezer";
    const character = await requests.getCharacterByName(characterName);
    charactersValidation.checkCharacterIDByName(
      character.json[0].id,
      characterName
    );
  });
});
