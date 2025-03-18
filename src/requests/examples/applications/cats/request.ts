import { request, spec } from 'pactum';  //Importa la configuracion de la peticion headers contraseña usuarios ...
import { ObjectType } from '@classes/objectType'; //Configuracion para any ObjectType
import LoadEnvironment from '@utils/loadEnvironment';  // Iporta  lacalseLoadEnviroment que carga las configuraciones del entorno

class Request {
  private static REQUEST: Request;

  private TIMEOUT = 20000;

  private RETRIES = 4;

  private FIXTURES_PATH = 'examples/applications/cats';

  private RESOURCE = LoadEnvironment.getFixture(`${this.FIXTURES_PATH}/resource/pointCats.json`);

  static getInstance(): Request {
    if (!Request.REQUEST) {
      Request.REQUEST = new Request();
    }
    return Request.REQUEST;
  }
  
  /** catsRequests
   * @description Get the dragon-ball characters list
   */
  async getCats(): Promise<ObjectType> {           //Retornamos un object
    request.setDefaultTimeout(this.TIMEOUT);            //serdefaultTimeout es propio de pactum y pasamos variable con 20000
    return spec()                                         //Crea una nueva prueba en pactum
      .get(`${LoadEnvironment.getInfo('urlBase')}${this.RESOURCE.get.cats.path}`)  //Peticion get //cambiar.path /fact
      .withHeaders(this.RESOURCE.get.cats.headers)
      .expectStatus(200)
      .retry(this.RETRIES, this.TIMEOUT - 1);  //delay
  }

  /** catsRequests
   * @description Get the dragon-ball characters list
   */
  async getCatsList(): Promise<ObjectType> {           //Retornamos un object
    request.setDefaultTimeout(this.TIMEOUT);            //serdefaultTimeout es propio de pactum y pasamos variable con 20000
    return spec()                                         //Crea una nueva prueba en pactum
      .get(`${LoadEnvironment.getInfo('urlBase')}${this.RESOURCE.get.catsList.path}`)  //Peticion get //cambiar.path /fact
      .withHeaders(this.RESOURCE.get.catsList.headers)
      .expectStatus(200)
      .retry(this.RETRIES, this.TIMEOUT - 1);  //delay
  }

   /** catsRequests
   * @description Get the dragon-ball characters list
   */
   async getCatsBreeds(): Promise<ObjectType> {           //Retornamos un object
    request.setDefaultTimeout(this.TIMEOUT);            //serdefaultTimeout es propio de pactum y pasamos variable con 20000
    return spec()                                         //Crea una nueva prueba en pactum
      .get(`${LoadEnvironment.getInfo('urlBase')}${this.RESOURCE.get.catsBreeds.path}`)  //Peticion get //cambiar.path /fact
      .withHeaders(this.RESOURCE.get.catsBreeds.headers)
      .expectStatus(200)
      .retry(this.RETRIES, this.TIMEOUT - 1);  //delay
  }
}
export default Request;