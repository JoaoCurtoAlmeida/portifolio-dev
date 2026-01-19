import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
  NgZone
} from '@angular/core';

@Component({
  selector: 'app-circulo',
  standalone: true,
  templateUrl: './circulo.progresso.component.html',
  styleUrls: ['./circulo.progresso.component.css']
})
export class CirculoProgressoComponent implements AfterViewInit {
  @Input() targetPercent = 0;
  @Input() duration = 1000; // ms

  @ViewChild('progressCircle', { static: true })
  progressCircle!: ElementRef<SVGCircleElement>;

  progress = 0;
  private radius = 20;
  private circumference = 2 * Math.PI * this.radius;
  private animated = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    const circle = this.progressCircle.nativeElement;
    circle.style.strokeDasharray = `${this.circumference}`;
    circle.style.strokeDashoffset = `${this.circumference}`;

    // Rodar fora da zona do Angular para performance
    this.ngZone.runOutsideAngular(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.animated) {
              this.ngZone.run(() => this.start());
              observer.unobserve(entry.target); // anima uma vez
            }
          });
        },
        { threshold: 0.5 } // 50% visível
      );

      observer.observe(circle);
    });
  }

  private start(): void {
    this.animated = true;
    this.animate();
  }

  private animate(): void {
    const startTime = performance.now();

    const animateFrame = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(elapsed / this.duration, 1);

      const realPercent = ratio * this.targetPercent;
      this.progress = Math.round(realPercent);

      const offset =
        this.circumference - (realPercent / 100) * this.circumference;
      this.progressCircle.nativeElement.style.strokeDashoffset = offset.toString();

      if (ratio < 1) {
        requestAnimationFrame(animateFrame);
      }
    };

    requestAnimationFrame(animateFrame);
  }
}
