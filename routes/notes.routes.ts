import { Router } from 'express';
import { createNote, findNoteById, getAllNotes } from '../controllers/notes.controller.js';

const notesRouter = Router();

notesRouter.post('/', createNote);
notesRouter.get('/', getAllNotes);
notesRouter.get('/:id', findNoteById);

export default notesRouter;
