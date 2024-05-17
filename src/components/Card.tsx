import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

interface CardProps {
    cardId: string;
    content: string;
    index: number;
}

const Card: React.FC<CardProps> = ({ cardId, content, index }) => {
    return (
        <Draggable draggableId={cardId} index={index}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
                >
                    {content}
                </div>
            )}
        </Draggable>
    );
};

export default Card;