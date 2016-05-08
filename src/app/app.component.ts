import {Component, Directive, ElementRef, Renderer, OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, OnActivate} from '@angular/router-deprecated';
import {Http} from '@angular/http';


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
  <span>{{xhrMessage}}</span>
  `
})
export class About implements OnInit {
    private xhrMessage: string;
    constructor(private http: Http) {
    }

    ngOnInit() {
      this.http.get('http://localhost:3000/api/v1/message').subscribe(res => this.xhrMessage = res.text());
    }

    // routerOnActivate() {
    //   return this.http.get('http://localhost:3000/api/v1/message').subscribe(res => {
    //       this.xhrMessage = res.text();
    //   });
    // }
}


@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES,
    XLarge
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
  { path: '/', component: Home, name: 'Home', useAsDefault: true },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/about', component: About, name: 'About' },
  { path: '/**', redirectTo: ['Home'] }
])
export class App {
  name: string = 'Angular 2';
}


