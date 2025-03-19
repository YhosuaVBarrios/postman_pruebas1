import { request, spec } from "pactum"; //Importa la configuracion de la peticion headers contraseña usuarios ...
import { ObjectType } from "@classes/objectType"; //Configuracion para any ObjectType
import LoadEnvironment from "@utils/loadEnvironment"; // Iporta  lacalseLoadEnviroment que carga las configuraciones del entorno

class Request {
  private static REQUEST: Request;

  private TIMEOUT = 20000;

  private RETRIES = 4;

  private FIXTURES_PATH = "examples/applications/dragon-ball";

  private RESOURCE = LoadEnvironment.getFixture(
    `${this.FIXTURES_PATH}/resource/characters.json`
  );

  static getInstance(): Request {
    if (!Request.REQUEST) {
      Request.REQUEST = new Request();
    }
    return Request.REQUEST;
  }

  /** charactersRequests
   * @description Get the dragon-ball characters list
   */
  async getCharacters(): Promise<ObjectType> {
    //Retornamos un object
    request.setDefaultTimeout(this.TIMEOUT); //serdefaultTimeout es propio de pactum y pasamos variable con 20000
    return spec() //Crea una nueva prueba en pactum
      .get(
        `${LoadEnvironment.getInfo("urlBase")}${
          this.RESOURCE.get.characters.path
        }`
      ) //Peticion get //cambiar.path /fact
      .withHeaders(this.RESOURCE.get.characters.headers)
      .expectStatus(200)
      .retry(this.RETRIES, this.TIMEOUT - 1); //delay
  }

  /**
   * @description Get a dragon-ball character by ID
   */
  async getCharacterByID(id: number): Promise<ObjectType> {
    request.setDefaultTimeout(this.TIMEOUT);
    return spec()
      .get(
        `${LoadEnvironment.getInfo("urlBase")}` +
          `${this.RESOURCE.get.charactersByID.path.replace(
            "REPLACE_ID",
            id.toString()
          )}`
      )
      .withHeaders(LoadEnvironment.getInfo("headers"))
      .expectStatus(200)
      .retry(this.RETRIES, this.TIMEOUT - 1);
  }

  /**
   * @description Get a dragon-ball character by Name
   */
  async getCharacterByName(name: string): Promise<ObjectType> {
    request.setDefaultTimeout(this.TIMEOUT);
    return spec()
      .get(
        `${LoadEnvironment.getInfo("urlBase")}` +
          `${this.RESOURCE.get.charactersByName.path.replace(
            "REPLACE_NAME",
            name
          )}`
      )
      .withHeaders(LoadEnvironment.getInfo("headers"))
      .expectStatus(200)
      .retry(this.RETRIES, this.TIMEOUT - 1);
  }
}

export default Request;
