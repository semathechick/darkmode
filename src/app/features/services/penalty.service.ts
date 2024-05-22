import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PenaltyService {
  private apiUrl = 'http://localhost:60805/api/PenaltyCalculator/calculate'; 

  constructor(private http: HttpClient) {}

  calculatePenalty(loanTransactionId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}?loanTransactionId=${loanTransactionId}`);
  }
}



