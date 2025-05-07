import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPatientCardComponent } from './search-patient-card.component';

describe('SearchPatientCardComponent', () => {
  let component: SearchPatientCardComponent;
  let fixture: ComponentFixture<SearchPatientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPatientCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
