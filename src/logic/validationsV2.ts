import { BoardType } from "../types/BoardTypes";

// Strategy interfaces
interface MoveStrategy {
    execute(board: BoardType, sourceColumnId: string, destinationColumnId: string): { canMove: boolean, error: string };
}

// Concrete strategy classes
class OneColumnMoveStrategy implements MoveStrategy {
    execute(board: BoardType, sourceColumnId: string, destinationColumnId: string): { canMove: boolean, error: string } {
        const sourceIndex = Object.keys(board).indexOf(sourceColumnId);
        const destinationIndex = Object.keys(board).indexOf(destinationColumnId);
        const columnDifference = Math.abs(sourceIndex - destinationIndex);
        if (columnDifference > 1) {
            return { canMove: false, error: 'Cards can only be moved by one column in any direction' };
        }
        return { canMove: true, error: '' };
    }
}

class TwoCardLimitMoveStrategy implements MoveStrategy {
    execute(board: BoardType, _sourceColumnId: string, destinationColumnId: string): { canMove: boolean, error: string } {
        if (destinationColumnId === 'doing' && board[destinationColumnId].length >= 2) {
            return { canMove: false, error: 'There can only be two cards in the DOING column at any time' };
        }
        return { canMove: true, error: '' };
    }
}

class NoBackMoveStrategy implements MoveStrategy {
    execute(_board: BoardType, sourceColumnId: string, _destinationColumnId: string): { canMove: boolean, error: string } {
        if (sourceColumnId === 'done') {
            return { canMove: false, error: 'Once in DONE, cards cannot go back' };
        }
        return { canMove: true, error: '' };
    }
}

class MoveValidator {
    private strategies: MoveStrategy[];

    constructor() {
        this.strategies = [
            new OneColumnMoveStrategy(),
            new TwoCardLimitMoveStrategy(),
            new NoBackMoveStrategy(),
        ];
    }

    canMove(board: BoardType, sourceColumnId: string, destinationColumnId: string): { canMove: boolean, error: string } {
        for (const strategy of this.strategies) {
            const result = strategy.execute(board, sourceColumnId, destinationColumnId);
            if (!result.canMove) {
                return result;
            }
        }
        return { canMove: true, error: '' };
    }
}

export const canMoveCardV2 = (board: BoardType, sourceColumnId: string, destinationColumnId: string): { canMove: boolean, error: string } => {
    const moveValidator = new MoveValidator();
    return moveValidator.canMove(board, sourceColumnId, destinationColumnId);
};