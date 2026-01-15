import { Injectable } from '@angular/core';
import Lenis from '@studio-freight/lenis';

@Injectable({ providedIn: 'root' })
export class LenisService {
  private lenis!: Lenis;

  init() {
    this.lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    const raf = (time: number) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }

  scrollTo(target: string | HTMLElement) {
    this.lenis.scrollTo(target);
  }
}
