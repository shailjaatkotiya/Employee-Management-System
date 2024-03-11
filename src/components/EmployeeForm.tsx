import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { addEmp, editEmp } from "./EmployeeReducer";
import { v4 as uuidv4 } from 'uuid';

// This function is added to create a new employee and add to the list.
function AddEmployee() {

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [department, setDepartment] = useState("");
    const [experience, setExperience] = useState(4);
    const [isValid, setIsValid] = useState(true);

    const { Id } = useParams();
    const navigate = useNavigate();

    const employees = useAppSelector((state) => state.employees);
    const dispatch = useAppDispatch();

    useEffect(() => {
        Id ? setEditMode(true) : setEditMode(false);
        if (editMode) {
            const currentEmployee = employees.filter(
                (employee) => employee.Id == Id
            );

            const _birthDate = currentEmployee[0].BirthDate.substring(0, 10);
            setName(currentEmployee[0].Name);
            setBirthDate(_birthDate);
            setDepartment(currentEmployee[0].Department);
            setExperience(currentEmployee[0].Experience);
        }
    }, [editMode, employees]);

    function onSubmit() {
        if (name !== "" && birthDate !== "" && department !== "" && experience !== null) {
            const regex = /^[A-Z]+$/;
            setIsValid(regex.test(name));
            if (!isValid) {
                alert('Please enter a valid name containing only letters A-Z.')
            } else {
                const data = {
                    Id: uuidv4(),
                    Name: name,
                    BirthDate: birthDate,
                    Department: department,
                    Experience: experience,
                };
                dispatch(addEmp(data));
                navigate("/");
            }
        } else {
            alert("Please fill all fields");
        }
    }

    function onUpdate() {
        if (name !== "" && birthDate !== "" && department !== "" && experience !== null) {
            const data = {
                Id: Id,
                Name: name,
                BirthDate: birthDate,
                Department: department,
                Experience: experience,
            };
            dispatch(editEmp(data));
            navigate("/");
        } else {
            alert("Please fill all fields");
        }
    }

    return (
        <div className='Form'>
            <div className="Sub-Heading">
                {editMode ? (
                    <p>Edit Employee</p>
                ) : (
                    <p>Add Employee</p>
                )}
            </div>
            <div className="FormFields">
                <div className='Field'>
                    <label>Name : </label>
                    <input
                        type="text"
                        id="name"
                        placeholder=" Enter Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className='Field'>
                    <label htmlFor="birthDate">Birth Date : </label>
                    <input
                        type="Date"
                        id="birthDate"
                        placeholder=" Enter BirthDate"
                        value={birthDate}
                        onChange={(e) => {
                            setBirthDate(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className='Field'>
                    <label htmlFor="department">Department : </label>
                    <input
                        type="text"
                        id="department"
                        placeholder=" Enter Department"
                        value={department}
                        onChange={(e) => {
                            setDepartment(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className='Field'>
                    <label htmlFor="experience">Experience : </label>
                    <input
                        type="number"
                        id="experience"
                        placeholder=" Enter Experience"
                        value={experience}
                        pattern=""
                        onChange={(e) => {
                            setExperience(e.target.valueAsNumber);
                        }}
                    />
                </div>
            </div>
            <div>
                {editMode ? (
                    <button onClick={onUpdate}>
                        Update User
                    </button>
                ) : (
                    <button onClick={onSubmit}>
                        Add User
                    </button>
                )}
                <Link to="/">
                    <button>
                        Users List
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default AddEmployee;
