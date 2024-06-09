import { opendir, mkdir } from 'node:fs/promises'

export const loadTemplates = async () => {
  let maxTemplateId = 0;

  try {
    const templatesDir = await opendir('./templates');

    for await (const dirent of templatesDir) {
      if (!isNaN(+dirent.name) && +dirent.name > maxTemplateId) {
        maxTemplateId = +dirent.name;
      }
    }
  } catch (e) {
    await mkdir('./templates');
  }


  return maxTemplateId;
}
