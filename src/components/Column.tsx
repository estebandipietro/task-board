import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Task } from '../types/BoardTypes';
import Card from './Card';

interface ColumnProps {
    id: string;
    title: string;
    tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ id, title, tasks }) => {
    return (
        <div className="column">
            <h2>{title}</h2>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks?.map((task, index) => (
                            <Card key={task.id} cardId={task.id} content={task.content} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;