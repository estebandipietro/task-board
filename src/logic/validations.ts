import { BoardType } from "../types/BoardTypes";

export const canMoveCard = (board: BoardType, sourceColumnId: string, destinationColumnId: string): { canMove: boolean, error: string } => {
    // Retrieve the source and destination columns from the board
    const sourceIndex = Object.keys(board).indexOf(sourceColumnId);
    const destinationIndex = Object.keys(board).indexOf(destinationColumnId);

    // Rule: Cards can only be moved by one column in any direction
    const columnDifference = Math.abs(sourceIndex - destinationIndex);
    if (columnDifference > 1) {
        return { canMove: false, error: 'Cards can only be moved by one column in any direction' };
    }

    // Rule: There can only be two cards in the DOING column at any time
    if (destinationColumnId === 'doing' && board[destinationColumnId].length >= 2) {
        return { canMove: false, error: 'There can only be two cards in the DOING column at any time' };
    }

    // Rule: Once in DONE, cards cannot go back
    if (sourceColumnId === 'done') {
        return { canMove: false, error: 'Once in DONE, cards cannot go back' };
    }

    // All rules passed, card can be moved
    return { canMove: true, error: '' };
};