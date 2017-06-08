// to run the final production build on local which can be helpful when debugging issue on produciton build
import express from 'express';
import path from 'path';
import open from 'open';
// of some concern and would need to be considered on a per application basis
// in the example app turning on compression decreased the size of the bundle from 394 KB to 121 KB
// it also increased the load time from 16ms to 114ms
import compression from 'compression';

/*eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
