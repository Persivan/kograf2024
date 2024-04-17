import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {UserPairInterface} from "../../auth/types/userPair.interface";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PeriodicElementInterface} from "../types/periodicElement.interface";

const FETCH_ELEMENTS = 'elements'
const FETCH_PAGINATION_DATA = 'elements'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  getTableData(): Observable<PeriodicElementInterface[]> {
    const fullUrl = environment.apiUrl + FETCH_ELEMENTS;
    return this.http.get<PeriodicElementInterface[]>(fullUrl);
  }

  getDataLength(): Observable<number> {
    const fullUrl = environment.apiUrl + FETCH_PAGINATION_DATA;
    return this.http.get<any[]>(fullUrl) // Replace with your JSON Server endpoint
      .pipe(
        map(data => data.length)
      );
  }


}
