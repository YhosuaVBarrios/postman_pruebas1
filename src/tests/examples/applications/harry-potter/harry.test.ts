import Requests from "@requests/examples/applications/harry-potter/request"; //importamos porque necesitamos hacer uso de request para la url endpoint headers
import LoadEnvironment from "@utils/loadEnvironment"; //Utilizamos para buscar la url que indicamos por consola
import HarryValidation from "@validations/examples/applications/harry-potter/harryValidation";

// Fixtures:archivo de datos
//const data = LoadEnvironment.getFixture(   //para buscar desde fichero y comprobar unido a src/validations/examples/applications/cats/catsValidation.ts:(17:39)
//"examples/applications/cats/data/cats.json"
//);

// Instances
const requests = Requests.getInstance();
const harryValidation = HarryValidation.getInstance();

/**
 * @group EN
 * @group Harry
 * @group Regression
 */

//API version HarryPotter y residencias de HarryPotter

describe("Diferentes libros de HarryPotter", () => {
  it.only("HARRY2025-01 - Know the books that exist and the key value keys are complete with their type", async () => {
    const harryInfo = await requests.getBooks();
    harryValidation.chekKeyInJson(harryInfo.body);
    harryValidation.chekEmptyOrNull(harryInfo.body);
    harryValidation.checkTypeValue(harryInfo.body);
    harryValidation.checkWordInTitle(harryInfo.body);
  });

  it("DEMO2025-2 - Get and check list of cats and parameters ,fact exits and is a string", async () => {
   // const breedInfo = await requests.getCatsList();
    //console.log(factInfo);
    //catsValidation.chekCharacterListInJson(breedInfo.body);
  });
  it("DEMO2025-3 - Get and check list of cats is origin mutation", async () => {
  //  const breedInfo = await requests.getCatsBreeds();
    //console.log(factInfo);
    //catsValidation.checkBreeds(breedInfo.body);
  });
});
