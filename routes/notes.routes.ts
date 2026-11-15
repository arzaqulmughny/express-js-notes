import { Router } from 'express';
import { createNote } from '../controllers/notes.controller.js';

const notesRouter = Router();

notesRouter.post('/', createNote);

export default notesRouter;
