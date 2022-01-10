import { executeQuery } from "./database.js";

const create = async (name) => {
  await executeQuery("INSERT INTO tasks (name) VALUES ($1);", name);
};

const findAll = async () => {
  let result = await executeQuery(
    "SELECT * FROM tasks WHERE completed = false;",
  );
  return result.rows;
};

const setToMonday = (date) => {
    var day = date.getDay() || 7;  
    if( day !== 1 ) {
        date.setHours(-24 * (day - 1)); 
    }
    return date;
};




export { create, findAll, setToMonday };
