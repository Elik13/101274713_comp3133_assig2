import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Listing} from '@/models';

@Injectable({providedIn: 'root'})
export class ListingService {
    constructor(private http: HttpClient) {
    }

    add(listing: Listing) {
        return this.http.post<Listing>(`${config.apiUrl}/listings`, listing);
    }

    getAll() {
        return this.http.get<Listing[]>(`${config.apiUrl}/listings`);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/listings/${id}`);
    }
}