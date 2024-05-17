import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from './Column';
import { moveCard } from '../logic/cardMovement';
import { getBoardFromLocalStorage, saveBoardToLocalStorage } from '../utils/localStorage';

const Board: React.FC = () => {
    const initialBoard = {
        backlog: [
            { id: '1', content: 'Task 1' },
            { id: '2', content: 'Task 2' },
        ],
        todo: [
            { id: '3', content: 'Task 3' },
            { id: '4', content: 'Task 4' },
        ],
        doing: [
            { id: '5', content: 'Task 5' },
        ],
        done: [
            { id: '6', content: 'Task 6' },
        ],
    };
    const [board, setBoard] = useState(getBoardFromLocalStorage(initialBoard));
    const [error, setError] = useState<string | null>(null);

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const { newBoard, error } = moveCard(board, source, destination);

        if (error) {
            setError(error);
        } else if (newBoard) {
            setBoard(newBoard);
            saveBoardToLocalStorage(newBoard);
            setError(null);
        }
    };

    const handleReset = () => {
        saveBoardToLocalStorage(initialBoard);
        setBoard(initialBoard);
    };

    return (
        <>
            {error && <div className="error">{error}</div>}
            <button onClick={handleReset}>Reset Board</button>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="board">
                    <Column id="backlog" title="BACKLOG" tasks={board.backlog} />
                    <Column id="todo" title="TODO" tasks={board.todo} />
                    <Column id="doing" title="DOING" tasks={board.doing} />
                    <Column id="done" title="DONE" tasks={board.done} />
                </div>
            </DragDropContext>
        </>
    );
};

export default Board;