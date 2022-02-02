import {Request, Response} from "express";

const {exec} = require("child_process");

const run = async (req: Request, res: Response) => {

    // exec("pwd", (error: any, stdout: any, stderr: any) => { > report.txt
    exec( "mocha --timeout 10000 --require ts-node/register test/**/*_test.ts > report.txt", (error: any, stdout: any, stderr: any) => {
    // exec("mocha --timeout 10000 --require ts-node/register test/1_all_offers.ts", (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.log(`error: ${error.message}`);
            // return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            // return;
        }
        console.log(`stdout: ${stdout}`);
    });

    res.send("run2")
}

export {run}
