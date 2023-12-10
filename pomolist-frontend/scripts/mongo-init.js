const dbName = "pomolist"; // process.env["POMOLIST_DB"];

db.createUser(
    {
        user: "devUser",  // process.env["POMOLIST_USERNAME"],
        pwd:  "testPassword", // process.env["POMOLIST_PASSWORD"],
        roles: [
            {
                role: "readWrite",
                db: dbName
            }
        ]
    }
);

db = new Monogo().getDB(dbName);