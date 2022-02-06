import {Request, Response} from "express";
import fs from "fs"
import StatusCodes from "http-status-codes";
const {exec} = require("child_process");
const {BAD_REQUEST} = StatusCodes;

const run = async (req: Request, res: Response) => {
    exec( "mocha --timeout 10000 --require ts-node/register test/**/*_test.ts > report.txt", (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
    });

    res.send("run2")
}

const showTempReport = async (req: Request, res: Response) => {
    fs.readFile("report.txt", 'utf8', (err, data) => {
        if (err) res.status(BAD_REQUEST).send(data)
        res.status(200).send(data)
    });
}

export {run, showTempReport}
