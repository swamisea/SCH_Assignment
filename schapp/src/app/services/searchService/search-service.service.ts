import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SearchRequest{
  firstName: string;
  lastName: string;
  dob: string;
  startDate: string;
  endDate: string;
  mrn: string;
  id: string;
  ssn: string;
  phone: string;
  email: string;
  hospital: string;
}


@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  private _searchRequest = new BehaviorSubject<SearchRequest>({
    firstName:"", 
    lastName: "",
    dob: "",
    startDate: "",
    endDate: "",
    mrn: "",
    id: "",
    ssn: "",
    phone: "",
    email: "",
    hospital: ""
  });
  readonly searchRequest = this._searchRequest.asObservable();

  setSearchRequest(req: SearchRequest) {
    console.log("From the service: ", req)
    this._searchRequest.next(req);
  }

  constructor() { }
}
