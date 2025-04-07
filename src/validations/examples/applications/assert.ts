import { assert, expect } from "chai";
import { string } from "pactum-matchers";
import { ObjectType } from "typescript";

export default class Assert {
  /**
   * @function beEqual
   *
   * @description Checks that a text received is equal than the expected.
   * @param value - Text to check.
   * @param expectedValue - Expected text.
   * @param message - Message to show if the assertion fails.
   */
  static beEqual(
    value: number | string,
    expectedValue: number | string,
    message: string
  ): void {
    expect(value, message).to.be.equal(expectedValue);
  }

  /**
   * //@function notEmpty nofunciona con numeros
   *
   * @description Checks that a text received is not empty.
   * @param value - Text to check.
   * @param message - Message to show if the assertion fails.
   */
  //static notEmpty(value: number | string, message: string): void {
  //assert.isNotEmpty(value, message);
  //}


  /**
 * @function notEmpty
 *
 * @description Checks that a value (either text or number) is not empty, undefined, or NaN.
 * @param value - The value to check.
 * @param message - Message to show if the assertion fails.
 */


  static notEmpty(value: number | string,): void {
    if (typeof value === "number") {
      // Verificar que el número no sea NaN y que no sea 0 (si eso es necesario)
      assert.isNotNaN(value, `El campo "${value}" no puede estar vacio`); // Verificar que no sea NaN
      assert.isNotNull(value, `El campo "${value}" no puede estar vacio`); // Verifica que no sea null
      assert.isDefined(value, `El campo "${value}" no puede estar vacio`); // Verifica que no sea undefined
      // assert.notEqual(value, 0, message); // Verificar que no sea 0 como es tipo array si tiene
    } else {
      // Para cadenas, usar assert.isNotEmpty que verifica que la cadena no esté vacía
      assert.isNotEmpty(value, `El campo "${value}" no puede estar vacio`);
    }
  }

  /**
    * @function toHaveProperty
    *
    */
  //funcion que revisa si en el json de respuesta de una peticion se encuentra las key en este caso lenght y fact
  static toHaveProperty(value: object, key: string): void {
    // Verificar que el campo exista en el JSON
    assert.property(value, key, `El JSON no tiene el campo '${key}'`); //value contiene factInfo y buscamos el valor de keyque es lengt o fact depende lo que recoja
    //verifico que la propiedad (key) sea tipo string
    assert.isString(key, `La clave '${key}' no es una cadena de texto.`);
  }
  /**
   * @function typeContentValue
   *
   */
  //Esta funcion recive por parametros en este caso factInfo filtrado por el key (factInfo.key) y
  // como segundo parametro introducimos entre comillas osea string el tipo de valor que desemos comprobar para saber si corresponde
  //Si quiero que esta funcion permita toda clase de datos como valor podemos sustituir por any o por (unknown con comprovacion previa)
  static typeContentValue(value: any, type: string): void {
    assert.typeOf(value, type, `El contenido de '${value}' no es un numero.`);
    //onsole.log(value);
  }
  /**
   * @function typeArray
   *
   */
  //Esta funcion recive por parametros en este caso harry info para conocer si es un array

  static typeArray(value: any): void {
    assert.isArray(value, `El contenido de '${value}' no es un array.`);
    //onsole.log(value);
  }
  /**
   * @function compareArraylenght
   *
   */
  //Esta funcion recive por parametros en este caso 2 array .lenght harry info y title para conocer si su tamaño es el mismo

  static compareArraylenght(array1: any[], array2: any[]): void {
    assert.equal(array1.length, array2.length, 'La cantidad de elementos en "harryInfo" y "title" no son iguales');  //onsole.log(value);
  }
}
