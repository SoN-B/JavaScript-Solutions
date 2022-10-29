/**
 * 시간 PM/AM 형식으로 입력받아 24시간제로 변경
 * 단, 12:00:00AM 은 24시간제에서 00:00:00이고,
 * 12:00:00PM은 24시간제에서 12:00:00이다.
 */

"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on("end", function () {
    inputString = inputString.split("\n");

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s) {
    let time_format = s.substr(8, 2);
    // AM or PM

    let hour_s = s.substr(0, 2);
    let hour_n = Number(hour_s);

    let minute = s.substr(3, 2);
    let second = s.substr(6, 2);

    if (time_format === "PM" && hour_n !== 12) {
        hour_n += 12;
    } else if (time_format === "AM" && hour_n === 12) {
        hour_n -= 12;
    }

    if (hour_n < 10) {
        let result = `0${hour_n}:${minute}:${second}`;
        return result;
    } else {
        let result = `${hour_n}:${minute}:${second}`;
        return result;
    }

    // const timeArr = s.split(":");
    // const time = {
    //   hrs: timeArr[0], //07
    //   min: timeArr[1], //05
    //   sec: timeArr[2].slice(0,2),//45
    //   timeFormat: timeArr[2].slice(2,4)
    // };
    // if(time.timeFormat === "PM" && parseInt(time.hrs) != 12){
    //   time.hrs = String(parseInt(time.hrs) + 12);
    // } else if(time.timeFormat === "AM" && parseInt(time.hrs) == 12){
    //   time.hrs = "00";
    // }
    // let time24 = `${time.hrs}:${time.min}:${time.sec}`;
    // return time24
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
