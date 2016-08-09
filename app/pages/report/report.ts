import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TranslatePipe, TranslateService, Parser} from "ng2-translate/ng2-translate";
import {MenuPage} from '../menu/menu';

@Component({
  templateUrl: 'build/pages/report/report.html',
  pipes: [TranslatePipe],
})
export class ReportPage {

submitted = false;
    report: { line?: string, agency?: string, site?: string } = {};
  constructor(private nav: NavController, private translate: TranslateService) {

  }
  addVFL(form){
 this.submitted = true;
 if (form.valid) {
  this.nav.push(MenuPage, { report: this.report });
  }
  }

addPASA(form){
 this.submitted = true;
 if (form.valid) {
  this.nav.push(MenuPage, { report: this.report });
  }
  }
}
