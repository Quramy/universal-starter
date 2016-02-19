import {Component, Directive, ElementRef, Renderer} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';

import {AppProperties, AppPropertiesService} from './app-properties.service';

@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // we must interact with the dom through Renderer for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
  }
}



@Component({
  selector: 'home',
  template: `
  Home
  `
})
export class Home {
}

@Component({
  selector: 'about',
  template: `
  About
  `
})
export class About {
}


@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES,
    XLarge
  ],
  providers: [
    HTTP_PROVIDERS,
    AppPropertiesService
  ],
  styles: [`
    .router-link-active {
      background-color: lightgray;
    }
  `],
  template: `
  <div>
    <nav>
      <a [routerLink]=" ['./Home'] ">Home</a>
      <a [routerLink]=" ['./About'] ">About</a>
    </nav>
    <div>
      <span x-large>Hello, {{ name }}!</span>
    </div>

    name: <input type="text" [value]="name" (input)="name = $event.target.value" autofocus>
    <main>
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/about', component: About, name: 'About' }
])
export class App {

  constructor (private _appPropertiesService: AppPropertiesService) {}

  ngOnInit() {
    this.getAppPropertiesApi(); // Doesn't work
    //this.getAppPropertiesMock(); // Works
  }

  name: string;
  errorMessage: string;

  getAppPropertiesApi() {
    this._appPropertiesService.getAppPropertiesApi()
        .subscribe(
          appProperties => this.name = appProperties.name,
          error =>  this.errorMessage = <any>error);
  }

  getAppPropertiesMock() {
    this._appPropertiesService.getAppPropertiesMock().then(appProperties => {
      this.name = appProperties.name
    });
  }
}


