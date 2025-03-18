import Requests from '@requests/examples/AV/restaurant/request';
import TextValidation from '@validations/examples/AV/text';
import QuickRepliesValidation from '@validations/examples/AV/quickReplies';
import KPISValidation from '@validations/examples/AV/kpis';
import LoadEnvironment from '@utils/loadEnvironment';

// Fixtures:
const customKpis = LoadEnvironment.getFixture('examples/AV/customKpis.json');
const quickReplies = LoadEnvironment.getFixture('examples/AV/quickReplies.json');
const data = LoadEnvironment.getFixture('examples/AV/restaurant/data/menu.json');
const utterances = LoadEnvironment.getFixture('examples/AV/restaurant/data/utterances.json');

// Instances
const requests = Requests.getInstance();

// QASE TEST RUN EXAMPLE: https://app.qase.io/public/report/83ac015dbdbde08eb6ff1a6cc3841f641f625783

/**
 * @group ES
 * @group Restaurant
 * @group Burger
 */
describe('Opción burger', () => {
  // Tests:
  it('DEMO2023-34 - Consulta su pedido', async () => {
    const headerData = await requests.initializeConversation();
    const step1 = await requests.sendMessage(headerData, utterances.burger.generic);
    TextValidation.checkMessage(step1, data.response.burgerOrder, true);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.beef);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.chicken);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.veggie);
    KPISValidation.checkKPIs(step1, customKpis.makeOrder.burger);
  });

  it('DEMO2023-35 - Fallback', async () => {
    const headerData = await requests.initializeConversation();
    const step1 = await requests.sendMessage(headerData, utterances.burger.generic);
    TextValidation.checkMessage(step1, data.response.burgerOrder, true);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.beef);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.chicken);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.veggie);
    KPISValidation.checkKPIs(step1, customKpis.makeOrder.burger);

    const step2 = await requests.sendMessage(headerData, utterances.generic.fallback);
    TextValidation.checkMessage(step2, data.response.burgerOrder, true);
    QuickRepliesValidation.checkQuickReply(step2, quickReplies.burger.beef);
    QuickRepliesValidation.checkQuickReply(step2, quickReplies.burger.chicken);
    QuickRepliesValidation.checkQuickReply(step2, quickReplies.burger.veggie);
    KPISValidation.checkKPIs(step2, customKpis.makeOrder.burger);
  });

  describe('Algo más', () => {
    it('DEMO2023-36 - Hambuguesa de ternera y pollo', async () => {
      const headerData = await requests.initializeConversation();
      const step1 = await requests.sendMessage(headerData, utterances.burger.generic);
      TextValidation.checkMessage(step1, data.response.burgerOrder, true);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.beef);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.chicken);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.veggie);
      KPISValidation.checkKPIs(step1, customKpis.makeOrder.burger);

      const step2 = await requests.sendMessage(headerData, utterances.burger.veal);
      TextValidation.checkMessage(step2, data.response.somethingElse, true);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.yes);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.no);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.checkOrder);
      KPISValidation.checkKPIs(step2, customKpis.makeOrder.somethingElse);

      const step3 = await requests.sendMessage(headerData, utterances.generic.yes);
      TextValidation.checkMessage(step3, data.response.welcome, true);
      QuickRepliesValidation.checkQuickReply(step3, quickReplies.options.pizza);
      QuickRepliesValidation.checkQuickReply(step3, quickReplies.options.burger);
      KPISValidation.checkKPIs(step3, customKpis.makeOrder.menuSelection);

      const step4 = await requests.sendMessage(headerData, utterances.burger.generic);
      TextValidation.checkMessage(step4, data.response.burgerOrder, true);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.burger.beef);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.burger.chicken);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.burger.veggie);
      KPISValidation.checkKPIs(step4, customKpis.makeOrder.burger);

      const step5 = await requests.sendMessage(headerData, utterances.burger.chicken);
      TextValidation.checkMessage(step5, data.response.somethingElse, true);
      QuickRepliesValidation.checkQuickReply(step5, quickReplies.somethingElse.yes);
      QuickRepliesValidation.checkQuickReply(step5, quickReplies.somethingElse.no);
      QuickRepliesValidation.checkQuickReply(step5, quickReplies.somethingElse.checkOrder);
      KPISValidation.checkKPIs(step5, customKpis.makeOrder.somethingElse);

      const step6 = await requests.sendMessage(headerData, utterances.generic.no);
      TextValidation.checkMessage(step6, data.response.final, true);
      KPISValidation.checkKPIs(step6, customKpis.makeOrder.final);
    });

    it('DEMO2023-37 - Hamburguesa de ternera y vegana', async () => {
      const headerData = await requests.initializeConversation();
      const step1 = await requests.sendMessage(headerData, utterances.burger.generic);
      TextValidation.checkMessage(step1, data.response.burgerOrder, true);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.beef);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.chicken);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.veggie);
      KPISValidation.checkKPIs(step1, customKpis.makeOrder.burger);

      const step2 = await requests.sendMessage(headerData, utterances.burger.veal);
      TextValidation.checkMessage(step2, data.response.somethingElse, true);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.yes);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.no);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.checkOrder);
      KPISValidation.checkKPIs(step2, customKpis.makeOrder.somethingElse);

      const step3 = await requests.sendMessage(headerData, utterances.generic.yes);
      TextValidation.checkMessage(step3, data.response.welcome, true);
      QuickRepliesValidation.checkQuickReply(step3, quickReplies.options.pizza);
      QuickRepliesValidation.checkQuickReply(step3, quickReplies.options.burger);
      KPISValidation.checkKPIs(step3, customKpis.makeOrder.menuSelection);

      const step4 = await requests.sendMessage(headerData, utterances.burger.generic);
      TextValidation.checkMessage(step4, data.response.burgerOrder, true);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.burger.beef);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.burger.chicken);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.burger.veggie);
      KPISValidation.checkKPIs(step4, customKpis.makeOrder.burger);

      const step5 = await requests.sendMessage(headerData, utterances.burger.veggie);
      TextValidation.checkMessage(step5, data.response.somethingElse, true);
      QuickRepliesValidation.checkQuickReply(step5, quickReplies.somethingElse.yes);
      QuickRepliesValidation.checkQuickReply(step5, quickReplies.somethingElse.no);
      QuickRepliesValidation.checkQuickReply(step5, quickReplies.somethingElse.checkOrder);
      KPISValidation.checkKPIs(step5, customKpis.makeOrder.somethingElse);

      const step6 = await requests.sendMessage(headerData, utterances.generic.no);
      TextValidation.checkMessage(step6, data.response.final, true);
      KPISValidation.checkKPIs(step6, customKpis.makeOrder.final);
    });
  });

  describe('Nada más', () => {
    it('DEMO2023-38 - Hamburguesa de ternera y no quiere nada más', async () => {
      const headerData = await requests.initializeConversation();
      const step1 = await requests.sendMessage(headerData, utterances.burger.generic);
      TextValidation.checkMessage(step1, data.response.burgerOrder, true);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.beef);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.chicken);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.veggie);
      KPISValidation.checkKPIs(step1, customKpis.makeOrder.burger);

      const step2 = await requests.sendMessage(headerData, utterances.burger.veal);
      TextValidation.checkMessage(step2, data.response.somethingElse, true);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.yes);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.no);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.checkOrder);
      KPISValidation.checkKPIs(step2, customKpis.makeOrder.somethingElse);

      const step3 = await requests.sendMessage(headerData, utterances.generic.no);
      TextValidation.checkMessage(step3, data.response.final, true);
      KPISValidation.checkKPIs(step3, customKpis.makeOrder.final);
    });

    it('DEMO2023-39 - Hamburguesa de pollo crujiente y no quiere nada más', async () => {
      const headerData = await requests.initializeConversation();
      const step1 = await requests.sendMessage(headerData, utterances.burger.generic);
      TextValidation.checkMessage(step1, data.response.burgerOrder, true);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.beef);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.chicken);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.veggie);
      KPISValidation.checkKPIs(step1, customKpis.makeOrder.burger);

      const step2 = await requests.sendMessage(headerData, utterances.burger.chicken);
      TextValidation.checkMessage(step2, data.response.somethingElse, true);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.yes);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.no);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.checkOrder);
      KPISValidation.checkKPIs(step2, customKpis.makeOrder.somethingElse);

      const step3 = await requests.sendMessage(headerData, utterances.generic.no);
      TextValidation.checkMessage(step3, data.response.final, true);
      KPISValidation.checkKPIs(step3, customKpis.makeOrder.final);
    });

    it('DEMO2023-40 - Hamburguesa vegana y no quiere nada más', async () => {
      const headerData = await requests.initializeConversation();
      const step1 = await requests.sendMessage(headerData, utterances.burger.generic);
      TextValidation.checkMessage(step1, data.response.burgerOrder, true);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.beef);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.chicken);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.burger.veggie);
      KPISValidation.checkKPIs(step1, customKpis.makeOrder.burger);

      const step2 = await requests.sendMessage(headerData, utterances.burger.veggie);
      TextValidation.checkMessage(step2, data.response.somethingElse, true);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.yes);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.no);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.checkOrder);
      KPISValidation.checkKPIs(step2, customKpis.makeOrder.somethingElse);

      const step3 = await requests.sendMessage(headerData, utterances.generic.no);
      TextValidation.checkMessage(step3, data.response.final, true);
      KPISValidation.checkKPIs(step3, customKpis.makeOrder.final);
    });
  });
});
