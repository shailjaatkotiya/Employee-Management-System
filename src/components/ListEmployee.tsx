import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { deleteEmp } from "./EmployeeReducer";
import './style.css'
// This function will list out all the employees added in the state
function EmployeeList() {
    let employees = useAppSelector((state) => state.employees);
    employees = employees.map((e) => {
        console.log(e)
        return {
            ...e,
            BirthDate:
                new Date(e.BirthDate).getDate() +
                "-" +
                new Date(e.BirthDate).getMonth() +
                "-" +
                new Date(e.BirthDate).getFullYear(),
        };
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const confirmDelete = (id: string) => {   
        let deleteObj = window.confirm('Are you sure you want to delete employee') 
        if(deleteObj){onDelete(id)};
      };

    // On detele from the reducer will be called to delete the employee
    const onDelete = (Id: string) => {
        dispatch(deleteEmp(Id));
        navigate(`/`);
    };

    // on edit from the reducer will be called to edit the employee
    // It will navigate to edit page to edit the employee
    const onEdit = (Id: string) => {
        navigate(`/edit/${Id}`);
    };

    return (
        <div className='root'>
            <h1 className="Main-Heading">Employee Management System</h1>
            <div className='Main'>
                <div className="List">
                    <div className="Sub-Heading">EmployeeList</div>
                </div>
                <div className="ListRow">
                    <ul>
                        {employees.map((employee, index) => {
                            return (
                                <li key={index}>
                                    {index + 1}.) {employee.Name}<br/>
                                    Birthdate : {employee.BirthDate} <br />
                                    Department : {employee.Department} <br />
                                    Experience : {employee.Experience} <br />
                                    <button onClick={() => onEdit(employee.Id)}> Edit </button>
                                    <button onClick={() => confirmDelete(employee.Id)}> Delete </button><br />
                                </li>
                            );
                        })}
                    </ul>
                    <div>
                        <button id="AddEmp" onClick={() => navigate("/add")}>Add Employee</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;
