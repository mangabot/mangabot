import { MangaBotPage } from './app.po';

describe('mangabot App', function() {
  let page: MangaBotPage;

  beforeEach(() => {
    page = new MangaBotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
