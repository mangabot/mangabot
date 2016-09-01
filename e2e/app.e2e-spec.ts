import { AngularCliWebpackPage } from './app.po';

describe('angular-cli-webpack App', function() {
  let page: AngularCliWebpackPage;

  beforeEach(() => {
    page = new AngularCliWebpackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
