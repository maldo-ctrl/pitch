import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const baseUrl = "https://api.dev.brainanalytics.co/angular";

@Injectable({
  providedIn: "root"
})
export class PlayersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
}
