abstract class Department {
  static fiscalYear = 2020;
  protected employees: string[] = [];

  static createEmployee(name: string) {
    return { name: name };
  }

  constructor(protected readonly id: string, public name: string) {}

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT"); // ベースクラスのコンストラクタ呼び出し
    this.admins = admins; // thisを使うには、その前にsuperキーワードを使用していないといけない
  }

  describe() {
    console.log("IT部門 - ID: " + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("レポートが見つかりません。");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("正しい値を設定してください。");
    }
    this.addReport(value);
  }

  describe() {
    console.log("会計部門 - ID: " + this.id);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (this.instance) {
      // AccountingDepartment.instance と同義
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  addEmployee(name: string): void {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }
}
const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment("d1", ["Max"]);

// it.addEmployee("Max");
// it.addEmployee("Manu");

it.describe();
// it.printEmployeeInformation();

// console.log(it);

const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
console.log(accounting, accounting2);

accounting.mostRecentReport = "通気会計レポート";
accounting.addReport("Something");
console.log(accounting.mostRecentReport);

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };

// accountingCopy.describe();
