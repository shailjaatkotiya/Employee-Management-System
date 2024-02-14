import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export type Employee = {
    Id: string,
    Name: string,
    BirthDate: string,
    Department: string,
    Experience: number,
}
type InitialState = {
    employees: Employee[],
}

const employee: Employee[] = [
    { Id: uuidv4(), Name: "Shailja", BirthDate: "1998-09-21", Department: "SD-2", Experience: 4 },
];
const initialState: InitialState = {
    employees: employee,
}

const employeeReducer = createSlice({
    name: "employee",
    initialState,
    reducers: {
        addEmp(state, action) {
            state.employees.push(action.payload);
        },
        editEmp(state, action) {
            const index = state.employees.findIndex((emp) => emp.Id === action.payload.Id);
            (index > -1) ? state.employees.splice(index, 1, action.payload) : alert('Employee Not Found');
        },
        deleteEmp(state, action) {
            return {
                employees: state.employees.filter((emp) => emp.Id !== action.payload)
            }
        },
    }

})

export default employeeReducer.reducer;
export const { addEmp, editEmp, deleteEmp } = employeeReducer.actions;