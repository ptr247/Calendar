import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";
import * as TaskController from "./TaskController.js";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";


configure({
    views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/" && request.method === "GET") {
        return await TaskController.viewAll();
    } else if (url.pathname === "/" && request.method === "POST") {
        return await TaskController.addItem(request);
    }
      
};

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

listenAndServe(`:${port}`, handleRequest);
//deno run --allow-read --allow-net --watch app.js