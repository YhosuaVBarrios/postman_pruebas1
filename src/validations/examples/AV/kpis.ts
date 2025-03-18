import { ObjectType } from '@classes/objectType';
import { CustomKPIs } from '@classes/examples/customKPIs';
import { expect } from 'chai';
import LoadEnvironment from '@utils/loadEnvironment';

export default class KPIValidations {
  private static BASIC_KPIS = LoadEnvironment.getFixture('examples/AV/basicKPIs.json');

  /**
   * @function checkKPIs
   *
   * @description Checks KPIs that are in the response payload are correct.
   * @param response {ObjectType} - Response of the Virtual Assistant after sending an event or a text.
   * @param kpis {CustomKPIs} - Object with expected KPIs. Custom KPIs are the concrete step KPIs, and are located in
   * fixtures/customKPIs.json file.
   * Basic KPIs are in the fixtures/basicKPIs.json file and are indicated in the customKPIs in the "basicKPIs" field.
   */
  static checkKPIs(response: ObjectType, kpis: CustomKPIs): void {
    const { responseMessages } = response.json.queryResult;
    let receivedKPIs = null;
    let foundType = false;

    for (const message of responseMessages) {
      if (message.payload.type === 'kpis') {
        [receivedKPIs] = message.payload.responses;
        foundType = true;
        break;
      }
    }

    expect(foundType).to.equal(true, 'The specified message is not a KPI');
    const basicKPIsPayload = KPIValidations.BASIC_KPIS[kpis.basicKPIs];

    const combinedKPIs = { ...basicKPIsPayload, ...kpis };
    delete combinedKPIs.basicKPIs;

    for (const key of Object.keys(combinedKPIs)) {
      if (combinedKPIs[key]) {
        expect(receivedKPIs[key]).to.eql(combinedKPIs[key],
          `KPI ${key} value ${combinedKPIs[key]} was expected, `
          + `${receivedKPIs[key]} was received instead`);
      }
    }
  }
}
