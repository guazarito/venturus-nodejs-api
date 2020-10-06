var sqlite = require('sqlite-sync');

var database;

class Db{

    connect(){
        database = sqlite.connect('database/LibQuality.db');
    }

    createTableSearch(){
        sqlite.run(
        `
        CREATE TABLE IF NOT EXISTS
        SEARCH(
                ID  INTEGER PRIMARY KEY AUTOINCREMENT, 
                KEYWORD TEXT NOT NULL,
                USER_ID INTEGER NOT NULL,
                DATE DATETIME NOT NULL
            )
        `
        );
    }


    runQuery(query){
        try {
            var result;
            sqlite.run(query,function(res){
                if(res.error)
                    throw res.error;
                result = res;
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    insert(table, fields, values){
        this.runQuery(`insert into ${table} (${fields}) values (${values})`);
    }

}

module.exports = Db;