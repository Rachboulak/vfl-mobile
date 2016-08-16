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
//table zones
{
   name:"zones",
   create:`CREATE TABLE IF NOT EXISTS zones (id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT, description TEXT)`,
   lines:[
          {
              script:"INSERT INTO zones (label, description) VALUES (?, ?)",
              params:["Casablanca", "Casablanca"]
          },{
              script:"INSERT INTO zones (label, description) VALUES (?, ?)",
              params:["Rabat", "Rabat"]
          } ,{
              script:"INSERT INTO zones (label, description) VALUES (?, ?)",
              params:["Tanger", "Tanger"]
          }
   ]
},
//table FUNCTIONS
{
   name:"functions",
   create:`CREATE TABLE IF NOT EXISTS functions (id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT, description TEXT)`,
   lines:[
          {
              script:"INSERT INTO functions (label, description) VALUES (?, ?)",
              params:["Agent", "agent"]
          },{
              script:"INSERT INTO functions (label, description) VALUES (?, ?)",
              params:["Administrateur", "Administrateur"]
          } ,{
              script:"INSERT INTO functions (label, description) VALUES (?, ?)",
              params:["Manager", "Manager"]
          }
   ]
},
//table Status
{
   name:"status",
   create:`CREATE TABLE IF NOT EXISTS status (id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT, description TEXT)`,
   lines:[
          {
              script:"INSERT INTO status (label, description) VALUES (?, ?)",
              params:["Lafarge", "Lafarge"]
          },{
              script:"INSERT INTO status (label, description) VALUES (?, ?)",
              params:["Fournisseur", "Fournisseur"]
          } ,{
              script:"INSERT INTO status (label, description) VALUES (?, ?)",
              params:["Transporteur", "Transporteur"]
          }
   ]
},
//table RISKS
{
   name:"risks",
   create:`CREATE TABLE IF NOT EXISTS risks (id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT, description TEXT)`,
   lines:[
          {
              script:"INSERT INTO risks (label, description) VALUES (?, ?)",
              params:["Production", "Production"]
          },{
              script:"INSERT INTO risks (label, description) VALUES (?, ?)",
              params:["Destruction", "Destruction"]
          } ,{
              script:"INSERT INTO risks (label, description) VALUES (?, ?)",
              params:["Humaines", "Humaines"]
          }
   ]
},
//table SUB_RISKS
{
   name:"sub_risks",
   create:`CREATE TABLE IF NOT EXISTS sub_risks (id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT, description TEXT,id_risk INTEGER,
   CONSTRAINT fk_idrisks FOREIGN KEY (id_risk) REFERENCES risks(id))`,
   lines:[
          {
              script:"INSERT INTO sub_risks (label, description,id_risk) VALUES (?, ?, ?)",
              params:["Arret temporaire de production", "Arret temporaire de production",1]
          },{
              script:"INSERT INTO sub_risks (label, description,id_risk) VALUES (?, ?, ?)",
              params:["Reduction de la quantité de production", "Reduction de la quantité de production",1]
          } ,{
              script:"INSERT INTO sub_risks (label, description,id_risk) VALUES (?, ?, ?)",
              params:["Reduction de la qualité", "Reduction de la qualité",1]
          },
          {
              script:"INSERT INTO sub_risks (label, description,id_risk) VALUES (?, ?, ?)",
              params:["Production", "Production",2]
          },{
              script:"INSERT INTO sub_risks (label, description,id_risk) VALUES (?, ?, ?)",
              params:["Matériels", "Matériels",2]
          } ,{
              script:"INSERT INTO sub_risks (label, description,id_risk) VALUES (?, ?, ?)",
              params:["Matériels et production", "Matériels et production",2]
          }
   ]
},
//table PRODUCT_LINES
{
   name:"product_lines",
   create:`CREATE TABLE IF NOT EXISTS product_lines (id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT, description TEXT)`,
   lines:[
          {
              script:"INSERT INTO product_lines (label, description) VALUES (?, ?)",
              params:["Bétons", "bétons"]
          },{
              script:"INSERT INTO product_lines (label, description) VALUES (?, ?)",
              params:["Granulats", "Granulats"]
          } ,{
              script:"INSERT INTO product_lines (label, description) VALUES (?, ?)",
              params:["Ciment", "Ciment"]
          }
   ]
},
//table AGENCIES
{
   name:"agencies",
   create:`CREATE TABLE IF NOT EXISTS agencies (id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT, description TEXT,id_product_line INTEGER,
    CONSTRAINT fk_PerLines FOREIGN KEY (id_product_line) REFERENCES product_lines(id))`,
   lines:[
          {
              script:"INSERT INTO agencies (label, description,id_product_line) VALUES (?, ?, ?)",
              params:["Casablanca", "Casablanca",1]
          },{
              script:"INSERT INTO agencies (label, description,id_product_line) VALUES (?, ?, ?)",
              params:["Rabat", "Rabat",1]
          } ,{
              script:"INSERT INTO agencies (label, description,id_product_line) VALUES (?, ?, ?)",
              params:["Tanger", "Tanger",1]
          },
          {
              script:"INSERT INTO agencies (label, description,id_product_line) VALUES (?, ?, ?)",
              params:["Casablanca", "Casablanca",2]
          },{
              script:"INSERT INTO agencies (label, description,id_product_line) VALUES (?, ?, ?)",
              params:["Eljadida", "Eljadida",2]
          } ,{
              script:"INSERT INTO agencies (label, description,id_product_line) VALUES (?, ?, ?)",
              params:["Tanger", "Tanger",2]
          }
   ]
},
//table sites
{
   name:"sites",
   create:"CREATE TABLE IF NOT EXISTS sites (id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT, description TEXT,id_agency INTEGER,CONSTRAINT fk_PerLines FOREIGN KEY (id_agency) REFERENCES agencies(id))",
   lines:[
          {
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Central à Béton Mouhammedia", "Central à Béton Mouhammedia",1]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Central à Béton Bouskoura", "Central à Béton Bouskoura",1]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Central à Béton Ain Sebaa", "Central à Béton Ain Sebaa",1]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Central à Béton Rabat", "Central à Béton Rabat",2]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Central à Béton Agdal", "Central à Béton Agdal",2]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Central à Béton Temara", "Central à Béton Temara",2]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Site de Tétouan", "Site de Tétouan",3]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Site de Tanger", "Site de Tanger",3]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Central à Béton Tanger", "Central à Béton Tanger",3]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Usine Bouskoura", "Usine Bouskoura",4]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Usine Mouhammedia", "Usine Mouhammedia",4]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Centre de distribution Khouribga", "Centre de distribution Khouribga",4]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Usine Eljadida", "Usine Eljadida",5]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Usine Safi", "Usine Safi",5]
          },{
              script:"INSERT INTO sites (label, description,id_agency) VALUES (?, ?, ?)",
              params:["Centre de distribution Safi", "Centre de distribution Safi",5]
          }
   ]
},
//table REPORT
{
   name:"reports",
   create:`CREATE TABLE IF NOT EXISTS reports (id INTEGER PRIMARY KEY AUTOINCREMENT, id_product_line INTEGER,
    id_agency INTEGER,id_site INTEGER, id_author INTEGER,date DATE,remonted_by VARCHAR(100),
    id_function INTEGER, id_status INTEGER,type VARCHAR(100),description TEXT,
     ent_pers_imp BOOLEAN,material_imp BOOLEAN,material TEXT,type_report VARCHAR(30),
     company_name VARCHAR(100),risque_qualification VARCHAR(30),id_zone INTEGER,
      image TEXT,action TEXT, solution TEXT,id_risk INTEGER,id_sub_risk INTEGER,
      CONSTRAINT fk_idlines FOREIGN KEY (id_product_line) REFERENCES product_lines(id),
      CONSTRAINT fk_IDagencies FOREIGN KEY (id_agency) REFERENCES agencies(id),
      CONSTRAINT fk_IDsites FOREIGN KEY (id_site) REFERENCES sites(id),
      CONSTRAINT fk_IDauthor FOREIGN KEY (id_author) REFERENCES users(id),
      CONSTRAINT fk_IDfunction FOREIGN KEY (id_function) REFERENCES functions(id),
      CONSTRAINT fk_Irisk FOREIGN KEY (id_risk) REFERENCES risks(id),
      CONSTRAINT fk_IDstatus FOREIGN KEY (id_status) REFERENCES status(id),
      CONSTRAINT fk_IDsubrisk FOREIGN KEY (id_sub_risk) REFERENCES sub_risks(id),
      CONSTRAINT fk_IDzone FOREIGN KEY (id_zone) REFERENCES zones(id))`,
   lines:[
          {
              script:`INSERT INTO reports (id_product_line , id_agency ,id_site ,
               id_author ,date,remonted_by ,id_function ,id_status ,type ,description ,
                ent_pers_imp ,material_imp ,material ,type_report ,company_name ,
                risque_qualification ,id_zone ,image ,action , solution ,id_risk ,id_sub_risk)
                 VALUES ( ? , ? ,? , ? ,?,? ,? ,? ,? ,? , ? ,? ,? ,? ,? ,? ,? ,? ,? , ? ,? ,?)`,

              params:[1 ,1,1 ,1 ,'2013-02-03','remonted_by' ,1 ,1 ,'anomalie' ,
              'description' , true ,true ,'material' ,'pasa' ,'company' ,'red' ,1 ,
              'image' ,'action' , 'solution' ,1 ,1]
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