/**
 * Class initialistion database
 */
export class SQLConfig {
     
        
/**table configuration */
static SQL_TABLES=[
            
//tables users
{
   name:"users",
   create:"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT,lastname TEXT, firstname TEXT)",
   lines:[
          {
              script:"INSERT INTO users (username, password,lastname,firstname) VALUES (?, ?,?,?)",
              params:["admin", "123","Global","Admin"]
          }
   ]
},
//table sites
{
   name:"sites",
   create:"CREATE TABLE IF NOT EXISTS sites (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, value TEXT)",
   lines:[
          {
              script:"INSERT INTO sites (title, value) VALUES (?, ?)",
              params:["Site 1", "Site 1"]
          },{
              script:"INSERT INTO sites (title, value) VALUES (?, ?)",
              params:["Site 2", "Site 2"]
          },{
              script:"INSERT INTO sites (title, value) VALUES (?, ?)",
              params:["Site 3", "Site 3"]
          }
   ]
},
//table PRODUCT_LINES
{
   name:"product_lines",
   create:"CREATE TABLE IF NOT EXISTS product_lines (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, value TEXT)",
   lines:[
          {
              script:"INSERT INTO product_lines (title, value) VALUES (?, ?)",
              params:["Ligne 1", "Ligne 1"]
          },{
              script:"INSERT INTO product_lines (title, value) VALUES (?, ?)",
              params:["Ligne 2", "Ligne 2"]
          } ,{
              script:"INSERT INTO product_lines (title, value) VALUES (?, ?)",
              params:["Ligne 3", "Ligne 3"]
          }
   ]
},
//table AGENCIES
{
   name:"agencies",
   create:"CREATE TABLE IF NOT EXISTS agencies (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, value TEXT)",
   lines:[
          {
              script:"INSERT INTO agencies (title, value) VALUES (?, ?)",
              params:["agence1", "Agence 1"]
          },{
              script:"INSERT INTO agencies (title, value) VALUES (?, ?)",
              params:["Agence 2", "Agence 2"]
          } ,{
              script:"INSERT INTO agencies (title, value) VALUES (?, ?)",
              params:["Agence 3", "Agence 3"]
          }
   ]
},
//table REPORT
{
   name:"reports",
   create:"CREATE TABLE IF NOT EXISTS reports (id INTEGER PRIMARY KEY AUTOINCREMENT, line VARCHAR(100), agency VARCHAR(100),site VARCHAR(100), author VARCHAR(100),date DATE,remonted_by VARCHAR(100),function VARCHAR(100), status VARCHAR(100),type VARCHAR(100),description TEXT, ent_pers_imp BOOLEAN,material_imp BOOLEAN,material TEXT,type_report VARCHAR(30),company_name VARCHAR(100),risque_qualification VARCHAR(30),zone VARCHAR(100), image TEXT,action TEXT, solution TEXT,risk VARCHAR(100),sub_risk VARCHAR(100))",
   lines:[
          {
              script:"INSERT INTO reports (line , agency ,site , author ,date,remonted_by ,function ,status ,type ,description , ent_pers_imp ,material_imp ,material ,type_report ,company_name ,risque_qualification ,zone ,image ,action , solution ,risk ,sub_risk) VALUES ( ? , ? ,? , ? ,?,? ,? ,? ,? ,? , ? ,? ,? ,? ,? ,? ,? ,? ,? , ? ,? ,?)",
              params:['line1' , 'agency1' ,'site1' , 'author' ,'2013-02-03','remonted_by' ,'function' ,'status' ,'anomalie' ,'description' , true ,true ,'material' ,'pasa' ,'company' ,'red' ,'zone1' ,'image' ,'action' , 'solution' ,'risk' ,'sub_risk']
          }
   ]
}
/*,
//table PASA
{
   name:"pasa",
   create:"CREATE TABLE IF NOT EXISTS pasa (id INTEGER PRIMARY KEY AUTOINCREMENT, site TEXT, author TEXT,date DATE,remontedBy TEXT,fonction TEXT, status TEXT,type TEXT,description TEXT, entpersimplicated BOOLEAN,materialimplicated BOOLEAN,idreport INTEGER, CONSTRAINT fk_PerOrders FOREIGN KEY (idreport) REFERENCES reports(id))",
   lines:[
          {
              script:"INSERT INTO pasa (site, author ,date ,remontedBy ,fonction , status ,type ,description , entpersimplicated ,materialimplicated ,idreport) VALUES (?, ? ,'1993-01-02' ,? ,? , ? ,? ,? , ? ,? ,?)",
              params:['Casablanca', 'author'  ,'Admin' ,'Administrator' , 'status' ,'Anomalie' ,'description' , true ,false ,1]
          }
   ]
}*/

        ]
    
}