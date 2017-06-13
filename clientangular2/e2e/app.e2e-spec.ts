import { Rdva.Angular4.V2Page } from './app.po';

describe('rdva.angular4.v2 App', () => {
  let page: Rdva.Angular4.V2Page;

  beforeEach(() => {
    page = new Rdva.Angular4.V2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
