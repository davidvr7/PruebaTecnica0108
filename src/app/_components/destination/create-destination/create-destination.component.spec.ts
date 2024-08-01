import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DestinationMockService } from 'src/app/_services/destination-mock.service';
import { CreateDestinationComponent } from './create-destination.component';

describe('CreateDestinationComponent', () => {
  let component: CreateDestinationComponent;
  let fixture: ComponentFixture<CreateDestinationComponent>;
  let mockDestinationService: jasmine.SpyObj<DestinationMockService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const destinationServiceSpy = jasmine.createSpyObj('DestinationMockService', ['create']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ CreateDestinationComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: DestinationMockService, useValue: destinationServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDestinationComponent);
    component = fixture.componentInstance;
    mockDestinationService = TestBed.inject(DestinationMockService) as jasmine.SpyObj<DestinationMockService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 5 controls', () => {
    expect(component.destinationForm.contains('name')).toBeTruthy();
    expect(component.destinationForm.contains('description')).toBeTruthy();
    expect(component.destinationForm.contains('countryCode')).toBeTruthy();
    expect(component.destinationForm.contains('type')).toBeTruthy();
    expect(component.destinationForm.contains('lastModify')).toBeTruthy();
  });

  it('should make the name control required', () => {
    const control = component.destinationForm.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the country code control required and have a length of 2 characters', () => {
    const control = component.destinationForm.get('countryCode');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    
    control?.setValue('A');
    expect(control?.valid).toBeFalsy();
    
    control?.setValue('ABC');
    expect(control?.valid).toBeFalsy();

    control?.setValue('AB');
    expect(control?.valid).toBeTruthy();
  });

  it('should submit the form if valid', () => {
    component.destinationForm.setValue({
      id: '1',
      name: 'Test Destination',
      description: 'Test Description',
      countryCode: 'US',
      type: 'Country',
      lastModify: '2023-01-01'
    });

    mockDestinationService.create.and.returnValue(of(true));

    component.submitForm();

    expect(mockDestinationService.create).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not submit the form if invalid', () => {
    component.destinationForm.setValue({
      id: '',
      name: '',
      description: '',
      countryCode: '',
      type: '',
      lastModify: ''
    });

    component.submitForm();

    expect(mockDestinationService.create).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
