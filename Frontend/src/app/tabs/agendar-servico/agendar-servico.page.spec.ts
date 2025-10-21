import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendarServicoPage } from './agendar-servico.page';

describe('AgendarServicoPage', () => {
  let component: AgendarServicoPage;
  let fixture: ComponentFixture<AgendarServicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
