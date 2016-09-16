import { MangabotPage } from './app.po';

describe('mangabot App', function() {
  let page: MangabotPage;

  beforeEach(() => {
    page = new MangabotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
