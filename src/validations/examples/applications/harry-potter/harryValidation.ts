import assert from "@validations/examples/applications/assert";
import { ObjectType } from "@classes/objectType";
import LoadEnvironment from "@utils/loadEnvironment";
import { any, string } from "pactum-matchers";
import expert from "@validations/examples/applications/expet";


class HarryValidation {
    private static HarryValidation: HarryValidation;

    private FIXTURES_PATH = "examples/applications/harrry-potter"; //Ruta de la carpeta donde se encuentra el json

    //private DATA = LoadEnvironment.getFixture(   // para buscar desde fichero
    // `${this.FIXTURES_PATH}/data/cats.json`
    //);

    static getInstance(): HarryValidation {
        if (!HarryValidation.HarryValidation) {
            HarryValidation.HarryValidation = new HarryValidation();
        }
        return HarryValidation.HarryValidation;
    }


    /**
     * @description Revisar que la resspuesta sea tipo json o objeto
     */
    public chekIsJson = (harryInfo: ObjectType): void => {
        if (typeof harryInfo !== "object" || harryInfo === null) {
            throw new Error('La variable "harryInfo" no es un objeto JSON válido');
        }
    }

    /**
    * @description Revisar que la resspuesta  sea de typo array y mostrar su longitud 
    */

    public chekIsArray = (harryInfo: ObjectType): void => {
        if (typeof harryInfo !== "object" || harryInfo === null) {
            throw new Error('La variable "harryInfo" no es un objeto JSON válido');
        }
        assert.typeArray(harryInfo);
        console.log(harryInfo);
        const dataLength = harryInfo.length;
        console.log(`El tamaño del array es: ${dataLength}`);
    }


    /**
   * @description Compruebo que la respuesta no contenga propiedades con valores vacios o nulos
   */
    public chekProperti = (harryInfo: ObjectType): void => {
        harryInfo.forEach((item: any) => {
            assert.toHaveProperty(item, "number");
            assert.toHaveProperty(item, "title");
            assert.toHaveProperty(item, "originalTitle");
            assert.toHaveProperty(item, "releaseDate");
            assert.toHaveProperty(item, "description");
            assert.toHaveProperty(item, "pages");
            assert.toHaveProperty(item, "cover");
            assert.toHaveProperty(item, "index");


        });
    }


    /**
      * @description Compruebo que la respuesta no contenga propiedades con valores vacios o nulos
      */
    public chekEmptyOrNull = (harryInfo: ObjectType): void => {
        harryInfo.forEach((item: any) => {
            assert.notEmpty(item.number);
            assert.notEmpty(item.title);
            assert.notEmpty(item.originalTitle);
            assert.notEmpty(item.releaseDate);
            assert.notEmpty(item.description);
            assert.notEmpty(item.pages);
            assert.notEmpty(item.cover);
            assert.notEmpty(item.index);
        });
    }

    /**
       * @description Compruebo que el valor tenga el tipo correcto
       */
    public checkTypeValue = (harryInfo: ObjectType): void => {

        harryInfo.forEach((item: any) => {
            assert.typeContentValue(item.number, "number");
            assert.typeContentValue(item.title, "string");
            assert.typeContentValue(item.originalTitle, "string");
            assert.typeContentValue(item.releaseDate, "string");
            assert.typeContentValue(item.description, "string");
            assert.typeContentValue(item.pages, "number");
            assert.typeContentValue(item.cover, "string");
            assert.typeContentValue(item.index, "number");
        });
    }
    /**
     * @description Compruebo que el array harryInfo contenga harry potter en el title
     */
    public checkWordInTitle = (harryInfo: ObjectType): void => {
        harryInfo.forEach((item: any) => {
            expert.containsWord(item.title, "Harry Potter");
        });
    }
}
export default HarryValidation;
