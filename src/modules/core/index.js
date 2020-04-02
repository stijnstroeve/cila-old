import Application from './application';

const app = new Application();

app.start();

setTimeout(() => app.stop(), 1000000);