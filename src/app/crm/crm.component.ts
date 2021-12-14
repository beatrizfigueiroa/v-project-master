import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css'],
  providers: [ {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },

  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})
export class CrmComponent implements OnInit {
  clientsName: string = "";
  salesDate: string = "";
  price: string = "";
  clientsOrigin: string = "";
  country: string = "";
  state: string = "";
  gender: string = "";
  age: string = "";
 
  enabled: boolean = false
  sales=[{
    clientsName : "",
    salesDate: "",
    price: "",
    clientsOrigin: "",
    country: "",
    state: "",
    gender: "",
    age: "",
  }]
  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  constructor() { }


  addSale(){
    this.enabled = !this.enabled
    if(this.clientsName&& this.salesDate&&this.price&&this.clientsOrigin&&this.country&&this.state&&this.gender&&this.age){
      this.sales.push( {clientsName: this.clientsName,
        salesDate:this.salesDate,
        price:this.price,
        clientsOrigin:this.clientsOrigin,
        country: this.country,
        state: this.state,
        gender: this.gender,
        age: this.age } );
    }
    this.clientsName="";
    this.salesDate="";
    this.price=""
    this.clientsOrigin="";
    this.country="";
    this.state="";
    this.gender="";
    this.age="";
  }

  ngOnInit(): void {
    $(document).ready(()=>{
      (<any>$('select')).formSelect();
    });
    $(document).ready(()=>{
      (<any>$('.datepicker')).datepicker();
    });

  }

}
