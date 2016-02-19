import {Injectable} from "angular2/core";
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

export interface AppProperties {
  name: string
}

@Injectable()
export class AppPropertiesService {
  constructor (private http: Http) {}

  private _appPropertiesUrl = 'api/app';

  getAppPropertiesApi() {
    return this.http.get(this._appPropertiesUrl)
      .map(res => <AppProperties> res.json().data)
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  getAppPropertiesMock() {
    const appProperties: AppProperties = {
      name: 'Angular 2 (Mock)'
    };

    return Promise.resolve(appProperties);
  }
}
