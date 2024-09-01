#!/usr/bin/env node

import inquirer from "inquirer";

class Student {
  studentName: string;
  uniqueID: number;
  course: string;
  balance: number;
  pay: number;
  fees: number;

  constructor(
    studentName: string,
    uniqueID: number,
    course: string,
    balance: number,
    pay: number,
    fees: number
  ) {
    this.studentName = studentName;
    this.uniqueID = uniqueID;
    this.course = course;
    this.balance = balance;
    this.pay = pay;
    this.fees = fees;
  }

  showStatus() {
    console.log(`\n----Status of ${this.studentName}----`);
    console.log(`Name: ${this.studentName}`);
    console.log(`ID No: ${this.uniqueID}`);
    console.log(`Course: ${this.course}`);
    console.log(`Fees/Month: ${this.fees}`);
    console.log(`Payed: ${this.pay == this.fees ? "Yes" : "No"}`);
    console.log(`Balance: ${this.balance}`);
  }

  showBalance() {
    console.log(`\n----Balance of ${this.studentName}----`);
    console.log(`Balance: ${this.balance}`);
  }
}

const students: Student[] = [];

let studentName = " ";
let uniqueID = 100000;
let course = " ";
let fees = 1;

let value = true;
do {
  let StuMSys = await inquirer.prompt({
    name: "Start",
    message: "\n what would you like to do?",
    type: "list",
    choices: ["enroll", "viewBalance", "payTutionFees", "showStatus", "exit"],
  });
  if (StuMSys.Start == "enroll") {
    let askName = await inquirer.prompt([
      {
        name: "Ask",
        message: "\n Enter your name",
        type: "input",
      },
      {
        name: "Ask2",
        message: "\n Which course would you like to enroll in?",
        type: "list",
        choices: ["English Language", "Cooking", "Art"],
      },
    ]);

    if (askName.Ask.trim() === "") {
      console.log("\n Enter your name first!");
    } else {
      let cornform = await inquirer.prompt({
        name: "Ask3",
        message: `\n ${askName.Ask}, are you sure you want to enroll in ${askName.Ask2}`,
        type: "confirm",
        default: true,
      });

      if (cornform.Ask3) {
        function enroll() {
          studentName = askName.Ask.trim();
          uniqueID = ++uniqueID;
          course = askName.Ask2;
          if (askName.Ask2 == "English Language") {
            fees = 1500;
          } else if (askName.Ask2 == "Cooking") {
            fees = 2000;
          } else if (askName.Ask2 == "Art") {
            fees = 3000;
          } else {
            console.log("404 not found!");
          }
          console.log(
            `Name: ${studentName}\n`,
            `Student ID: ${uniqueID}\n`,
            `Course: ${course}\n`,
            `Fees(Monthly): ${fees}\n`
          );
          const newStudent = new Student(
            studentName,
            uniqueID,
            course,
            fees,
            0,
            fees
          );
          students.push(newStudent);
        }
        enroll();
      } else {
        console.log("\n Enrollment Cancelled!");
      }
    }
  } else if (StuMSys.Start == "viewBalance") {
    let show = await inquirer.prompt([
      {
        name: "select",
        message: "\n To see certain student balance enter there Enrollment No.",
        type: "number",
      },
    ]);

    let search = students.find((stu) => stu.uniqueID == show.select);
    if (search) {
      search.showBalance();
    } else {
      console.log(`\n Student not found!`);
    }
  } else if (StuMSys.Start == "showStatus") {
    let show = await inquirer.prompt([
      {
        name: "select",
        message: "\n To see your student status enter your Enrollment No.",
        type: "number",
      },
    ]);

    let search = students.find((stu) => stu.uniqueID == show.select);
    if (search) {
      search.showStatus();
    } else {
      console.log("\n 404 Not founded!");
    }
  } else if (StuMSys.Start == "payTutionFees") {
    let pay = await inquirer.prompt({
      name: "PayNow",
      message: "\n To pay your fees, Enter your ID No:",
      type: "number",
    });

    let search = students.find((stu) => stu.uniqueID == pay.PayNow);
    if (search) {
      let paynow = await inquirer.prompt({
        name: "Enter",
        message: `\n Enter your fees, your fees is ${search.fees}, you need to pay ${search.balance}`,
        type: "number",
      });

      if (paynow.Enter <= 0) {
        console.log(
          `\n ${search.studentName}, you need to enter amount to pay fees`
        );
      } else if (paynow.Enter > search.balance) {
        console.log(
          `\n ${search.studentName},You entered extra amount, your fees is "${search.fees}", but you need to pay now "${search.balance}"`
        );
      } else {
        search.balance -= paynow.Enter;
        search.pay += paynow.Enter;

        console.log(`\n Your remaining balance: ${search.balance}.`);

        if (search.balance <= 0) {
          console.log(`You have fully paid your fees!`);
        } else {
          console.log(`Remember to pay the remaining fees!`);
        }
      }
    } else {
      console.log(`\n Student not found!`);
    }
  }
  if (StuMSys.Start == "exit") {
    value = false;
  } else {
    value;
  }
} while (value);
