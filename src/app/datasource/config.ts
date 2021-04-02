import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";

@Injectable()
export class Config {
  private env: string; // dev, prod
  private serviceBaseURL = {
    dev: 'https://127.0.0.1:8000/',
    prod: 'https://127.0.0.1:8000/'
  };

  public get() {
    if (environment.production === true) {
      this.env = 'prod';
    } else {
      this.env = 'dev';
    }
    let result;
    if (this.env === 'dev') {
      result = {
        baseURL: this.serviceBaseURL.dev
      };
    } else if (this.env === 'prod') {
      result = {
        baseURL: this.serviceBaseURL.prod
      };
    }
    return result;
  };

}
