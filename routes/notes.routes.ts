import { Router } from 'express';
import { createNote, deleteNoteById, findNoteById, getAllNotes } from '../controllers/notes.controller.js';

const notesRouter = Router();

notesRouter.post('/', createNote);
notesRouter.get('/', getAllNotes);
notesRouter.get('/:id', findNoteById);
notesRouter.delete('/:id', deleteNoteById);

export default notesRouter;
