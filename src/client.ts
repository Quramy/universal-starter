import 'angular2-universal-preview/polyfills';
import {prebootComplete} from 'angular2-universal-preview';
import {provide} from 'angular2/core';

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';

import {App} from './app/app';

bootstrap(App, [
  ...ROUTER_PROVIDERS,
  ...HTTP_PROVIDERS,
  provide('IS_SERVER_RENDER', {useValue: false})
])
.then(prebootComplete)
