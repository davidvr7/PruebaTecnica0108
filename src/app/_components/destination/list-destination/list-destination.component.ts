import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Destination} from 'src/app/_model/destination'; 
import { DestinationMockService } from 'src/app/_services/destination-mock.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { DestinationType } from 'src/app/_model/destination.type.enum';
import { formatDate } from '@angular/common';
import Chart, { ChartData, ChartOptions, ChartType } from 'chart.js/auto';
 
@Component({
  selector: 'app-list-destination',
  templateUrl: './list-destination.component.html',
  styleUrls: ['./list-destination.component.css']
})
export class ListDestinationComponent implements OnInit {
  dataSource = new MatTableDataSource<Destination>();
  displayedColumns: string[] = ['id', 'name', 'description', 'countryCode', 'type', 'lastModify', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  destinationForm: FormGroup;
  currentDestination: Destination | null = null;
  deleteCurrentDestination : Destination | null = null;
  destinationTypes = Object.values(DestinationType);

  public chart: Chart | undefined

  constructor(
    private destinationService: DestinationMockService,
    private fb: FormBuilder
  ) {
    this.destinationForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      countryCode: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
      type: ['', Validators.required],
      lastModify: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadDestinations();

   
  }

  loadDestinations(): void {
    this.destinationService.getAll().pipe(
      catchError(error => {
        console.error('Error loading destinations:', error);
        return of([]);
      }),
      finalize(() => {
        console.log('Request complete');
        this.createChart();
      })
    ).subscribe(destinations => {
      this.dataSource.data = destinations;
    });
  }


  createChart(): void {
    if (!this.dataSource.data.length) {
      return;
    }

    const labels = this.dataSource.data.map(destination => destination.name);
    const dataValues = this.dataSource.data.map(destination => destination.population || 0); // Usa población para los datos

    const data: ChartData<'bar'> = {
      labels: labels,
      datasets: [{
        label: 'Population of Destinations',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo para las barras
        borderColor: 'rgb(75, 192, 192)', // Color de borde para las barras
        borderWidth: 1
      }]
    };

    const options: ChartOptions<'bar'> = {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    };

    if (this.chart) {
      this.chart.destroy(); // Limpia el gráfico anterior si ya existe
    }

    this.chart = new Chart<'bar'>("chart", {
      type: 'bar', // Tipo de gráfico como 'bar'
      data: data,
      options: options
    });
  } 



  deleteDestination(id: number | undefined): void {
    this.destinationService.deleteById(id).pipe(
      catchError(error => {
        console.error('Error deleting destination:', error); 
        return of(false);  
      }),
      finalize(() => console.log('Delete request complete'))  
    ).subscribe(success => {
      if (success) {
        this.loadDestinations();
        this.hideDeleteModal();
      }
    });
  }

  openDeleteModal(id: number): void {
    const destination = this.dataSource.data.find(d => d.id === id);   

    if (destination) {
      this.deleteCurrentDestination = destination;
    }
  }

  openUpdateModal(id: number): void {
    const destination = this.dataSource.data.find(d => d.id === id); 
    if (destination) {
      this.currentDestination = destination;

      // Formatear lastModify como string en formato 'yyyy-MM-dd'
      const formattedDate = formatDate(destination.lastModify, 'yyyy-MM-dd', 'en-US');
  
      // Crear un objeto destino clonado con lastModify como string formateado
      const destinationClone = { ...destination, lastModify: formattedDate };
  
      // Patchear el formulario con el objeto clonado
      this.destinationForm.patchValue(destinationClone);
    }
  }

  submitForm(): void {
    if (this.destinationForm.valid) {
      const destination = this.destinationForm.value as Destination;
      this.destinationService.update(destination).pipe(
        catchError(error => {
          console.error('Error updating destination:', error); 
          return of(false);  
        }),
        finalize(() => console.log('Update request complete'))  
      ).subscribe(success => {
        if (success) {
          this.loadDestinations();
          this.hideModal();
        }
      });
    }
  }

  hideModal(): void {
    const modalElement = document.getElementById('destinationModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.setAttribute('style', 'display: none;');
      document.body.classList.remove('modal-open');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }

  hideDeleteModal(): void {
    const modalElement = document.getElementById('destinationDeleteModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.setAttribute('style', 'display: none;');
      document.body.classList.remove('modal-open');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }
}
