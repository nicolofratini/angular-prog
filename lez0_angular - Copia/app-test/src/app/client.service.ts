import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Client {
  id?:number;
  codiceFiscale: string;
  nome: string;
  cognome: string;
  dataDiNascita: string;
  azienda: string;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:3000/clients'; //url del json server

  //GET /clients?userId=1


  constructor(private http: HttpClient) { }

  getClientsById(id: number): Observable<Client[]> {
    const url = `${this.apiUrl}?userId=${id}`;
    return this.http.get<Client[]>(url);
  }

  addClient(client: Client): Observable<Client>{
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(client: Client): Observable<any>{
    const url = `${this.apiUrl}/${client.id}`;
    return this.http.put<any>(url, client);
  }

  deleteClient(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  
}
