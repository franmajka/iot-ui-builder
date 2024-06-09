import express from 'express';
import cors from 'cors';
import { loadTemplates } from './load-templates.js';
import { handleSave } from './handle-save.js';

const app = express().use(express.json()).use(cors());
const port = 3000

app.post('/', handleSave);

const maxTemplateId = await loadTemplates();
console.log(`Max template id: ${maxTemplateId}`);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
