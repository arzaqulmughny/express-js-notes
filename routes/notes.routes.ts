import { Router } from 'express';
import { createNote, getAllNotes } from '../controllers/notes.controller.js';

const notesRouter = Router();

notesRouter.post('/', createNote);
notesRouter.get('/', getAllNotes);

export default notesRouter;
