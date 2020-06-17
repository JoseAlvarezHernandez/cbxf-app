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

    public createStudent(body: any) {
        const headers = this.createRequestHeader()
        return this.http.post(`${this.apiURL}student`, body, { headers })
    }

    public getStudent(id: any) {
        return this.http.get(`${this.apiURL}student/${id}`)
    }

    public updateStudent(id: any, body: any) {
        return this.http.put(`${this.apiURL}student/${id}`, body)
    }

    private createRequestHeader() {
        const headers = new HttpHeaders({
            'Access-Control-Allow-Methods': 'GET,POST, OPTIONS, PUT, DELETE'
        })
        return headers
    }
}