import Requests from "@requests/examples/applications/cats/request"; //importamos porque necesitamos hacer uso de request para la url endpoint headers
import LoadEnvironment from "@utils/loadEnvironment"; //Utilizamos para buscar la url que indicamos por consola
import CatsValidation from "@validations/examples/applications/cats/catsValidation";

// Fixtures:archivo de datos
//const data = LoadEnvironment.getFixture(   //para buscar desde fichero y comprobar unido a src/validations/examples/applications/cats/catsValidation.ts:(17:39)
//"examples/applications/cats/data/cats.json"
//);

// Instances..
const requests = Requests.getInstance();
const catsValidation = CatsValidation.getInstance();

/**
 * @group EN
 * @group Cats
 * @group Regression
 */

//Postman version cats

describe("Postman Version Tests Cats", () => {
  it("DEMO2025-1 - Get and check if lenght exits and is a number.", async () => {
    const breedInfo = await requests.getCats();
    //console.log(factInfo);
    catsValidation.chekKeyInJson(breedInfo.body);
  });

  it("DEMO2025-2 - Get and check list of cats and parameters ,fact exits and is a string", async () => {
    const breedInfo = await requests.getCatsList();
    //console.log(factInfo);
    catsValidation.chekCharacterListInJson(breedInfo.body);
  });
  it("DEMO2025-3 - Get and check list of cats is origin mutation", async () => {
    const breedInfo = await requests.getCatsBreeds();
    //console.log(factInfo);
    catsValidation.checkBreeds(breedInfo.body);
  });
});
