import { Component, OnInit, Input } from '@angular/core';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

import { EditProfileComponent } from '../edit-profile/edit-profile.component';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

 

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      //console.log(this.user);
      return this.user;
    })
  }

  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px'
    })
  }

  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your account? This cannnot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        //console.log(result);
        localStorage.clear();
      });
    }
  }
}