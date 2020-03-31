import os from 'os';

export default class System {
    constructor() {
        this.hostname = os.hostname();
        this.platform = os.platform();
        this.architecture = os.arch();
        this.cpu = os.cpus();
        this.freeMemory = os.freemem();
        this.totalMemory = os.totalmem();
        this.load = os.loadavg();
        this.networkInterfaces = os.networkInterfaces();
        this.uptime = os.uptime();
    }

    updateUptime() {
        this.uptime = os.uptime();
    }
}