import { nanoid } from "nanoid";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Task, TasksProps } from "../types";

type Props = TasksProps & {

};


const ListScreen: React.FC<Props> = ({ tasks, setTasks , updateTaskCompletion}) => {

    const [newTaskLabel, setNewTaskLabel] = useState('');

    const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value);

    const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter" && newTaskLabel != '') {
            setTasks(tasks => [...tasks, { id: nanoid(), label: newTaskLabel, isComplete: false }])
            setNewTaskLabel('');
        }
    }

    const handleTaskCompleteChange = (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
        updateTaskCompletion(task.id, e.target.checked);
    };

    const handleClearClick = () => {
        setTasks(tasks => tasks.filter(task => !task.isComplete));
    }

    const handleTaskDeleteClick = (handledTask: Task) => () => {
        setTasks(tasks => tasks.filter(task => task.id != handledTask.id));
    }

    console.log(tasks);
    return (
        <div>
            <div>
                {tasks.map((task) => <div key={task.id}>
                    <input type="checkbox" defaultChecked={task.isComplete} onChange={handleTaskCompleteChange(task)}>
                    </input>
                    {task.label}
                    <button onClick={handleTaskDeleteClick(task)}>
                        delete
                    </button>
                </div>)}
            </div>
            <input value={newTaskLabel} onChange={handleNewTaskLabelChange} onKeyPress={handleNewTaskKeyPress}>
            </input>
            <div>
                <button onClick={handleClearClick}>Clear Completed</button>
            </div>

        </div>
    )

}

export default ListScreen;