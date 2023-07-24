"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteByIdHandler = exports.updateNoteByIdHandler = exports.getNoteByIdHandler = exports.getAllNotesHandler = exports.addNoteHandler = void 0;
const nanoid_1 = require("nanoid");
const notes_1 = require("./notes");
const addNoteHandler = (request, h) => {
    let payload = '';
    if (typeof request.payload === 'string') {
        try {
            payload = JSON.parse(request.payload);
        }
        catch (error) {
            return;
        }
    }
    else if (typeof request.payload === 'object') {
        payload = request.payload;
    }
    const { title, tags, body } = payload;
    const id = (0, nanoid_1.nanoid)(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = {
        id, title, tags, body, createdAt, updatedAt
    };
    notes_1.notes.push(newNote);
    const isSuccess = notes_1.notes.filter((note) => note.id === id).length > 0;
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
    }
    else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal ditambahkan',
        });
        response.code(500);
        return response;
    }
};
exports.addNoteHandler = addNoteHandler;
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes: notes_1.notes
    }
});
exports.getAllNotesHandler = getAllNotesHandler;
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes_1.notes.filter(note => note.id === id)[0];
    if (note !== undefined) {
        {
            return {
                status: 'success',
                data: {
                    note,
                },
            };
        }
    }
    else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan tidak ditemukan',
        });
        response.code(404);
        return response;
    }
};
exports.getNoteByIdHandler = getNoteByIdHandler;
const updateNoteByIdHandler = (request, h) => {
    let payload = '';
    const { id } = request.params;
    if (typeof request.payload === 'object') {
        payload = request.payload;
    }
    const { title, tags, body } = payload;
    const updatedAt = new Date().toISOString();
    const index = notes_1.notes.findIndex((notes) => notes.id === id);
    if (index !== -1) {
        notes_1.notes[index] = Object.assign(Object.assign({}, notes_1.notes[index]), { title,
            tags,
            body,
            updatedAt });
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal diperbarui. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }
};
exports.updateNoteByIdHandler = updateNoteByIdHandler;
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes_1.notes.findIndex((notes) => notes.id === id);
    if (index !== -1) {
        notes_1.notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal dihapus. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }
};
exports.deleteNoteByIdHandler = deleteNoteByIdHandler;
//# sourceMappingURL=handler.js.map