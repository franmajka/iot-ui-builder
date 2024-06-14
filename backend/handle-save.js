import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs';
import { minify } from 'csso';
import puppeteer from 'puppeteer';
import { exportToHTML } from './export-to-html.js';

const createTemplateFolder = async (templateFolder) => {
  if (!existsSync(templateFolder)) {
    await mkdir(templateFolder);
  }
}

const saveJSON = async ({ templateFolder, hierarchy, frames, customCss }) => {
  const json = JSON.stringify({ hierarchy, frames, customCss: minify(customCss).css });
  await writeFile(`${templateFolder}/template.json`, json, 'utf-8');
}

const savePreview = async ({ templateFolder, html }) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.setViewport({ width: 1920, height: 1080 });

  await page.screenshot({ path: `${templateFolder}/preview.png`, fullPage: true });
  await browser.close();
}

const saveHTML = async ({ templateFolder, hierarchy, frames, customCss }) => {
  const html = exportToHTML({ hierarchy, frames, customCss });
  await writeFile(`${templateFolder}/template.html`, html, 'utf-8');
  savePreview({ templateFolder, html });
};

export const handleSave = async (req, res) => {
  const { templateId } = req.params;
  const { hierarchy, frames, customCss } = req.body;

  const templateFolder = `./templates/${templateId}`;

  await createTemplateFolder(templateFolder);

  await Promise.all([
    saveJSON({ templateFolder, hierarchy, frames, customCss }),
    saveHTML({ templateFolder, hierarchy, frames, customCss }),
  ]);

  res.send(JSON.stringify({ message: 'Hello World'}));
}
