import Application from './Application';

const app = new Application();

app.start();

setTimeout(() => app.stop(), 1000000);