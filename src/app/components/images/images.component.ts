import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/models/image.interface';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class ImagesComponent implements OnInit {

  images: Image[] = [];
  loading: boolean = false;

  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.loading = true;
    this.imagesService.getAllImages()
      .subscribe((images) => {
        this.loading = false;
        this.images = images;
      });
  }


  showLoading(): boolean {
    return this.loading;
  }

}
