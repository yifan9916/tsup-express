import http from 'http';
import app from './app';

const PORT = process.env.PORT || 3333;

const SIGNALS = ['SIGINT', 'SIGTERM'];

const server = http.createServer(app);

SIGNALS.forEach((signal) => {
  process.on(signal, () => {
    console.log(
      `Got ${signal}. Gracefully shutting down HTTP server...`,
      new Date().toISOString()
    );

    shutdown();
  });
});

const shutdown = () => {
  server.close((err) => {
    if (err) {
      console.log(err);
      process.exitCode = 1;

      console.log('HTTP server closed.');
      process.exit();
    }
  });
};

server.listen(PORT, () => {
  console.log(`Server is up: http://0.0.0.0:${PORT}`);
});
