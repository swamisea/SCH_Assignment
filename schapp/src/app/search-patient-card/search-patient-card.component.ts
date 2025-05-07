import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SearchServiceService, SearchRequest } from '../services/searchService/search-service.service';

@Component({
  selector: 'app-search-patient-card',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule] ,
  templateUrl: './search-patient-card.component.html',
  styleUrl: './search-patient-card.component.css'
})
export class SearchPatientCardComponent {

  constructor(private fb: FormBuilder, private searchService: SearchServiceService) {
    this.searchForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      dob: [''],
      startDate: [''],
      endDate: [''],
      mrn: [''],
      id: [''],
      ssn: [''],
      phone: [''],
      email: [''],
      hospital: ['']
    });
  }

  searchForm: FormGroup;
  activeTab: 'basic'|'advanced' = 'basic';

  selectTab(tab: 'basic'|'advanced') {
    this.activeTab = tab;
  }


  onSearch(){
    console.log(this.searchForm.value)
    const request = this.searchService.setSearchRequest(
      this.searchForm.value
    )
  }
}
