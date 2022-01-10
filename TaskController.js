import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as TaskService from "./TaskService.js";


const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};


const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
        status: 303,
        headers: {
          "Location": path,
        },
    });
};


const addItem = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
  
    await TaskService.create(name);
  
    return redirectTo("/");
};

const viewAll = async () => {
    let mondaydate = TaskService.setToMonday(new Date());
    let weekdays = [mondaydate];
    for (let i = 0; i < 4; i++){
        week.push((new Date(mondaydate)).setHours(24 * (i + 1)))
    }
    let fridaydate = week[4];
    const data = {
      weekdays,
      //week: await TaskService.findAll(mondaydate, fridaydate),
    };
  
    return new Response(await renderFile("calendar.eta", data), responseDetails);
};

export { addItem, viewAll };