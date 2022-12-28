interface Employee {
    uniqueId: number;
    name: string;
    subordinates: Employee[];
}

interface IEmployeeOrgApp {
    ceo: Employee;
    /**
    * Moves the employee with employeeID (uniqueId) under a supervisor
    (another employee) that has supervisorID (uniqueId).
    * E.g. move Bob (employeeID) to be subordinate of Georgina
    (supervisorID). * @param employeeID
    * @param supervisorID
    */
    move(employeeID: number, supervisorID: number): void;
    /** Undo last move action */
    undo(): void;
    /** Redo last undone action */
    redo(): void;
    /** add action */
    add(name: string): Employee;
}

interface EmployeeContainer {
    [uniqueId: number]: Employee;
}

interface EmployeeMoveLog {
    employeeID: number;
    oldSupervisorID?: number;
    oldSubordinatesIDs: number[];
    supervisorID: number;
}

class EmployeeOrgApp implements IEmployeeOrgApp {
    autoIncrement = 1;
    ceo: Employee;
    private _employees: EmployeeContainer = {}

    /** logs of move action */
    private _logs: EmployeeMoveLog[] = [];
    private _logIndex = 0;

    constructor(ceo: Employee) {
        this.ceo = ceo;
        this.ceo.uniqueId = this.autoIncrement++;

        /** indexing entire employees by their uniqueId */
        this._employees[this.ceo.uniqueId] = ceo;
    }

    add(name: string, supervisorID?: number) {
        const newEmployee: Employee = {
            uniqueId: this.autoIncrement++,
            name,
            subordinates: []
        }
        if (supervisorID && this._employees[supervisorID]) {
            this._employees[supervisorID].subordinates.push(newEmployee);
        }
        this._employees[newEmployee.uniqueId] = newEmployee;

        return newEmployee;
    }

    move(employeeID: number, supervisorID: number): void {
        const employee = this._employees[employeeID];
        const oldSupervisor = this._getSupervisor(employeeID);
        if (oldSupervisor) {
            /** remove current employee from old supervisor */
            const newSubordinates = oldSupervisor.subordinates.filter(_employee => _employee.uniqueId !== employee.uniqueId);

            /** add subordinates of current employee to old supervisor */
            newSubordinates.push(...employee.subordinates);
            oldSupervisor.subordinates = newSubordinates;
        }

        const supervisor = this._employees[supervisorID];
        /** move current employee from old supervisor to new supervisor */
        supervisor.subordinates.push(employee);

        /** create log of move action */
        const log: EmployeeMoveLog = {
            employeeID,
            oldSupervisorID: oldSupervisor?.uniqueId,
            oldSubordinatesIDs: employee.subordinates.map(({ uniqueId }) => uniqueId),
            supervisorID,
        }

        /** remove subordinates from current employee */
        employee.subordinates = [];
        this._logs[this._logIndex++] = log;
    }

    _getSupervisor(employeeID: number) {
        for (const uniqueId in this._employees) {
            const supervisor = this._employees[uniqueId];
            for (let i = 0, c = supervisor.subordinates.length; i < c; i++) {
                const employee = supervisor.subordinates[i];
                if (employee.uniqueId === employeeID) return supervisor;
            }
        }
    }

    undo(): void {
        if (this._logIndex > 0) {
            const log = this._logs[--this._logIndex];
            const supervisor = this._employees[log.supervisorID];
            const prevEmployee = this._employees[log.employeeID];
            if (log.oldSupervisorID) {
                const oldSupervisor = this._employees[log.oldSupervisorID];
                /** remove previous employee's subordinates from old supervisor */
                oldSupervisor.subordinates = oldSupervisor.subordinates.filter(subordinate => log.oldSubordinatesIDs.indexOf(subordinate.uniqueId) === -1);

                /** add previous employee to old supervisor */
                oldSupervisor.subordinates.push(prevEmployee);
            }
            const subordinates = log.oldSubordinatesIDs.map(uniqueId => this._employees[uniqueId]);

            /** reset prev employee's subordinates */
            prevEmployee.subordinates = subordinates;
            
            /** remove prev employee from his current supervisor */
            supervisor.subordinates = supervisor.subordinates.filter(subordinate => subordinate.uniqueId !== log.employeeID);
        }
    }
    redo(): void {
        if (this._logIndex < this._logs.length) {
            const log = this._logs[this._logIndex++];
            this.move(log.employeeID, log.supervisorID);
        }
    }
}

const ceo: Employee = {
    uniqueId: 1,
    name: 'Mark Zuckerberg',
    subordinates: [],
}

const orgApp = new EmployeeOrgApp(ceo);
