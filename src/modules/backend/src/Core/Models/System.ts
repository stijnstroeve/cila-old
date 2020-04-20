import os, {CpuInfo, NetworkInterfaceInfo} from 'os';

interface ISystem {
    hostname: string;
    platform: string;
    architecture: string;
    cpu: CpuInfo[];
    freeMemory: number;
    totalMemory: number;
    load: Array<number>;
    networkInterfaces: { [index: string]: NetworkInterfaceInfo[] };
    uptime: number;
}

class System implements ISystem {
    public architecture: string;
    public cpu: CpuInfo[];
    public freeMemory: number;
    public hostname: string;
    public load: Array<number>;
    public networkInterfaces: { [p: string]: NetworkInterfaceInfo[] };
    public platform: string;
    public totalMemory: number;
    public uptime: number;

    /**
     * Creates a system instance
     * This class includes properties used in the system info
     */
    constructor() {

        this.hostname = os.hostname();
        this.platform = os.platform();
        this.architecture = os.arch();

        this.update();
    }

    /**
     * Updates the system data in this instance
     */
    update() {
        this.cpu = os.cpus();
        this.freeMemory = os.freemem();
        this.totalMemory = os.totalmem();
        this.load = os.loadavg();
        this.networkInterfaces = os.networkInterfaces();
        this.uptime = os.uptime();
    }

}

export default System;
export {ISystem};