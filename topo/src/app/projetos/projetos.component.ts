import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { CardComponent } from './card/card.component';
import { EmptyComponent } from "./empty/empty.component";

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [CardComponent, EmptyComponent],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.css'
})
export class ProjetosComponent implements OnChanges {

  @Input() ativarCirculo = false;

  @Output() back = new EventEmitter<void>();

  // usado no template
  jaAtivou = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['ativarCirculo']?.currentValue === true &&
      !this.jaAtivou
    ) {
      this.jaAtivou = true;
    }
  }
}
