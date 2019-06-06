import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';

// import our main App component
import App from '../../common/App';

const path = require('path');
const fs = require('fs');

export default (req, res, next) => {
  // point to the html file created by CRA's build tool
  const filePath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'build',
    'index.html'
  );

  // render the app as a string
  const context = {};
  const sheet = new ServerStyleSheet();
  const html = renderToString(
    sheet.collectStyles(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )
  );
  const styles = sheet.getStyleTags();

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    if (context.status === 404) {
      res.status(404);
    }
    if (context.url) {
      return res.redirect(301, context.url);
    }

    return res.send(
      htmlData
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replace('</title>', `</title>${styles}`)
    );
  });
};
