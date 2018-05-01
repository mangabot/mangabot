import { ManualPaymentPage } from './app.po';

describe('Manga Bot App', function () {
  let page: ManualPaymentPage;

  beforeEach(() => {
    page = new ManualPaymentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
