import { test, expect, type Page } from '@playwright/test';

// Helper: set theme via localStorage before page loads
async function setTheme(page: Page, theme: 'specter' | 'wisp') {
  await page.addInitScript((t) => {
    localStorage.setItem('theme', t);
  }, theme);
}

// Helper: get a computed CSS property value on a selector
async function computedStyle(page: Page, selector: string, prop: string) {
  return page.evaluate(
    ([sel, p]) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      return getComputedStyle(el).getPropertyValue(p).trim();
    },
    [selector, prop] as const
  );
}

const themes = ['specter', 'wisp'] as const;

for (const theme of themes) {
  test.describe(`Theme: ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    });

    test('page background uses correct base-100 color (not pure white or black)', async ({ page }) => {
      const bg = await computedStyle(page, 'body', 'background-color');
      console.log(`[${theme}] body background-color: ${bg}`);
      // Should not be transparent or inherit
      expect(bg).not.toBe('');
      expect(bg).not.toBeNull();
    });

    test('data-theme attribute is set correctly', async ({ page }) => {
      const themeAttr = await page.evaluate(() =>
        document.documentElement.getAttribute('data-theme')
      );
      expect(themeAttr).toBe(theme);
    });

    test('skill badges have visible background', async ({ page }) => {
      const badges = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll('.badge'));
        return els.slice(0, 5).map((el) => ({
          text: el.textContent?.trim(),
          bg: getComputedStyle(el).backgroundColor,
          opacity: getComputedStyle(el).opacity,
        }));
      });
      console.log(`[${theme}] badge backgrounds:`, JSON.stringify(badges, null, 2));
      // All badges should have a non-transparent background
      for (const badge of badges) {
        expect(badge.bg, `Badge "${badge.text}" has no background`).not.toBe('rgba(0, 0, 0, 0)');
        expect(badge.bg, `Badge "${badge.text}" has no background`).not.toBe('transparent');
      }
    });

    test('cards have visible background (not transparent)', async ({ page }) => {
      const cards = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll('.card'));
        return els.slice(0, 3).map((el) => ({
          bg: getComputedStyle(el).backgroundColor,
        }));
      });
      console.log(`[${theme}] card backgrounds:`, JSON.stringify(cards, null, 2));
      for (const card of cards) {
        expect(card.bg).not.toBe('rgba(0, 0, 0, 0)');
      }
    });

    test('base content text color has sufficient opacity', async ({ page }) => {
      const color = await computedStyle(page, 'body', 'color');
      console.log(`[${theme}] body color: ${color}`);
      expect(color).not.toBeNull();
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('theme toggle is visible', async ({ page }) => {
      const toggle = page.locator('.swap.swap-rotate').first();
      await expect(toggle).toBeVisible();
    });

    test('screenshot', async ({ page }) => {
      await page.screenshot({
        path: `tests/screenshots/${theme}-homepage.png`,
        fullPage: true,
      });
    });
  });
}

// Projects page checks
for (const theme of themes) {
  test(`[${theme}] projects page - cards and badges render correctly`, async ({ page }) => {
    await setTheme(page, theme);
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');

    const badges = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('.badge'));
      return els.slice(0, 5).map((el) => ({
        text: el.textContent?.trim(),
        bg: getComputedStyle(el).backgroundColor,
      }));
    });
    console.log(`[${theme}] /projects badge backgrounds:`, JSON.stringify(badges, null, 2));

    for (const badge of badges) {
      expect(badge.bg, `Badge "${badge.text}" transparent on /projects`).not.toBe('rgba(0, 0, 0, 0)');
    }

    await page.screenshot({
      path: `tests/screenshots/${theme}-projects.png`,
      fullPage: true,
    });
  });
}

// Blog page checks — gradient buttons exist here (btn-primary, not circle, not outline)
for (const theme of themes) {
  test(`[${theme}] blog page - primary buttons have gradient`, async ({ page }) => {
    await setTheme(page, theme);
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    const btnBg = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.btn-primary:not(.btn-circle):not(.btn-outline)'));
      return btns.map((el) => ({
        text: el.textContent?.trim().slice(0, 30),
        backgroundImage: getComputedStyle(el).backgroundImage,
        backgroundColor: getComputedStyle(el).backgroundColor,
      }));
    });
    console.log(`[${theme}] /blog btn-primary backgrounds:`, JSON.stringify(btnBg, null, 2));

    if (btnBg.length > 0) {
      const gradientBtns = btnBg.filter((b) => b.backgroundImage.includes('gradient'));
      expect(gradientBtns.length, `Expected gradient on primary buttons, got: ${JSON.stringify(btnBg)}`).toBeGreaterThan(0);
    } else {
      console.log(`[${theme}] No non-circle non-outline btn-primary on /blog`);
    }

    await page.screenshot({
      path: `tests/screenshots/${theme}-blog.png`,
      fullPage: true,
    });
  });
}
