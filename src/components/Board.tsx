import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from './Column';
import { moveCard } from '../logic/cardMovement';
import { getBoardFromLocalStorage, saveBoardToLocalStorage } from '../utils/localStorage';
import { BoardType } from '../types/BoardTypes';

interface BoardProps {
    data: BoardType;
}

const Board: React.FC<BoardProps> = ({ data }) => {
    const [board, setBoard] = useState(getBoardFromLocalStorage(data));

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        try {
            const newBoard = moveCard(board, source, destination);
            setBoard(newBoard);
            saveBoardToLocalStorage(newBoard);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="board">
                <Column id="backlog" title="BACKLOG" tasks={board.backlog} />
                <Column id="todo" title="TODO" tasks={board.todo} />
                <Column id="doing" title="DOING" tasks={board.doing} />
                <Column id="done" title="DONE" tasks={board.done} />
            </div>
        </DragDropContext>
    );
};

export default Board;