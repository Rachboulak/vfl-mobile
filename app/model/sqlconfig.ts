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
   create:"CREATE TABLE IF NOT EXISTS reports (id INTEGER PRIMARY KEY AUTOINCREMENT, line TEXT, agence TEXT,site TEXT)",
   lines:[
          {
              script:"INSERT INTO reports (line,agence,site) VALUES (?, ?,?)",
              params:["Granulat", "Usine Casablanca", "Casablanca"]
          }
   ]
},
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
}

        ]
    
}