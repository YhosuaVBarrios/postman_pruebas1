import { request, spec } from 'pactum';
import { uuid } from 'pactum-matchers';
import { ObjectType } from '@classes/objectType';
import LoadEnvironment from '@utils/loadEnvironment';
import TextValidation from '@validations/examples/AV/text';
import QuickRepliesValidation from '@validations/examples/AV/quickReplies';
import KPISValidation from '@validations/examples/AV/kpis';

class Request {
  private static REQUEST: Request;

  private TIMEOUT = 20000;

  private RETRIES = 2;

  private RESOURCE = LoadEnvironment.getFixture('examples/AV/restaurant/resource/menu.json');

  private DATA = LoadEnvironment.getFixture('examples/AV/restaurant/data/menu.json');

  private QUICK_REPLIES = LoadEnvironment.getFixture('examples/AV/quickReplies.json');

  private CUSTOM_KPIS = LoadEnvironment.getFixture('examples/AV/customKpis.json');

  static getInstance(): Request {
    if (!Request.REQUEST) {
      Request.REQUEST = new Request();
    }
    return Request.REQUEST;
  }

  /**
   * @function sendEvent
   *
   * @description Sends an event to the Virtual Assistant via Dispatcher. After processing it, the Virtual Assistant
   * returns its response.
   * @param response {ObjectType} - Object with the format {headers, uuid} from initializeConversation function.
   * @param eventName {string} - Event to be sent to the Virtual Assistant
   * @return Promise of the Dispatcher response.
   */
  async sendEvent(response: ObjectType, eventName: string): Promise<ObjectType> {
    request.setDefaultTimeout(this.TIMEOUT);

    return spec()
      .post(`${LoadEnvironment.getInfo('urlDispatcher')}${this.RESOURCE.dispatcher.path}`)
      .withHeaders(LoadEnvironment.getInfo('headers'))
      .withJson({
        queryInput: {
          event: {
            event: eventName,
            languageCode: 'es',
          },
        },
        queryParams: {
          sessionID: response.sessionID,
          timeZone: 'Europe/Madrid',
          payload: {
            source: 'web',
            userId: 'WEB-USER-1572334129564-68544770010307810',
          },
        },
      })
      .expectStatus(200)
      .retry(this.RETRIES, this.TIMEOUT - 1);
  }

  /**
   * @function sendMessage
   *
   * @description Sends a message to the Virtual Assistant via Dispatcher. After processing it, the Virtual Assistant
   * returns its response.
   * @param response {ObjectType} - Object with the format {headers, uuid}, from initializeConversation function.
   * @param message {string} - Message to be sent to the Virtual Assistant
   * @return Promise of the Dispatcher response.
   */
  async sendMessage(response: ObjectType, message: string): Promise<ObjectType> {
    request.setDefaultTimeout(this.TIMEOUT);

    return spec()
      .post(`${LoadEnvironment.getInfo('urlDispatcher')}${this.RESOURCE.dispatcher.path}`)
      .withHeaders(LoadEnvironment.getInfo('headers'))
      .withJson({
        queryInput: {
          text: {
            text: message,
            languageCode: 'es',
          },
        },
        queryParams: {
          sessionID: response.sessionID,
          timeZone: 'Europe/Madrid',
          payload: {
            source: 'web',
            userId: 'WEB-USER-1572334129564-68544770010307810',
          },
        },
      })
      .expectStatus(200)
      .retry(this.RETRIES, this.TIMEOUT - 1);
  }

  /**
   * @function initializeConversation
   *
   * @description Gets a UUID for the conversation and starts the conversation sending the Welcome event. After that,
   * returns the headers and the UUID needed to keep sending messages to the same conversation.
   * @return Promise of an object with the format {headers, uuid}, to be used in the next requests.
   */
  public async initializeConversation(): Promise<ObjectType> {
    const sessionData = { sessionID: uuid() };
    const step1 = await this.sendMessage(sessionData, 'hola');
    TextValidation.checkMessage(step1, this.DATA.response.welcome, true);
    QuickRepliesValidation.checkQuickReply(step1, this.QUICK_REPLIES.options.pizza);
    QuickRepliesValidation.checkQuickReply(step1, this.QUICK_REPLIES.options.burger);
    KPISValidation.checkKPIs(step1, this.CUSTOM_KPIS.makeOrder.menuSelection);
    return sessionData;
  }
}

export default Request;
