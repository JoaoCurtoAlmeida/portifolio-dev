import {Component,Input} from '@angular/core';

import { CardComponent } from './card/card.component';
import { EmptyComponent } from "./empty/empty.component";

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [CardComponent, EmptyComponent],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.css'
})
export class ProjetosComponent {
  @Input() ativarCirculo = false;

}
