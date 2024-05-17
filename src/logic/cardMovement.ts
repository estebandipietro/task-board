import { DraggableLocation } from '@hello-pangea/dnd';
import { BoardType } from '../types/BoardTypes';
import { canMoveCard } from './validations';

export const moveCard = (board: BoardType, source: DraggableLocation, destination: DraggableLocation): BoardType => {
    if (canMoveCard(board, source.droppableId, destination.droppableId)) {
        const newBoard = { ...board };
        const { droppableId: sourceColumnId, index: sourceIndex } = source;
        const { droppableId: destinationColumnId, index: destinationIndex } = destination;
        const [removed] = newBoard[sourceColumnId as keyof BoardType].splice(sourceIndex, 1);
        newBoard[destinationColumnId as keyof BoardType].splice(destinationIndex, 0, removed);
        return newBoard;
    } else {
        throw new Error('Invalid move');
    }
};