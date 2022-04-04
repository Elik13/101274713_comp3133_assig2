import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {Listing, User} from '@/models';
import {AuthenticationService, UserService} from '@/services';
import {ListingService} from "@/services/listing.service";
import {Router} from "@angular/router";

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    listings: Listing[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private listingService: ListingService,
        private router: Router
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        if (this.currentUser.role === 'admin') {
            this.loadAllUsers();
        }
        this.loadAllListings();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    deleteListing(id: number) {
        this.listingService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllListings());
    }

    createListing() {
        // this.router.re
    }

    addListing(listing: Listing) {
        this.listingService.add(listing)
            .pipe(first())
            .subscribe(() => this.loadAllListings());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    private loadAllListings() {
        this.listingService.getAll()
            .pipe(first())
            .subscribe(listings => this.listings = listings);
    }
}