import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { deleteEmp } from "./EmployeeReducer";

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

    const onDelete = (Id: string) => {
        dispatch(deleteEmp(Id));
        navigate(`/`);
    };

    const onEdit = (Id: string) => {
        navigate(`/edit/${Id}`);
    };

    return (
        <>
            <div>
                <div>
                    <div>EmployeeList</div>
                    <div>
                        <button onClick={() => navigate("/add")}>Add Employee</button>
                    </div>
                </div>
                <hr />
                <div>
                    <ul>
                        {employees.map((employee, index) => {
                            return (
                                <li key={index}>
                                    {employee.Id} <button onClick={() => onEdit(employee.Id)}> Edit </button>
                                    <button onClick={() => onDelete(employee.Id)}> Delete </button><br />
                                    Name : {employee.Name} <br />
                                    Birthdate : {employee.BirthDate} <br />
                                    Department : {employee.Department} <br />
                                    Experience : {employee.Experience} <br />
                                    <hr />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default EmployeeList;
