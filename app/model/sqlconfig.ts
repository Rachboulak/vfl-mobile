/**
 * Class initialistion database
 */
export class SQLConfig {
     
        
/**table configuration */
static SQL_TABLES=[
            
//tables users
{
   name:"users",
   create:`CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
   created_on datetime default current_timestamp, updated_by varchar(255), updated_on datetime,
   active BOOLEAN DEFAULT true,removed BOOLEAN DEFAULT false, username TEXT, password TEXT,lastname TEXT, firstname TEXT)`,
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
   created_on datetime default current_timestamp, updated_by varchar(255), updated_on datetime,
   active BOOLEAN DEFAULT true,removed BOOLEAN DEFAULT false,
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
   created_on datetime default current_timestamp, updated_by varchar(255), updated_on datetime,
   active BOOLEAN DEFAULT true,removed BOOLEAN DEFAULT false,
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
   created_on datetime default current_timestamp, updated_by varchar(255), updated_on datetime,
   active BOOLEAN DEFAULT true,removed BOOLEAN DEFAULT false,
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
   created_on datetime default current_timestamp, updated_by varchar(255), updated_on datetime,
   active BOOLEAN DEFAULT true,removed BOOLEAN DEFAULT false,
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
   created_on datetime default current_timestamp, updated_by varchar(255), updated_on datetime,
   active BOOLEAN DEFAULT true,removed BOOLEAN DEFAULT false,
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
   created_on datetime default current_timestamp, updated_by varchar(255), updated_on datetime,
   active BOOLEAN DEFAULT true,removed BOOLEAN DEFAULT false,
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
   created_on datetime default current_timestamp, updated_by varchar(255), updated_on datetime,
   active BOOLEAN DEFAULT true,removed BOOLEAN DEFAULT false,
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
   create:`CREATE TABLE IF NOT EXISTS sites (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
   created_on datetime default current_timestamp,
    updated_by varchar(255), updated_on datetime,
   active BOOLEAN DEFAULT true,removed BOOLEAN DEFAULT false, 
   label TEXT, description TEXT,id_agency INTEGER,
   CONSTRAINT fk_PerLines FOREIGN KEY (id_agency) REFERENCES agencies(id))`,
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
   create:`CREATE TABLE IF NOT EXISTS reports (id INTEGER PRIMARY KEY AUTOINCREMENT,
   created_on datetime default current_timestamp, updated_by varchar(255), updated_on datetime,
   active BOOLEAN DEFAULT true,removed BOOLEAN DEFAULT false,
    id_product_line INTEGER,
    id_agency INTEGER,id_site INTEGER, id_author INTEGER,date DATE,remonted_by VARCHAR(100),
    id_function INTEGER, id_status INTEGER,type VARCHAR(100),description TEXT,
     ent_pers_imp BOOLEAN,material_imp BOOLEAN,material TEXT,type_report VARCHAR(30),
     company_name VARCHAR(100),risque_qualification INTEGER,id_zone INTEGER,
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
              `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum` ,
               true ,false ,'material' ,'pasa' ,'company' ,1 ,1 ,
              `[\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAHgCAYAAADUjLREAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4AQUEDEIJMv72gAAAAZiS0dEAP8A/wD/oL2nkwAAJqJJREFUeNrt3Ql8HHd99/GsJN/3fSZxnJscEEISW5pTkp3DtnZWchJiJ5DYQHkCtA1HSQJNk4bS0tACfVpaoKEHECi08JQ+DbQcgUIf2gJPCFBIHB+xcWI7iW/Hpyz395/5rb1azczO6rBW1uf9ev1esqWVdnb2P9/5z8x//nvWWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCgCzy7XqpZ6mWpQ1J7pfYMYh2Q2if18cCzJp5p6/u+tasmST0qtVdqv9SeQSyzDIekXrp/7arFD61dVccWgWEWgH5D4DlLJXB2Sp2QOi7VOUhlnrtLg/hRqUlnYABOlnpM6ohUl9Rxqc5BKvPcJ6RelgBsIgAxHANQeoDuEgmbXRqAtVCHz+AAnKIBeFjDpxbKBKBFAGIYBqBjDoFbCcDTGoCf1x5gLQUgPUAM23OABCABSACCACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUCAACQACUAQgAQgAUgAggAkAAlAAhAEIAFIAAIEIAFIAAIEIAFIAAIEIAFIAAIEIAFIAAIEIAFIAAIEIAFIAAIEIAFYIQAnE4AAAThcA3CSBuBhAhAgAHsdgO+96/acbLx1971lVf19bw6rrobLLF/u3jWrTQ/wMXqAAAHY6wC8942rTZiY82lN971pVbOUX+NlltEsqyfL/A2pYwQgQAD2KgBlo22QapZ6RupFqe1S22q4tpd8PVRD4UcAggAcggE4QqpV6vkaC5OhWAQgCMAh2ANskdpEgBGAwHANwOcIMAIQIAApAhAgACkCECAAKQIQIAApAhAgACkCECAAKQIQBCABSBGAIAAJQAKQAAQBSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABSAASgAABGBOAzQQgAQgM5x7gliESMl0EIEAA9lcA1ks1Sn1fQ/A5rc01WsXl2yS1nwAECMBeB+D7196Wk412ioZgq/YGW/SwuBbLLJuj//6m1DECECAAexWAZT3BhvfWeN0bVd29a1ZPluV9TOoIAQgQgH0KwKFGwqYYgIcJQIAAHG4BaA7bP08PECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACEBh6AfiXUhMJQAIQGG4BeEjq01JTpEZKjRrkGh249siCa+cIQIAAHOg6JoHzhHy9XWqV1Buk7hikMs99pyxPQWocAQgQgKejjkjtqZHaJ+G3TmoeAQgQgMOvXHuz1HwCECAAh2MAPksPECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACECAACUACEAQgAUgAEoAgACkCEBheAbhEaidBRwCyRWA4BuBSeoAVA3CT1Px+CMDJUl+UOlZDAbhTAtB+cO2qerYIDCt51zEB6Es9K7VD6nmqR22X8PtPqTl9D8DVkyRwPim1VeoFqecHuXZIrXvf2lWL6AFi2LnphsW5FUsaJ8hGfrnUlVRM+fYV8vUiqRF9Xd/3r7297v61q8+R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\",\"data:image/gif;base64,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\"]` ,
              `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.` ,
               `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
               ,1 ,1]
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