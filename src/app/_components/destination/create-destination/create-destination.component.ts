import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MOCK_DESTINATIONS } from 'src/app/_mocks/mock-destinations';
import { Destination } from 'src/app/_model/destination';
import { DestinationType } from 'src/app/_model/destination.type.enum';
import { DestinationMockService } from 'src/app/_services/destination-mock.service';

@Component({
  selector: 'app-create-destination',
  templateUrl: './create-destination.component.html',
  styleUrls: ['./create-destination.component.css']
})
export class CreateDestinationComponent {
  destinationForm: FormGroup; 
  destinationTypes = Object.values(DestinationType);
  nextId: number;

  constructor(
    private destinationService: DestinationMockService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.nextId = MOCK_DESTINATIONS.length > 0 ? MOCK_DESTINATIONS[MOCK_DESTINATIONS.length - 1].id + 1 : 1;

    this.destinationForm = this.fb.group({
      id: [this.nextId, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      countryCode: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
      type: ['City', Validators.required],
      lastModify: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.destinationForm.valid) {
      const destination = this.destinationForm.value as Destination;
      console.log(destination)
      destination.id = Number(destination.id);
      this.destinationService.create(destination).subscribe(success => {
        if (success) {
          this.router.navigate(['/home']);
        } else {
          alert('Failed to create destination.');
        }
      });
    }
  }
} 