import SocketIO, {Socket} from 'socket.io';

class SocketHandler {
    public static readonly SYSTEM_ROOM = 'system-room';

    public static readonly ROOMS = [
        SocketHandler.SYSTEM_ROOM
    ];

    private io: SocketIO.Server;
    private connections: Array<Socket>;

    constructor(io: SocketIO.Server) {
        this.io = io;

        this.connections = [];

        this.connection();
    }

    private connection() {
        this.io.on('connection', (socket: Socket) => {

            // Add socket to the connection list
            this.addConnection(socket);

            socket.on('disconnect', () => {
                this.removeConnection(socket);
            });

            socket.on('subscribe', (room) => this.subscribe(socket, room)); // Subscribe the user to the given room
            socket.on('unsubscribe', (room) => this.unsubscribe(socket, room)); // Unsubscribe the user from the given room
        });
    }

    /**
     * Sends the given data to a room
     * @param roomName The room to send the data to
     * @param data The data to send to the client
     */
    public sendData(roomName: string, data: any) {
        this.io.to(roomName).emit(roomName, data);
    }

    private addConnection(socket: Socket) {
        this.connections.push(socket);
    }

    private removeConnection(socket: Socket) {
        this.connections.splice(this.connections.indexOf(socket));
    }

    private subscribe(socket: Socket, roomName: string) {
        if(SocketHandler.ROOMS.includes(roomName)) {
            // Join the given room
            socket.join(roomName);
        }
    }

    private unsubscribe(socket: Socket, roomName: string) {
        if(SocketHandler.ROOMS.includes(roomName)) {
            // Leave the given room
            socket.leave(roomName);
        }
    }

}

export default SocketHandler;