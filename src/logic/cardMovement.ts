import { DraggableLocation } from '@hello-pangea/dnd';
import { BoardType } from '../types/BoardTypes';
import { canMoveCard } from './validations';

export const moveCard = (board: BoardType, source: DraggableLocation, destination: DraggableLocation): {
    newBoard?: BoardType,
    error?: string
} => {
    const canMoveResult = canMoveCard(board, source.droppableId, destination.droppableId)
    if (canMoveResult.canMove) {
        const newBoard = { ...board };
        const { droppableId: sourceColumnId, index: sourceIndex } = source;
        const { droppableId: destinationColumnId, index: destinationIndex } = destination;
        const [removed] = newBoard[sourceColumnId as keyof BoardType].splice(sourceIndex, 1);
        newBoard[destinationColumnId as keyof BoardType].splice(destinationIndex, 0, removed);
        return { newBoard };
    } else {
        return { error: canMoveResult.error };
    }
};