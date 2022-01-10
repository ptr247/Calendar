import { Client } from "https://deno.land/x/postgres@v0.13.0/mod.ts";

const client = new Client({
    hostname: "hostname-possibly-at-elephantsql.com",
    database: "database-name",
    user: "user-name-typically-same-as-database-name",
    password: "password",
    port: 5432,
});
  

const executeQuery = async (query, ...args) => {
    const response = {};
    try {
      await client.connect();
      const result = await client.queryObject(query, ...args);
      if (result && result.rows) {
        response.rows = result.rows;
      }
    } catch (e) {
      response.error = e;
    } finally {
      try {
        await client.end();
      } catch (e) {
        console.log(e);
      }
    }
  
    return response;
};

export { executeQuery };