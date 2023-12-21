const express = require("express");
// const { connection } = require("./db");
const app = express();
const fs = require("fs")

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("in home Page")
})

app.get("/clients", (req, res) => {
    const post = fs.readFileSync("db.json", "utf-8");
    console.log(post)
    const p_post = JSON.parse(post);
    const  client  = p_post;
    console.log(client);

    res.send(client)
})
app.post("/clients", (req, res) => {

    const {body:data}=req

    const pre_data=fs.readFileSync("db.json","utf-8");

    // parse the json object in object

    const { clients } = JSON.parse(pre_data);
    console.log(clients)
    clients.push(data)

    const latest_data=JSON.stringify({clients})

    console.log(latest_data)
    
    // add the new file into db.json
    fs.writeFileSync("db.json",latest_data,"utf-8")
    res.send(data)

})

app.get("/clients/:id", (req, res) => {
    const { id } = req.params;
    const post = fs.readFileSync("db.json", "utf-8");
    const p_post = JSON.parse(post);
    const clients = p_post.clients;
    const client = clients.find(c => c.id === parseInt(id));
  
    if (client) {
      res.send(client);
    } else {
      res.status(404).send("Client not found");
    }
  })

app.put("/clients/:id", (req, res) => {
    const { id } = req.params;
    const { body: updatedClient } = req;
    const pre_data = fs.readFileSync("db.json", "utf-8");
    const { clients } = JSON.parse(pre_data);
    const index = clients.findIndex(c => c.id === parseInt(id));
  
    if (index !== -1) {
      clients[index] = updatedClient;
      const latest_data = JSON.stringify({ clients });
      fs.writeFileSync("db.json", latest_data, "utf-8");
      res.send(updatedClient);
    } else {
      res.status(404).send("Client not found");
    }
  })


app.delete("/clients/:id", (req, res) => {
    const { id } = req.params;
    const pre_data = fs.readFileSync("db.json", "utf-8");
    const { clients } = JSON.parse(pre_data);
    console.log(clients)
    const index = clients.findIndex(c => c.id === parseInt(id));
  console.log("index",index)
    if (index !== -1) {
      const deletedClient = clients.splice(index, 1)[0];
      const latest_data = JSON.stringify({ clients });
      fs.writeFileSync("db.json", latest_data, "utf-8");
      res.send(deletedClient);
    } else {
      res.status(404).send("Client not found");
    }
  })


app.listen(5000, () => {


    // await connection;
    // console.log("Connection successful");


    console.log("Connected")
})