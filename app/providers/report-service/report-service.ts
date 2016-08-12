import { Injectable } from '@angular/core';
import {Platform, Alert, SqlStorage, Storage, LocalStorage} from 'ionic-angular';
import {SQLite} from 'ionic-native';
import {DatabaseService} from '../database-service/database-service';
import {LoginPage} from '../../pages/login/login';

import {MenuPage} from '../../pages/menu/menu';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

export class Report {
  line: string;
  site: string;
  agency: string;
  date : Date;
  id: number;
  constructor(title: string, site: string, agency: string, date: Date, id: number) {
    this.line = title;
    this.site = site;
    this.agency = agency;
    this.id = id;
  }
}

export class ReportService extends DatabaseService {


    public addReport(report, isSuccess, isError) {
        this.executeQuery("INSERT INTO reports (line,agence,site) VALUES (?, ?,?)",
            [report.line.title, report.agence.title,report.site.title],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                isError(error);
            });
    }
    public addPASA(pasa, isSuccess, isError) {
      console.log(pasa);
        this.executeQuery("INSERT INTO reports (line , agency ,site , author ,date,remonted_by ,function ,status ,type ,description , ent_pers_imp ,material_imp ,material ,type_report ,company_name ,risque_qualification ,zone ,image ,action , solution ,risk ,sub_risk) VALUES ( ? , ? ,? , ? ,?,? ,? ,? ,? ,? , ? ,? ,? ,? ,? ,? ,? ,? ,? , ? ,? ,?)",
            [pasa.line ,pasa.agency ,pasa.site ,pasa.author ,pasa.date,pasa.remonted_by ,pasa.fonction ,pasa.status ,pasa.type ,pasa.description ,pasa.ent_pers_imp ,pasa.material_imp ,pasa.material ,pasa.type_report ,pasa.company_name ,pasa.risque_qualification ,pasa.zone ,pasa.image ,pasa.action ,pasa.solution ,pasa.risk ,pasa.sub_risk],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                isError(error);
            });
    }
    public getID(isSuccess, isError) {
        this.executeQuery("SELECT * FROM reports ORDER BY id DESC LIMIT 1",
            [],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                isError(error);
            });
    }
    getReports(id,isSuccess, isError){
            this.executeQuery("Select * from pspa where idreport=?",[id],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                isError(error);
            });

       
    }
 
   getAllReports() {
   // this.executePromiseQuery("SELECT * FROM reports ORDER BY id DESC LIMIT 3",[]);
    return this.storage.query('SELECT * FROM reports DESC LIMIT 10');
  }
 
}
