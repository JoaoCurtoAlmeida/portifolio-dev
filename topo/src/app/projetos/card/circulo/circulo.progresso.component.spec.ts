import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CirculoProgressoComponent } from './circulo.progresso.component';

describe('CirculoProgressoComponent', () => {
  let component: CirculoProgressoComponent;
  let fixture: ComponentFixture<CirculoProgressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirculoProgressoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirculoProgressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
