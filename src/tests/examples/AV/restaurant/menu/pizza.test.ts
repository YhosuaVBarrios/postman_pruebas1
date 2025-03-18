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
 * @group Pizza
 */
describe('Opción pizza', () => {
  // Tests:
  it('DEMO2023-41 - Consultar pedido', async () => {
    const headerData = await requests.initializeConversation();
    const step1 = await requests.sendMessage(headerData, utterances.pizza.generic);
    TextValidation.checkMessage(step1, data.response.pizzaOrder, true);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.neapolitan);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.barbecue);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.fourCheeses);
    KPISValidation.checkKPIs(step1, customKpis.makeOrder.pizza);
  });

  it('DEMO2023-42 - Fallback', async () => {
    const headerData = await requests.initializeConversation();
    const step1 = await requests.sendMessage(headerData, utterances.pizza.generic);
    TextValidation.checkMessage(step1, data.response.pizzaOrder, true);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.neapolitan);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.barbecue);
    QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.fourCheeses);
    KPISValidation.checkKPIs(step1, customKpis.makeOrder.pizza);

    const step2 = await requests.sendMessage(headerData, utterances.generic.fallback);
    TextValidation.checkMessage(step2, data.response.pizzaOrder, true);
    QuickRepliesValidation.checkQuickReply(step2, quickReplies.pizza.neapolitan);
    QuickRepliesValidation.checkQuickReply(step2, quickReplies.pizza.barbecue);
    QuickRepliesValidation.checkQuickReply(step2, quickReplies.pizza.fourCheeses);
    KPISValidation.checkKPIs(step2, customKpis.makeOrder.pizza);
  });

  describe('Algo más', () => {
    it('DEMO2023-43 - El usuario pide una pizza napolitana y pizza barbacoa', async () => {
      const headerData = await requests.initializeConversation();
      const step1 = await requests.sendMessage(headerData, utterances.pizza.generic);
      TextValidation.checkMessage(step1, data.response.pizzaOrder, true);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.neapolitan);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.barbecue);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.fourCheeses);
      KPISValidation.checkKPIs(step1, customKpis.makeOrder.pizza);

      const step2 = await requests.sendMessage(headerData, utterances.pizza.neapolitan);
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

      const step4 = await requests.sendMessage(headerData, utterances.pizza.generic);
      TextValidation.checkMessage(step4, data.response.pizzaOrder, true);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.pizza.neapolitan);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.pizza.barbecue);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.pizza.fourCheeses);
      KPISValidation.checkKPIs(step4, customKpis.makeOrder.pizza);

      const step5 = await requests.sendMessage(headerData, utterances.pizza.barbecue);
      TextValidation.checkMessage(step5, data.response.somethingElse, true);
      QuickRepliesValidation.checkQuickReply(step5, quickReplies.somethingElse.yes);
      QuickRepliesValidation.checkQuickReply(step5, quickReplies.somethingElse.no);
      QuickRepliesValidation.checkQuickReply(step5, quickReplies.somethingElse.checkOrder);
      KPISValidation.checkKPIs(step5, customKpis.makeOrder.somethingElse);

      const step6 = await requests.sendMessage(headerData, utterances.generic.no);
      TextValidation.checkMessage(step6, data.response.final, true);
      KPISValidation.checkKPIs(step6, customKpis.makeOrder.final);
    });

    it('DEMO2023-44 - El usuario pide una pizza napolitana y pizza 4 quesos', async () => {
      const headerData = await requests.initializeConversation();
      const step1 = await requests.sendMessage(headerData, utterances.pizza.generic);
      TextValidation.checkMessage(step1, data.response.pizzaOrder, true);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.neapolitan);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.barbecue);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.fourCheeses);
      KPISValidation.checkKPIs(step1, customKpis.makeOrder.pizza);

      const step2 = await requests.sendMessage(headerData, utterances.pizza.neapolitan);
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

      const step4 = await requests.sendMessage(headerData, utterances.pizza.generic);
      TextValidation.checkMessage(step4, data.response.pizzaOrder, true);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.pizza.neapolitan);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.pizza.barbecue);
      QuickRepliesValidation.checkQuickReply(step4, quickReplies.pizza.fourCheeses);
      KPISValidation.checkKPIs(step4, customKpis.makeOrder.pizza);

      const step5 = await requests.sendMessage(headerData, utterances.pizza.fourCheese);
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
    it('DEMO2023-45 - Pizza napolitana y no quiere nada más', async () => {
      const headerData = await requests.initializeConversation();
      const step1 = await requests.sendMessage(headerData, utterances.pizza.generic);
      TextValidation.checkMessage(step1, data.response.pizzaOrder, true);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.neapolitan);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.barbecue);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.fourCheeses);
      KPISValidation.checkKPIs(step1, customKpis.makeOrder.pizza);

      const step2 = await requests.sendMessage(headerData, utterances.pizza.neapolitan);
      TextValidation.checkMessage(step2, data.response.somethingElse, true);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.yes);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.no);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.checkOrder);
      KPISValidation.checkKPIs(step2, customKpis.makeOrder.somethingElse);

      const step3 = await requests.sendMessage(headerData, utterances.generic.no);
      TextValidation.checkMessage(step3, data.response.final, true);
      KPISValidation.checkKPIs(step3, customKpis.makeOrder.final);
    });

    it('DEMO2023-46 - Pizza barbacoa y no quiere nada más', async () => {
      const headerData = await requests.initializeConversation();
      const step1 = await requests.sendMessage(headerData, utterances.pizza.generic);
      TextValidation.checkMessage(step1, data.response.pizzaOrder, true);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.neapolitan);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.barbecue);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.fourCheeses);
      KPISValidation.checkKPIs(step1, customKpis.makeOrder.pizza);

      const step2 = await requests.sendMessage(headerData, utterances.pizza.barbecue);
      TextValidation.checkMessage(step2, data.response.somethingElse, true);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.yes);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.no);
      QuickRepliesValidation.checkQuickReply(step2, quickReplies.somethingElse.checkOrder);
      KPISValidation.checkKPIs(step2, customKpis.makeOrder.somethingElse);

      const step3 = await requests.sendMessage(headerData, utterances.generic.no);
      TextValidation.checkMessage(step3, data.response.final, true);
      KPISValidation.checkKPIs(step3, customKpis.makeOrder.final);
    });

    it('DEMO2023-47 - Pizza 4 quesos y no quiere nada más', async () => {
      const headerData = await requests.initializeConversation();
      const step1 = await requests.sendMessage(headerData, utterances.pizza.generic);
      TextValidation.checkMessage(step1, data.response.pizzaOrder, true);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.neapolitan);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.barbecue);
      QuickRepliesValidation.checkQuickReply(step1, quickReplies.pizza.fourCheeses);
      KPISValidation.checkKPIs(step1, customKpis.makeOrder.pizza);

      const step2 = await requests.sendMessage(headerData, utterances.pizza.fourCheese);
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
