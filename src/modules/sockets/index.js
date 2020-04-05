import {ROOMS} from './constants';

export default class SocketHandler {
    constructor(io) {
        this.io = io;

        this.connections = [];
    }

    connection() {
        this.io.on('connection', (socket) => {

            this._addConnection(socket);

            socket.on('disconnect', () => {
                this._removeConnection(socket);
            });

            socket.on('subscribe', () => {
                this._removeConnection(socket);
            });
        });
    }

    /**
     * Sends the given data to a room
     * @param room The room to send the data to
     * @param data The data to send
     */
    sendData(room, data) {
        this.io.to(room, data);
    }

    _addConnection(socket) {
        this.connections.push(socket);
    }

    _removeConnection(socket) {
        this.connections.splice(this.connections.indexOf(socket));
    }

    _subscribe(room) {
        if(ROOMS.includes(room)) {
            // Join the given room
            this.io.join(room);
        }
    }

    _unsubscribe(room) {
        if(ROOMS.includes(room)) {
            // Leave the given room
            this.io.leave(room);
        }
    }


}