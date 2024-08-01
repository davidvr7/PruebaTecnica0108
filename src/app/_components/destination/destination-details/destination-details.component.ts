import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Destination } from 'src/app/_model/destination';
import { DestinationMockService } from 'src/app/_services/destination-mock.service';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css']
})
export class DestinationDetailsComponent {

  destination: Destination | undefined;

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationMockService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDestination(id);
  }

  loadDestination(id: number): void {
    this.destinationService.getById(id).subscribe(
      destination => {
        this.destination = destination;
      },
      error => {
        console.error('Error loading destination:', error); 
      }
    );
  }
}