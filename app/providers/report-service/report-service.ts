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
    this.date=date;
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
      console.log(JSON.stringify(pasa));
        this.executeQuery(`INSERT INTO reports (id_product_line , id_agency ,
        id_site , id_author ,date,remonted_by ,id_function ,id_status ,type ,
        description , ent_pers_imp ,material_imp ,material ,type_report ,
        company_name ,risque_qualification ,id_zone ,image ,action , solution,
        id_risk ,id_sub_risk)
         VALUES ( ? , ? ,? , ? ,?,? ,? ,? ,? ,? , ? ,? ,? ,? ,? ,? ,? ,? ,? , ? ,? ,?)`,
            [pasa.line.id ,pasa.agency.id ,pasa.site.id ,pasa.author.id ,
            pasa.date,pasa.remonted_by ,pasa.fonction ,pasa.status.id ,pasa.type ,
            pasa.description ,pasa.ent_pers_imp ,pasa.material_imp ,
            pasa.material ,"PA/SA" ,pasa.company_name ,
            pasa.risque_qualification ,pasa.zone ,pasa.image ,pasa.action ,
            pasa.solution ,pasa.risk ,pasa.sub_risk],
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

    public getZones(isSuccess, isError) {
        this.executeQuery("SELECT id,label FROM zones",
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
 
   getAllReports(isSuccess) {
       this.executeQuery(`SELECT DISTINCT r.*,r.created_on created_on, r.id id,r.date date,
        s.label site, a.label agency,l.label line

        FROM reports r
        left join sites s on r.id_site=s.id
        left join agencies a on r.id_agency=a.id
        left join product_lines l on r.id_product_line=l.id

        ORDER BY created_on DESC LIMIT 3
        `,[],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                console.log("Error getting reports",error);
            });
   // this.executePromiseQuery("SELECT * FROM reports ORDER BY id DESC LIMIT 3",[]);
    //return this.storage.query('SELECT * FROM reports DESC LIMIT 10');
  }
  getReportById(idReport,isSuccess) {
      console.log("idreport:",idReport);
       this.executeQuery(`SELECT r.*, r.id id,r.id reportID,r.date date,
        s.label site, a.label agency,l.label line,f.label fonction,
        st.label status,u.*,risk.label risk,sr.label sub_risk,z.label zone

        FROM reports r  
         left join sites s on r.id_site=s.id
         left join agencies a on r.id_agency=a.id
         left join product_lines l on r.id_product_line=l.id
         left join functions f on r.id_function=f.id
         left join status st on r.id_status=st.id
         left join users u on r.id_author=u.id
         left join risks risk on r.id_risk=risk.id
         left join sub_risks sr on r.id_sub_risk=sr.id
         left join zones z on r.id_zone=z.id

        where r.id=?
      ;
        `,[idReport],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                console.log("Error getting report by id",error);
            });
   // this.executePromiseQuery("SELECT * FROM reports ORDER BY id DESC LIMIT 3",[]);
    // return this.storage.query('SELECT * FROM reports DESC LIMIT 10');
  }
 
     getAll(isSuccess, isError){
            this.executeQuery("SELECT * FROM reports DESC LIMIT 3",[],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                isError(error);
            });
    }

    load(start, end, isSuccess, isError) {
    console.log('#####start = '+ start, '#####end = '+end);
    //return this.storage.query('SELECT * FROM reports DESC LIMIT ' + start + ', ' + end);
    this.executeQuery('SELECT r.id id,r.date date,s.label site, a.label agency,l.label line' +
        ' FROM reports r,sites s,agencies a,product_lines l' +
        ' where r.id_site=s.id AND r.id_agency=a.id'+
        ' AND r.id_product_line=l.id'+
        ' Limit '+start+' , '+end
        ,[],
            (data) => {
                console.log("load getting reports"+JSON.stringify(data));
                isSuccess(data);
            }, (error) => {
                console.log("load Error getting reports"+JSON.stringify(error));
                isError(error);
            });
            
  }
        firstLoad(start, end) {
    console.log('#####start = '+ start, '#####end = '+end);
    //return this.storage.query('SELECT * FROM reports DESC LIMIT ' + start + ', ' + end);
    return this.executePromiseQuery('SELECT r.id id,r.date date,s.label site, a.label agency,l.label line' +
        ' FROM reports r,sites s,agencies a,product_lines l' +
        ' where r.id_site=s.id AND r.id_agency=a.id'+
        ' AND r.id_product_line=l.id'+
        ' Limit '+start+' , '+end
        ,[]);
  }
}
