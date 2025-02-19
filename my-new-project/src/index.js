const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

if (!process.env.PORT) {
    throw new Error("No port configured");
}

const PORT = process.env.PORT;

app.get("/video", async (req, res) => {
    const videoPath = "./videos/SampleVideo_1280x720_1mb.mp4";
    const stats = await fs.promises.stat(videoPath);

    res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "video/mp4"
    });
    fs.createReadStream(videoPath).pipe(res);
});

app.listen(PORT);