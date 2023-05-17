// Initialize the database in your SQLite.js file
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("quotes.db"); // Database name

// Create the notes table if it doesn't exist
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, character TEXT, quote TEXT);",
    [],
    () => {
      console.log("Table created successfully");
    },
    (_, error) => {
      console.log("Error creating table:", error);
    }
  );
});

export default db;
