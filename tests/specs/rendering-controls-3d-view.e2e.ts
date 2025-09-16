import { volViewPage } from '../pageobjects/volview.page';
import { openUrls } from './utils';

describe('3D Rendering Controls', () => {
  it('should show controls when 3D view exists regardless of active view', async () => {
    await openUrls([
      {
        url: 'https://data.kitware.com/api/v1/item/63527c7311dab8142820a338/download',
        name: 'prostate.zip',
      },
    ]);

    await volViewPage.waitForViews();

    const renderTab = volViewPage.renderingModuleTab;
    await renderTab.click();

    const view3D = await volViewPage.getView3D();

    const volumeRenderingSection =
      await volViewPage.getVolumeRenderingSection();
    await expect(volumeRenderingSection).toExist();
    await expect(volumeRenderingSection).toBeDisplayed();

    const pwfCanvas = await $('div.pwf-editor canvas');
    await expect(pwfCanvas).toExist();

    await view3D!.click();
    await expect(volumeRenderingSection).toBeDisplayed();

    const view2D = await volViewPage.getView2D();
    await view2D!.click();

    // Controls should still be displayed because 3D view exists (even if not active)
    await expect(volumeRenderingSection).toBeDisplayed();
    await expect(pwfCanvas).toExist();
  });
});
