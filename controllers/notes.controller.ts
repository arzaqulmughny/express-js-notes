import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export async function createNote(req: Request, res: Response) {
  const { title, body } = (req.body ?? {}) as Record<string, unknown>;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ message: "Title wajib diisi." });
  }

  if (typeof body !== "string" || body.trim() === "") {
    return res.status(400).json({ message: "Body wajib diisi." });
  }

  try {
    const note = await prisma.notes.create({
      data: {
        title: title.trim(),
        body: body.trim(),
      },
    });

    return res.status(201).json({
      message: "Note berhasil dibuat.",
      data: note,
    });
  } catch {
    return res.status(500).json({ message: "Gagal membuat note." });
  }
}

function positiveInteger(value: unknown, fallback: number): number {
  if (typeof value !== "string") {
    return fallback;
  }

  const number = Number(value);

  return Number.isInteger(number) && number > 0 ? number : fallback;
}

export async function getAllNotes(req: Request, res: Response) {
  const page = positiveInteger(req.query.page, 1);
  const limit = Math.min(positiveInteger(req.query.limit, 10), 100);
  const skip = (page - 1) * limit;

  try {
    const [notes, total] = await prisma.$transaction([
      prisma.notes.findMany({
        skip,
        take: limit,
        orderBy: {
          id: "desc",
        },
      }),
      prisma.notes.count(),
    ]);

    return res.status(200).json({
      data: notes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch {
    return res.status(500).json({
      message: "Gagal mengambil notes.",
    });
  }
}

export async function findNoteById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID note tidak valid.",
    });
  }

  try {
    const note = await prisma.notes.findUnique({
      where: { id },
    });

    if (!note) {
      return res.status(404).json({
        message: "Note tidak ditemukan.",
      });
    }

    return res.status(200).json({
      data: note,
    });
  } catch {
    return res.status(500).json({
      message: "Gagal mengambil note.",
    });
  }
}
