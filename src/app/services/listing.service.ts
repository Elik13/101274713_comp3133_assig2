import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/models';

@Injectable({ providedIn: 'root' })
export class ListingService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/listings`);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/listings/${id}`);
    }
}