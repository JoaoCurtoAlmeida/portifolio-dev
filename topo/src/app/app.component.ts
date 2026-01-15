import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LenisService } from './core/lenis.service';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './inicio/inicio.component';
import { ContatoComponent } from './contato/contato.component';
import { SobreComponent } from './sobre/sobre.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { ProjetosComponent } from './projetos/projetos.component';

@Component({
  selector: 'app-root',
  imports: [
    InicioComponent,
    MenuComponent,
    ContatoComponent,
    SobreComponent,
    HabilidadesComponent,
    ProjetosComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // corrigido
})
export class AppComponent implements AfterViewInit {

  @ViewChild('habilidadesSection', { static: true })
  habilidadesSection!: ElementRef<HTMLElement>;

  // ------------------------
  // Variáveis
  // ------------------------
  readonly MOBILE_BREAKPOINT = 915;
  startX: number = 0;
  currentIndex: number = 0;
  totalSections: number = 5;
  ativarCirculo: boolean = false;

  constructor(private lenisService: LenisService) {}

  // ------------------------
  // Angular Lifecycle
  // ------------------------
  ngAfterViewInit(): void {
    this.lenisService.init();

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

  // ------------------------
  // Métodos Swipe
  // ------------------------
  isMobile(): boolean {
    return window.matchMedia(`(max-width: ${this.MOBILE_BREAKPOINT}px)`).matches;
  }

  onTouchStart(event: TouchEvent) {
    if (!this.isMobile()) return;
    this.startX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.isMobile()) return;

    const endX = event.changedTouches[0].clientX;
    const diff = this.startX - endX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0 && this.currentIndex < this.totalSections - 1) {
      this.currentIndex++; // desliza para frente
    } else if (diff < 0 && this.currentIndex > 0) {
      this.currentIndex--; // desliza para trás
    }
  }

  // ------------------------
  // Navegação
  // ------------------------
  goToSection(index: number) {
    this.currentIndex = index;
    if (index === 3) this.ativarCirculo = true;
  }

  goBack() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // ------------------------
  // Computed
  // ------------------------
  get transform(): string {
    return `translateX(-${this.currentIndex * 100}vw)`;
  }
}
