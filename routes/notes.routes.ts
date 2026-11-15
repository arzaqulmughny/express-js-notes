import { Router } from 'express';
import { createNote, deleteNoteById, findNoteById, getAllNotes, updateNote } from '../controllers/notes.controller.js';

const notesRouter = Router();

notesRouter.post('/:id', createNote);
notesRouter.patch('/:id', updateNote);
notesRouter.get('/', getAllNotes);
notesRouter.get('/:id', findNoteById);
notesRouter.delete('/:id', deleteNoteById);

export default notesRouter;
