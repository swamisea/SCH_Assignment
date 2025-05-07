import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SearchServiceService, SearchRequest } from '../services/searchService/search-service.service';
import { Subscription } from 'rxjs';

interface Patient {
  fname: string;
  lname: string;
  photoUrl: string;
  dob: string;
  sex: string;
  residence: string;
  mrn: string;
  idNumber: string;
  ssnLast4: string;
  phone: string;
  email: string;
  hospital: string;
  dept: string;
  physician: string;
  conditions: string;
  nextApptDate: string;
  nextApptTime: string;
}

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {

  constructor(private searchSvc: SearchServiceService) {}

  private sub!: Subscription;

  todayString: string = this.getTodaysDate()
  activeTab: 'todays'|'search' = 'todays';
  searchResult: Patient[] = []
  todaysResult: Patient[] = []
  patients: Patient[] = [
    {
      fname: 'Natasha',
      lname: 'Romanoff',
      photoUrl: 'https://i.pinimg.com/564x/0e/d5/e8/0ed5e8ce2b93ffd8ed178023727e5731.jpg',
      dob: '1958-02-07',
      sex: 'Female',
      residence: 'San Francisco, CA',
      mrn: 'YTK12345678',
      idNumber: 'NHL12345678',
      ssnLast4: '9238',
      phone: '(213)-372-3926',
      email: 'natashar@email.com',
      hospital: 'San Francisco Medical Group',
      dept: 'Department of Endocrinology',
      physician: 'Dr. Beth Smith',
      conditions: 'Diabetes (Type II)',
      nextApptDate: '2025-05-07',
      nextApptTime: '9:00 am'
    },
    {
      fname: 'Ashley',
      lname: 'Citarella',
      photoUrl: 'https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg',
      dob: '1967-04-19',
      sex: 'Female',
      residence: 'Boston, MA',
      mrn: 'YTK12345677',
      idNumber: 'NHL12345677',
      ssnLast4: '3948',
      phone: '(314)-485-3672',
      email: 'ashcitarella@email.com',
      hospital: 'Massachusetts Medical Group',
      dept: 'Department of Cardiology',
      physician: 'Dr. Mark Wahlberg',
      conditions: 'COPD, CHF',
      nextApptDate: '2025-05-08',
      nextApptTime: '9:00 am'
    },
    {
      fname: 'Carlton',
      lname: 'McKinsey',
      photoUrl: 'https://vivifyintegrativehealth.com/wp-content/uploads/2017/02/44813671_m.jpg',
      dob: '1989-03-10',
      sex: 'Male',
      residence: 'Los Angeles, CA',
      mrn: 'YTK12345676',
      idNumber: 'NHL12345676',
      ssnLast4: '3245',
      phone: '(213)-829-8945',
      email: 'carlmck@email.com',
      hospital: 'Los Angeles Medical Group',
      dept: 'Department of Cardiology',
      physician: 'Dr. Carl Urban',
      conditions: 'COPD',
      nextApptDate: '2025-05-07',
      nextApptTime: '10:00 am'
    },
    {
      fname: 'Hugh',
      lname: 'Grant',
      photoUrl: 'https://st.depositphotos.com/1011643/4430/i/450/depositphotos_44309759-stock-photo-young-indian-man-outdoors.jpg',
      dob: '1999-12-23',
      sex: 'Male',
      residence: 'San Jose, CA',
      mrn: 'YTK12345675',
      idNumber: 'NHL12345675',
      ssnLast4: '2388',
      phone: '(213)-829-8947',
      email: 'hughgrant@email.com',
      hospital: 'San Jose Medical Group',
      dept: 'Department of Cardiology',
      physician: 'Dr. Carl Urban',
      conditions: 'COPD',
      nextApptDate: '2025-05-07',
      nextApptTime: '11:00 am'
    },
    {
      fname: 'Jason',
      lname: 'Bourne',
      photoUrl: 'https://img.freepik.com/free-photo/smiling-man_1098-15443.jpg',
      dob: '1992-12-12',
      sex: 'Male',
      residence: 'San Diego, CA',
      mrn: 'YTK12345674',
      idNumber: 'NHL12345674',
      ssnLast4: '2389',
      phone: '(213)-829-8954',
      email: 'jbourne@email.com',
      hospital: 'San Diego Medical Group',
      dept: 'Department of Cardiology',
      physician: 'Dr. Carl Urban',
      conditions: 'CHF',
      nextApptDate: '2025-05-10',
      nextApptTime: '10:00 am'
    },
    {
      fname: 'John',
      lname: 'Doe',
      photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-501272-1222271.jpg&fm=jpg',
      dob: '1999-12-31',
      sex: 'Male',
      residence: 'San Jose, CA',
      mrn: 'YTK12345673',
      idNumber: 'NHL12345673',
      ssnLast4: '2388',
      phone: '(213)-829-8944',
      email: 'johndoe@email.com',
      hospital: 'San Jose Medical Group',
      dept: 'Department of Cardiology',
      physician: 'Dr. Lewis Hamilton',
      conditions: 'CHF',
      nextApptDate: '2025-05-08',
      nextApptTime: '10:00 am'
    }]

    ngOnInit() {
      this.sub = this.searchSvc.searchRequest
        .subscribe((req: SearchRequest) => {
          console.log('Got new search request:', req);
          this.searchResult = this.filterPatients(req);
          this.todaysResult = this.filterTodaysPatients(this.getTodaysDate())
          console.log("Here is the search result: ", this.searchResult)
          console.log("Here is the todays result: ", this.todaysResult)
        }); 
      }

    filterPatients(patient: SearchRequest): Patient[]{
      return this.patients.filter(p =>
        (p.fname && p.fname == patient.firstName)
        || (p.lname && p.lname == patient.lastName)
        || (p.dob && p.dob === patient.dob)
        || (p.nextApptDate && (p.nextApptDate >= patient.startDate && p.nextApptDate <= patient.endDate))
        || (p.mrn && p.mrn == patient.mrn)
        || (p.idNumber && p.idNumber == patient.id)
        || (p.ssnLast4 && p.ssnLast4 == patient.ssn)
        || (p.phone && p.phone == patient.phone)
        || (p.email && p.email == patient.email)
        || (p.hospital && p.hospital == patient.hospital)
      );
    }

    filterTodaysPatients(date: String): Patient[]{
      return this.patients.filter(p =>
        (p.nextApptDate == date)
      );
    }

    getTodaysDate():string{
      const today = new Date()
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`
    }

    selectTab(tab: 'todays'|'search') {
      this.activeTab = tab;
    }
}
