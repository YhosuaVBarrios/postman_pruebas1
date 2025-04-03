import { request, spec } from "pactum"; //Importa la configuracion de la peticion headers contraseña usuarios ...
import { ObjectType } from "@classes/objectType"; //Configuracion para any ObjectType
import LoadEnvironment from "@utils/loadEnvironment"; // Iporta  lacalseLoadEnviroment que carga las configuraciones del entorno

class Request {
  private static REQUEST: Request;

  private TIMEOUT = 20000;

  private RETRIES = 4;

  private FIXTURES_PATH = "examples/applications/harry-potter"; //Ruta de la carpeta donde se encuentra el json

  private RESOURCE = LoadEnvironment.getFixture(
    `${this.FIXTURES_PATH}/resource/pointHarry.json`
  );

  static getInstance(): Request {
    if (!Request.REQUEST) {
      Request.REQUEST = new Request();
    }
    return Request.REQUEST;
  }

  /** catsRequests
   * @description Get the dragon-ball characters list
   */
  async getBooks(): Promise<ObjectType> {
    //Retornamos un object
    request.setDefaultTimeout(this.TIMEOUT); //serdefaultTimeout es propio de pactum y pasamos variable con 20000
    return spec() //Crea una nueva prueba en pactum
      .get(
        `${LoadEnvironment.getInfo("urlBase")}${this.RESOURCE.get.books.path}`
      ) //Peticion get //cambiar.path /fact
      .withHeaders(this.RESOURCE.get.books.headers)
      .expectStatus(200)
      .retry(this.RETRIES, this.TIMEOUT - 1); //delay
  }}
  export default Request;