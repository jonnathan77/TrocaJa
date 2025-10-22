import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardapioDigitalPage } from './cardapio-digital.page';

describe('CardapioDigitalPage', () => {
  let component: CardapioDigitalPage;
  let fixture: ComponentFixture<CardapioDigitalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CardapioDigitalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
