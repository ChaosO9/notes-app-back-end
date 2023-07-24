"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const handler_1 = require("./handler");
exports.routes = [
    {
        method: 'GET',
        path: '/notes',
        handler: handler_1.getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler_1.getNoteByIdHandler
    },
    {
        method: 'POST',
        path: '/notes',
        handler: handler_1.addNoteHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler_1.updateNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler_1.deleteNoteByIdHandler,
    }
];
//# sourceMappingURL=routes.js.map