const routes = require('./config/routes');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = routes.getRequestHandler(nextApp);
const express = require('express');


nextApp.prepare().then(() => {
	express().use(nextHandler).listen(port, err => {
		if (err) throw err
    console.log(`> Ready on port: ${port}`)
  });
})
