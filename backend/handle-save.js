import { mkdir, open } from 'node:fs/promises'
import { exportToHTML } from './export-to-html.js';
import { existsSync } from 'node:fs';

const createTemplateFolder = async (templateFolder) => {
  if (!existsSync(templateFolder)) {
    await mkdir(templateFolder);
  }
}

const saveJSON = async ({ templateFolder, hierarchy, frames }) => {
  const file = await open(`${templateFolder}/template.json`, 'w');
  await file.write(JSON.stringify({ hierarchy, frames }));
}

const saveHTML = async ({ templateFolder, hierarchy, frames }) => {
  const file = await open(`${templateFolder}/template.html`, 'w');
  await file.write(exportToHTML({ hierarchy, frames }));
};

export const handleSave = async (req, res) => {
  const { templateId, hierarchy, frames } = req.body;

  const templateFolder = `./templates/${templateId}`;

  await createTemplateFolder(templateFolder);

  await Promise.all([
    saveJSON({ templateFolder, hierarchy, frames }),
    saveHTML({ templateFolder, hierarchy, frames }),
  ]);

  res.send(JSON.stringify({ message: 'Hello World'}));
}
