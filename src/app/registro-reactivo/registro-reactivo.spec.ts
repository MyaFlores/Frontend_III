import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroReactivo } from './registro-reactivo';

describe('RegistroReactivo', () => {
  let component: RegistroReactivo;
  let fixture: ComponentFixture<RegistroReactivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroReactivo],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroReactivo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
