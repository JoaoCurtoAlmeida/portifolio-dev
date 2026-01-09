import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-circulo',
  standalone: true,
  templateUrl: './circulo.progresso.component.html',
  styleUrl: './circulo.progresso.component.css'
})
export class CirculoProgressoComponent
  implements AfterViewInit, OnChanges {

  @Input() startAnimation = false;
  @Input() targetPercent = 0;
  @Input() duration = 0; // ms

  @ViewChild('progressCircle', { static: true })
  progressCircle!: ElementRef<SVGCircleElement>;

  progress = 0;

  private radius = 20;
  private circumference = 2 * Math.PI * this.radius;
  private animated = false;
  private viewReady = false;

  ngAfterViewInit(): void {
    const circle = this.progressCircle.nativeElement;
    circle.style.strokeDasharray = `${this.circumference}`;
    circle.style.strokeDashoffset = `${this.circumference}`;
    this.viewReady = true;

    if (this.startAnimation && !this.animated) {
      this.start();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['startAnimation']?.currentValue === true &&
      this.viewReady &&
      !this.animated
    ) {
      this.start();
    }
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

    // valor REAL (ex: 69.3482)
    const realPercent = ratio * this.targetPercent;

    // TEXTO (inteiro)
    this.progress = Math.round(realPercent);

    // CÍRCULO (float)
    const offset =
      this.circumference -
      (realPercent / 100) * this.circumference;

    this.progressCircle.nativeElement.style.strokeDashoffset =
      offset.toString();

    if (ratio < 1) {
      requestAnimationFrame(animateFrame);
    }
  };

  requestAnimationFrame(animateFrame);
}
}
