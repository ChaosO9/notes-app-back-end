"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = __importStar(require("@hapi/hapi"));
const notes_1 = require("./notes");
const nanoid_1 = require("nanoid");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = Hapi.server({
        port: 5500,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });
    server.route({
        method: 'POST',
        path: '/notes',
        handler: (request, h) => {
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
                title, tags, body, id, createdAt, updatedAt
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
        }
    });
    yield server.start();
    console.log(`Server berjalan di ${server.info.uri}`);
});
init();
//# sourceMappingURL=gabungan.js.map