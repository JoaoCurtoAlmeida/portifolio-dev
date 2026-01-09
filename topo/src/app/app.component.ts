import { Component, AfterViewInit, ViewChild, ElementRef, ApplicationConfig } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './inicio/inicio.component';
import { ContatoComponent } from "./contato/contato.component";
import { SobreComponent } from '../app/sobre/sobre.component';
import { HabilidadesComponent } from '../app/habilidades/habilidades.component';
import { ProjetosComponent } from '../app/projetos/projetos.component';


@Component({
  selector: 'app-root',
  imports: [InicioComponent, MenuComponent,
    ContatoComponent,
    SobreComponent,
    HabilidadesComponent,
    ProjetosComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements AfterViewInit {

  @ViewChild('habilidadesSection', { static: true })
  habilidadesSection!: ElementRef<HTMLElement>;

  ativarCirculo = false;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.ativarCirculo = true;
          observer.disconnect(); // executa apenas uma vez
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(this.habilidadesSection.nativeElement);
  }
}
