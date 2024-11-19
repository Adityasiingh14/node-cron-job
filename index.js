const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cron = require("node-cron");
const { makeRequest, makeRequestWithAuth } = require("./service");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const externalURL = process.env.EXTERNAL_URL;
const selfURL = process.env.SELF_URL;
const cronTime = process.env.CRON_TIME;
const externalURLAuthToken = process.env.AUTH_TOKEN;

cron.schedule(cronTime, async () => {
    console.log(`Current Time: ${new Date().toUTCString()}`);
    const externalURLData = await makeRequestWithAuth(externalURL, externalURLAuthToken);
    console.log(externalURLData);
    const selfURLData = await makeRequest(selfURL);
    console.log(selfURLData);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

