import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcardtvComponent } from './listcardtv.component';

describe('ListcardtvComponent', () => {
  let component: ListcardtvComponent;
  let fixture: ComponentFixture<ListcardtvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcardtvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcardtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
