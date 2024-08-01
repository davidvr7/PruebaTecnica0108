import { Component, OnInit } from '@angular/core';
import { DestinationMockService } from '../../_services/destination-mock.service';
import { Module } from '../../_model/module.model';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  modules: Module[] = [];
  filteredModules: Module[] = [];
  searchTerm: string = '';

  constructor(private destinationService: DestinationMockService) {}

  ngOnInit(): void {
    this.destinationService.getModules().subscribe(modules => {
      this.modules = modules;
      this.filteredModules = modules;  
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredModules = this.modules.filter(module =>
        module.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredModules = this.modules;
    }
  }
}