import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class StudentService {
    private apiURL = 'http://localhost:3978/api/'

    constructor(private http: HttpClient) { }

    public getAllStudents() {
        return this.http.get(`${this.apiURL}student`)
    }

    public deleteStudent(id: string) {
        const headers = this.createRequestHeader()
        return this.http.delete(`${this.apiURL}student/${id}`, { headers })
    }

    private createRequestHeader() {
        const headers = new HttpHeaders({
            'Access-Control-Allow-Methods': 'GET,POST, OPTIONS, PUT, DELETE'
        })
        return headers
    }
}