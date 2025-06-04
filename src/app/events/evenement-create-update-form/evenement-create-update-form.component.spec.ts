import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementCreateUpdateFormComponent } from './evenement-create-update-form.component';

describe('EvenementCreateUpdateFormComponent', () => {
  let component: EvenementCreateUpdateFormComponent;
  let fixture: ComponentFixture<EvenementCreateUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvenementCreateUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementCreateUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
