import { ObjectType } from "@classes/objectType"; //Importa la clase para usar ObectType
import minimist from "minimist"; //Biblioteca que analiza comandos CLI
import fs from "fs"; //Permite leer archivos Json conconfiguraciones y datos de prueba
import path from "path"; //Facilita la construcionde rutas de archivos compatible conn todos los sistemas op

class LoadEnvironment {
  private static info: ObjectType; //almacena informacion sobre el entorno configuracions

  private static environment: string; //Guarda el nombre del entrno dev,stangin...

  static getInfo(varName: string): ObjectType {
    //Devuelve el valor de una variable de entorno desde un archivo jso// En string recoge la variable de consola
    return LoadEnvironment.getEnvironmentInfo()[varName]; //Se asegura llamando  a getEnviromentInfo para ver si esta cargado los datos de entorno con nuestra variable
  }

  private static getEnvironmentInfo(): LoadEnvironment {
    //Cargar configuracion de entorno  si no esta cargado leel el Json del entorno
    if (!LoadEnvironment.info) {
      // Verifica si LoadEnviroment.info ya esta cargado
      const environmentPath = path.resolve(
        __dirname,
        `../environments/${this.getEnvironment()}.json`
      ); //reemplaza el valor de la variable enviroment que pasas por consola
      const rawData = fs.readFileSync(environmentPath, "utf-8"); // Lee el archivo json utilizando fs.readFileSync()
      LoadEnvironment.info = JSON.parse(rawData); //Pasa e json a un objeto Javascript utiliza el .parse
    }
    return LoadEnvironment.info; //Guarda los datos em Loadenviroment.info para leerlo en futuras llamadas Carga el fichero dondese buscaran los datos
  }

  static getArguments(): ObjectType {
    //usa minimist para leer argumentos pasados al ejecutar el script
    return minimist(process.argv);
  }

  /**
   * @function getFixture
   * @description This function returns the content of a file placed in fixtures, using automatically the language
   * indicated in the execution params.
   * @param localPath - Path of the desired file, starting in fixtures/[LANGUAGE]/.
   * E.g.: If the file is 'fixtures/ES/AV/quickReplies.json, the local path would be 'AV/quickReplies.json'.
   * @replacers Strings that are going to be included in the array strings.
   */
  static getFixture(localPath: string): ObjectType {
    //carga archivos de prueba
    const { language } = this.getArguments();
    if (!language) {
      console.error(
        "Language has not been set. Please, indicate the language in the command as a parameter. " + //Si no tiene idioma para la ejecucion y muestra un error
          "See README examples for more info."
      );
      process.exit(1);
    }
    const filePath = path.resolve(
      __dirname,
      `../fixtures/${language}/${localPath}`
    ); //Construye la ruta usando el idioma
    const rawData = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(rawData);
  }

  private static getEnvironment(): string {
    if (!this.environment) {
      const { environment } = this.getArguments();
      // eslint-disable-next-line global-require,import/no-dynamic-require
      this.environment = environment;
    }
    return this.environment;
  }
}
export default LoadEnvironment;
