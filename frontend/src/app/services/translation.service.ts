import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private apiUrl = 'http://localhost:3000';
  private apiKey = '20225cef97msh028d837662163fap18b498jsn4c7932514f34';

  constructor(private http: HttpClient) {}

  translateText(sourceLanguage: string, targetLanguage: string, text: string): Observable<any> {
    const url = `${this.apiUrl}/translate`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const params = `source_language=${sourceLanguage}&target_language=${targetLanguage}&text=${encodeURIComponent(text)}`;

    return this.http.post(url, params, { headers });
  }
}
