import 'angular2-universal/polyfills';

import * as path from 'path';
import * as express from 'express';

// Angular 2 Universal
import {
  provide,
  enableProdMode,
  expressEngine,
  REQUEST_URL,
  ORIGIN_URL,
  BASE_URL,
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

// Application
import {App} from './app/app.component';
import {HtmlHead, ServerOnlyApp} from './server-only-app/html.component';

let app = express();
let root = path.join(path.resolve(__dirname, '..'));

enableProdMode();

// Express View
app.engine('.html', expressEngine);
app.set('views', __dirname);
app.set('view engine', 'html');


function ngApp(req: express.Request, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';
  res.render('index', {
    directives: [ App, HtmlHead, ServerOnlyApp],
    platformProviders: [
      provide(ORIGIN_URL, {useValue: 'http://localhost:3000'}),
      provide(BASE_URL, {useValue: baseUrl}),
    ],
    providers: [
      provide(REQUEST_URL, {useValue: url}),
      NODE_ROUTER_PROVIDERS,
      NODE_HTTP_PROVIDERS,
    ],
    async: true,
    preboot: false,
    // preboot: {
    //   appRoot: 'app',
    //   uglify: false,
    //   debug: true
    // }
  });
}

// Serve static files
app.use(express.static(root, {index: false}));

let router = express.Router();
router.get('/message', (req, res) => {
    res.send('XHR message!');
});

app.use('/api/v1', router);

// Routes with html5pushstate
app.use('/', ngApp);
app.use('/about', ngApp);
app.use('/home', ngApp);

// Server
app.listen(3000, () => {
  console.log('Listen on http://localhost:3000');
});
