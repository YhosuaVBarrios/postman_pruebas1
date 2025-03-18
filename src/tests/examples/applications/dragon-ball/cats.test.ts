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

/**
 * @group EN
 * @group Cats
 * @group Regression
 */

//Postman version cats

describe("Postman Version Tests Cats", () => {
  it("DEMO2025-1 - Get and check if lenght exits and is a number.", async () => {
    const factInfo = await requests.getCats();
    //console.log(factInfo);
    charactersValidation.chekKeyInJson(factInfo.body);
  });

  it("DEMO2025-2 - Get and check list of cats and parameters ,fact exits and is a string", async () => {
    const factInfo = await requests.getCatsList();
    //console.log(factInfo);
    charactersValidation.chekCharacterListInJson(factInfo.body);
  });
  it("DEMO2025-3 - Get and check list of cats and parameters ,fact exits and is a string", async () => {
    const factInfo = await requests.getCatsBreeds();
    //console.log(factInfo);
    charactersValidation.chekBreeds(factInfo.body);
  });
});
