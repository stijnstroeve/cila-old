import {ROOMS} from './constants';

export default class SocketHandler {
    constructor(io) {
        this.io = io;

        this.connections = [];

        this.connection();
    }

    connection() {
        this.io.on('connection', (socket) => {
            // Add socket to the socket list
            this._addConnection(socket);

            socket.on('disconnect', () => {
                this._removeConnection(socket);
            });

            socket.on('subscribe', (room) => this._subscribe(socket, room)); // Subscribe the user to the given room
            socket.on('unsubscribe', (room) => this._unsubscribe(socket, room)); // Unsubscribe the user from the given room
        });
    }

    /**
     * Sends the given data to a room
     * @param room The room to send the data to
     * @param data The data to send
     */
    sendData(room, data) {
        this.io.to(room).emit(room, data);
    }

    _addConnection(socket) {
        this.connections.push(socket);
    }

    _removeConnection(socket) {
        this.connections.splice(this.connections.indexOf(socket));
    }

    _subscribe(socket, room) {
        if(ROOMS.includes(room)) {
            // Join the given room
            socket.join(room);
        }
    }

    _unsubscribe(room) {
        if(ROOMS.includes(room)) {
            // Leave the given room
            this.io.leave(room);
        }
    }

}