import { Component } from '@angular/core';
import { CardContatoComponent } from "./card-contato/card-contato.component";

@Component({
  selector: 'app-contato',
  imports: [CardContatoComponent],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

}
