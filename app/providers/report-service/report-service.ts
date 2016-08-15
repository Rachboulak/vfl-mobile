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
        this.executeQuery(`INSERT INTO reports (id_product_line , id_agency ,
        id_site , id_author ,date,remonted_by ,id_function ,id_status ,type ,
        description , ent_pers_imp ,material_imp ,material ,type_report ,
        company_name ,risque_qualification ,zone ,image ,action , solution,
        id_risk ,id_sub_risk)
         VALUES ( ? , ? ,? , ? ,?,? ,? ,? ,? ,? , ? ,? ,? ,? ,? ,? ,? ,? ,? , ? ,? ,?)`,
            [pasa.line.id ,pasa.agency.id ,pasa.site.id ,pasa.author.id ,pasa.date,pasa.remonted_by ,pasa.fonction ,pasa.status ,pasa.type ,pasa.description ,pasa.ent_pers_imp ,pasa.material_imp ,pasa.material ,pasa.type_report ,pasa.company_name ,pasa.risque_qualification ,pasa.zone ,pasa.image ,pasa.action ,pasa.solution ,pasa.risk ,pasa.sub_risk],
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
     public getProductLines(isSuccess, isError) {
        this.executeQuery("SELECT id,label FROM product_lines",
            [],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                isError(error);
            });
    }
    public getAgenciesByProductLineID(id_product_line,isSuccess, isError) {
        this.executeQuery("SELECT id,label FROM agencies where id_product_line= ?",
            [id_product_line],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                isError(error);
            });
    }
    public getSitesByAgencyID(id_agency,isSuccess, isError) {
        this.executeQuery("SELECT id,label FROM sites where id_agency= ?",
            [id_agency],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                isError(error);
            });
    }

    public getStatues(isSuccess, isError) {
        this.executeQuery("SELECT id,label FROM status",
            [],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                isError(error);
            });
    }
    public getRisks(isSuccess, isError) {
        this.executeQuery("SELECT id,label FROM risks",
            [],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                isError(error);
            });
    }

    public getSubRisksByRiskID(id_risk,isSuccess, isError) {
        this.executeQuery("SELECT id,label FROM sub_risks where id_risk= ?",
            [id_risk],
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

    getFunctions(isSuccess, isError){
            this.executeQuery("Select id,label from functions",[],
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
