import { BoardType } from "../types/BoardTypes";

export const canMoveCard = (board: BoardType, sourceColumnId: string, destinationColumnId: string): boolean => {
    // Retrieve the source and destination columns from the board
    const sourceIndex = Object.keys(board).indexOf(sourceColumnId);
    const destinationIndex = Object.keys(board).indexOf(destinationColumnId);

    // Rule: Cards can only be moved by one column in any direction
    const columnDifference = Math.abs(sourceIndex - destinationIndex);
    if (columnDifference > 1) {
        return false;
    }

    // Rule: There can only be two cards in the DOING column at any time
    if (destinationColumnId === 'doing' && board[destinationColumnId].length >= 2) {
        return false;
    }

    // Rule: Once in DONE, cards cannot go back
    if (sourceColumnId === 'done') {
        return false;
    }

    // All rules passed, card can be moved
    return true;
};