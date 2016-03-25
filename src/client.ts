import 'angular2-universal-preview/polyfills';
import {prebootComplete} from 'angular2-universal-preview';

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {App} from './app/app.component';

setTimeout(() => {
    bootstrap(App, [
        ...HTTP_PROVIDERS,
        ...ROUTER_PROVIDERS
    ]).then(() => {
        document.querySelector('.indicate').classList.add('done');
        prebootComplete();
    });
}, 2000);
