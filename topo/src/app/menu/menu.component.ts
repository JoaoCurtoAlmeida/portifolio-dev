import {
  Component, EventEmitter, Output, Input, OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnChanges{
  @Input() activeIndex = 0;
  @Output() navigate = new EventEmitter<number>();
  isOpen = false;

  scrollTo(sectionId: string) {
  const element = document.getElementById(sectionId);
  const headerOffset = 80; // altura do seu menu em px
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }


  }


  activeItem = 'inicio';
   private indexMap = ['inicio', 'sobre', 'habilidades', 'projetos', 'contato'];
  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeIndex']) {
      this.activeItem = this.indexMap[this.activeIndex];
    }
  }
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }



  setActive(item: string) {
    this.activeItem = item;

    const map: Record<string, number> = {
      inicio: 0,
      sobre: 1,
      habilidades: 2,
      projetos: 3,
      contato: 4
    };

    this.navigate.emit(map[item]);

  }
}



