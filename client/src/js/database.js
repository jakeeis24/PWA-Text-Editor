import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error("putDb not implemented");

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the db");

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);

  //create transaction ---specify db and data privileges
  const tx = jateDb.transaction("contact", "readonly");

  // open the desired object store
  const store = tx.objectStore("jate");

  //use .getALL() to get all data in db
  const request = store.getAll();

  //get confirmation of the req

  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
