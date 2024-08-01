import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DestinationDetailsComponent } from './destination-details.component';
import { DestinationMockService } from 'src/app/_services/destination-mock.service';
import { Destination } from 'src/app/_model/destination';
import { DestinationType } from 'src/app/_model/destination.type.enum'; // Importa el enum
import { By } from '@angular/platform-browser';

describe('DestinationDetailsComponent', () => {
  let component: DestinationDetailsComponent;
  let fixture: ComponentFixture<DestinationDetailsComponent>;
  let mockDestinationService: jasmine.SpyObj<DestinationMockService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    const destinationServiceSpy = jasmine.createSpyObj('DestinationMockService', ['getById']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '1' } }
    };

    await TestBed.configureTestingModule({
      declarations: [DestinationDetailsComponent],
      providers: [
        { provide: DestinationMockService, useValue: destinationServiceSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationDetailsComponent);
    component = fixture.componentInstance;
    mockDestinationService = TestBed.inject(DestinationMockService) as jasmine.SpyObj<DestinationMockService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load destination on init', () => {
    const destination: Destination = {
      id: 1,
      name: 'Test Destination',
      description: 'Test Description',
      countryCode: 'US',
      type: DestinationType.City,
      lastModify: new Date()
    };

    mockDestinationService.getById.and.returnValue(of(destination)); // Configura el servicio para devolver un observable de destino

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.destination).toEqual(destination);
    expect(mockDestinationService.getById).toHaveBeenCalledWith(1);
  });
 
});
