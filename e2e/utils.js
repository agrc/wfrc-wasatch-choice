export const loadApp = async (page, url = '/') => {
  // Inject test flag BEFORE navigating
  await page.addInitScript(() => {
    window.E2E_TESTING = true;
  });
  await page.goto(url);
  await waitForMapLoaded(page);
};

export const waitForMapLoaded = async (page) => {
  await page.waitForFunction(() => window.mapLoaded === true, {
    timeout: 60000,
  });
};

export const getMapExtent = async (page) => {
  return await page.evaluate(() => {
    if (window.getMapExtent) {
      return window.getMapExtent();
    }
    return null;
  });
};

export const dragElementBy = async (page, selectorOrLocator, x, y) => {
  let element;
  if (typeof selectorOrLocator === 'string') {
    element = page.locator(selectorOrLocator).first();
  } else {
    // If it's already a locator object
    element = selectorOrLocator.first
      ? selectorOrLocator.first()
      : selectorOrLocator;
  }

  // Ensure the element is visible before attempting to drag
  await element.waitFor({ state: 'visible' });

  const box = await element.boundingBox();
  if (!box) {
    throw new Error('dragElementBy: unable to obtain bounding box for target element');
  }

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(
    box.x + box.width / 2 + x,
    box.y + box.height / 2 + y,
    { steps: 20 },
  );
  await page.mouse.up();
};
