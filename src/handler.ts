import { Request, ResponseToolkit } from '@hapi/hapi';
import { nanoid } from 'nanoid';
import { notes } from './notes';
import { Note } from './interfaces';

interface Payload {
    title: string,
    tags: string,
    body: string,
}

export const addNoteHandler = (request: Request, h: ResponseToolkit) => {
    let payload: Payload | string | object = '';

    if (typeof request.payload === 'string') {
        try {
            payload = JSON.parse(request.payload);
        } catch (error) {
            return;
        }
    } else if (typeof request.payload === 'object') {
        payload = request.payload;
    }

    const { title, tags, body } = payload as Payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = {
        id, title, tags, body, createdAt, updatedAt
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note: Note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal ditambahkan',
        });
        response.code(500);
        return response;
    }
};

export const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes
    }
});

export const getNoteByIdHandler = (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const note = notes.filter(note => note.id === id)[0];

    if (note !== undefined) {
        {
            return {
                status: 'success',
                data: {
                    note,
                },
            };
        }
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan tidak ditemukan',
        });
        response.code(404);
        return response;
    }
};

export const updateNoteByIdHandler = (request: Request, h: ResponseToolkit) => {
    interface Payload {
        title: string,
        tags: string,
        body: string,
    }
    let payload: string | object | Buffer = '';

    const { id } = request.params;
    if (typeof request.payload === 'object') {
        payload = request.payload;
    }
    const { title, tags, body } = payload as Payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((notes) => notes.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });

        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal diperbarui. Id tidak ditemukan',
        });

        response.code(404);
        return response;
    }
};

export const deleteNoteByIdHandler = (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const index = notes.findIndex((notes) => notes.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });

        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal dihapus. Id tidak ditemukan',
        });

        response.code(404);
        return response;
    }
};