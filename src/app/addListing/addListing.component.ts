import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService, AuthenticationService} from '@/services';
import {ListingService} from "@/services/listing.service";

@Component({templateUrl: 'addListing.component.html'})
export class AddListingComponent implements OnInit {
    newListingForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private listingService: ListingService,
        private alertService: AlertService
    ) {
    }

    get f() { return this.newListingForm.controls; }

    ngOnInit() {
        this.newListingForm = this.formBuilder.group({
            listing_listingId: ['', Validators.required],
            listing_listingTitle: ['', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.newListingForm.invalid) {
            return;
        }

        this.loading = true;
        this.listingService.add(this.newListingForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
