import 'angular2-universal/polyfills';
import {prebootComplete} from 'angular2-universal';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';

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
