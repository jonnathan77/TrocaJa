import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesOficinaPage } from './detalhes-oficina.page';

describe('DetalhesOficinaPage', () => {
  let component: DetalhesOficinaPage;
  let fixture: ComponentFixture<DetalhesOficinaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesOficinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
