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
}

        ]
    
}