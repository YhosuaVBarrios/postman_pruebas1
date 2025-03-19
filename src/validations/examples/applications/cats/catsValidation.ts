import assert from "@validations/examples/applications/assert";
import { ObjectType } from "@classes/objectType";
import LoadEnvironment from "@utils/loadEnvironment";
import { any, string } from "pactum-matchers";

class CatsValidation {
  private static CatsValidation: CatsValidation;

  private FIXTURES_PATH = "examples/applications/cats";

  //private DATA = LoadEnvironment.getFixture(   // para buscar desde fichero
  // `${this.FIXTURES_PATH}/data/cats.json`
  //);

  static getInstance(): CatsValidation {
    if (!CatsValidation.CatsValidation) {
      CatsValidation.CatsValidation = new CatsValidation();
    }
    return CatsValidation.CatsValidation;
  }

  public chekCharacterListInJson = (breedInfo: ObjectType): void => {
    let validCount = 0;
    // Verificar si 'fact' es un objeto (puede ser un arreglo también)
    if (typeof breedInfo !== "object" || breedInfo === null) {
      throw new Error('La variable "factInfo" no es un objeto JSON válido');
    }

    breedInfo.data.forEach((item: any) => {
      // Validamos que ambos 'fact' y 'length' existan en el mismo objeto
      if (item.hasOwnProperty("fact") && item.hasOwnProperty("length")) {
        validCount++; // Aumentamos el contador solo si ambos existen
      } // Validamos que cada objeto tenga la propiedad 'fact'
      assert.toHaveProperty(item, "fact");
      // Validamos que el valor de 'fact' sea de tipo string
      assert.typeContentValue(item.fact, "string");

      // Validamos que cada objeto tenga la propiedad 'length'
      assert.toHaveProperty(item, "length");
      // Validamos que el valor de 'length' sea de tipo number
      assert.typeContentValue(item.length, "number");
      console.log(
        `Número de objetos que contienen tanto 'fact' como 'length': ${validCount}`
      );
      console.log(breedInfo.data);
    });
  };

  /**
   * @description postman prueba caharacter validation
   */
  public chekKeyInJson = (breedInfo: ObjectType): void => {
    // Verificar si 'fact' es un objeto (puede ser un arreglo también)
    if (typeof breedInfo !== "object" || breedInfo === null) {
      throw new Error('La variable "factInfo" no es un objeto JSON válido');
    }
    console.log(breedInfo);
    assert.toHaveProperty(breedInfo, "length");
    assert.toHaveProperty(breedInfo, "fact");
    assert.typeContentValue(breedInfo.fact, "string");
    assert.typeContentValue(breedInfo.length, "number");
  };

  public checkBreeds = (breedInfo: ObjectType): void => {
    let totalBreeds = 0; // Contador de razas
    let mutationBreeds = 0;
    // Verificar si 'fact' es un objeto (puede ser un arreglo también)
    if (typeof breedInfo !== "object" || breedInfo === null) {
      throw new Error('La variable "factInfo" no es un objeto JSON válido');
    }
    // Recorrer los elementos de factInfo.data
    breedInfo.data.forEach((item: any) => {
      // Verificamos que el objeto tenga la propiedad 'breed'
      if (item.hasOwnProperty("breed")) {
        totalBreeds++; // Contamos las razas
      }

      // Verificamos si el 'origin' es 'Mutation' para contar los gatos que cumplen esa condición
      if (item.origin === "Mutation") {
        mutationBreeds++; // Contamos los gatos con origen "Mutation"
      }

      // Validamos que cada objeto tenga las propiedades 'breed' y 'origin'
      assert.toHaveProperty(item, "breed");
      assert.toHaveProperty(item, "origin");
    });

    // Imprimir los resultados
    console.log(
      `Existen ${totalBreeds} razas de gatos, pero solo ${mutationBreeds} son de origen Mutation.`
    );
  };
}
export default CatsValidation;
