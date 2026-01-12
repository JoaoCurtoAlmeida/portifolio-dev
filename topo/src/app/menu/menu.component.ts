import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

 isOpen = false;
  activeItem: string = 'inicio';

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  setActive(item: string) {
    this.activeItem = item;

  }

}
