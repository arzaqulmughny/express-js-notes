import express, { type Express, type Request, type Response } from 'express';
import notesRouter from './routes/notes.routes.ts';

const app: Express = express();

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/notes', notesRouter)

app.listen(3000);
