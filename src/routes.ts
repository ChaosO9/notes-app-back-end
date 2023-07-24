import { ServerRoute } from '@hapi/hapi';
import { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, updateNoteByIdHandler, deleteNoteByIdHandler } from './handler';

export const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler
    },
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: updateNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    }
];