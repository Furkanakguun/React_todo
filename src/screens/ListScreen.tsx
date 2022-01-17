import React, { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import styled from "styled-components";
import Spacer from "../components/Spacer";
import TextButton from "../components/TextButton";
import useTaskStore from "../hooks/use-task-store";
import { Task, TasksProps } from "../types";



const Container = styled.div`
    display: flex;
    width: 4 60px;
    flex-direction:  column;
    align-items: stretch;
`;

const List = styled.div`
    background: rgba(255,255,255,0.1);
    border-radius:15px;
`;

const Input = styled.input`
    background: rgba(0,0,0,0.5);
    color: aliceblue;
    border-radius: 15px;
    border: none;
    padding: 20px 24px;
`;


type Props = {

};


const ListScreen: React.FC<Props> = () => {
    const { addTask, tasks, setTasks, updateTaskCompletion } = useTaskStore();


    const [newTaskLabel, setNewTaskLabel] = useState('');

    const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value);

    const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter" && newTaskLabel != '') {
            addTask({ label: newTaskLabel });
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

        <Container>
            <List>
                <Spacer height={30}></Spacer>
                <div>
                    {tasks.map((task) => (
                        <div key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isComplete}
                                onChange={handleTaskCompleteChange(task)}>
                            </input>{' '}
                            {task.label}
                            <button onClick={handleTaskDeleteClick(task)}>
                                delete
                            </button>
                        </div>
                    ))}
                </div>
            </List>
            <Spacer height={30}></Spacer>
            <Input value={newTaskLabel} onChange={handleNewTaskLabelChange} onKeyPress={handleNewTaskKeyPress}>
            </Input>
            <Spacer height={45}></Spacer>
            <TextButton onClick={handleClearClick}>Clear Completed</TextButton>

        </Container>

    )

}

export default ListScreen;