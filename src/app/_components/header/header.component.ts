import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLightMode: boolean = false;

  ngOnInit(): void {
    this.applyTheme();
  }

  toggleTheme(event: any): void {
    this.isLightMode = event.checked;
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isLightMode) {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }
  }
}
