import { SalesPortalPage } from '../salesPortal.page';

export abstract class AddEditCustomersPage extends SalesPortalPage {
  abstract readonly ['Save Customer button']: string;
  abstract readonly ['Title']: string;
  readonly ['Back button'] = `button#back-to-customers-page`;
  readonly ['Email input'] = `input#inputEmail`;
  readonly ['Name input'] = `input#inputName`;
  readonly ['Country dropdown'] = `select#inputCountry`;
  readonly ['City input'] = `input#inputCity`;
  readonly ['Street input'] = `input#inputStreet`;
  readonly ['House input'] = `input#inputHouse`;
  readonly ['Flat input'] = `input#inputFlat`;
  readonly ['Phone input'] = `input#inputPhone`;
  readonly ['Notes textarea'] = `textarea#textareaNotes`;
}