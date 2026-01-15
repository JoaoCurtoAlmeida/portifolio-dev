import { Component, Input } from '@angular/core';
import { CirculoProgressoComponent } from './circulo/circulo.progresso.component';
@Component({
  selector: 'app-card',
  imports: [CirculoProgressoComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

   @Input() ativarCirculo = false;

}
