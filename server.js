const routes = require('./config/routes');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = routes.getRequestHandler(nextApp);

nextApp.prepare().then(() => {
  const server = require('express');

	server().use(nextHandler).listen(port, err => {
		if (err) throw err
    console.log(`> Ready on port: ${port}`)
  });
})
