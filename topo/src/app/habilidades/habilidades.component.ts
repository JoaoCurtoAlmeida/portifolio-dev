import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-habilidades',
  imports: [],
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.css'
})
export class HabilidadesComponent {
  @Output() back = new EventEmitter<void>();
}
