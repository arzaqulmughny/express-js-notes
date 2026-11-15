import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export async function createNote(req: Request, res: Response) {
  const { title, body } = (req.body ?? {}) as Record<string, unknown>;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'Title wajib diisi.' });
  }

  if (typeof body !== 'string' || body.trim() === '') {
    return res.status(400).json({ message: 'Body wajib diisi.' });
  }

  try {
    const note = await prisma.notes.create({
      data: {
        title: title.trim(),
        body: body.trim(),
      },
    });

    return res.status(201).json({
      message: 'Note berhasil dibuat.',
      data: note,
    });
  } catch {
    return res.status(500).json({ message: 'Gagal membuat note.' });
  }
}
