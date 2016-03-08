import {Injectable} from "angular2/core";
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface AppProperties {
  name: string
}

@Injectable()
export class AppPropertiesService {
  constructor (private http: Http) {}

  private _appPropertiesUrl = 'http://localhost:3000/api/app';

  getAppPropertiesApi() {
    return this.http.get(this._appPropertiesUrl)
      .map(res => <AppProperties> res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
