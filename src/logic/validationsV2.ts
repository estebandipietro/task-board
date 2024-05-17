import { BoardType } from "../types/BoardTypes";

// Strategy interfaces
interface MoveStrategy {
    execute(board: BoardType, sourceColumnId: string, destinationColumnId: string): boolean;
}

// Concrete strategy classes
class OneColumnMoveStrategy implements MoveStrategy {
    execute(board: BoardType, sourceColumnId: string, destinationColumnId: string): boolean {
        const sourceIndex = Object.keys(board).indexOf(sourceColumnId);
        const destinationIndex = Object.keys(board).indexOf(destinationColumnId);
        const columnDifference = Math.abs(sourceIndex - destinationIndex);
        return columnDifference <= 1;
    }
}

class TwoCardLimitMoveStrategy implements MoveStrategy {
    execute(board: BoardType, sourceColumnId: string, destinationColumnId: string): boolean {
        if (destinationColumnId === 'doing' && board[destinationColumnId].length >= 2) {
            return false;
        }
        return true;
    }
}

class NoBackMoveStrategy implements MoveStrategy {
    execute(board: BoardType, sourceColumnId: string, destinationColumnId: string): boolean {
        return sourceColumnId !== 'done';
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

    canMove(board: BoardType, sourceColumnId: string, destinationColumnId: string): boolean {
        for (const strategy of this.strategies) {
            if (!strategy.execute(board, sourceColumnId, destinationColumnId)) {
                return false;
            }
        }
        return true;
    }
}

export const canMoveCardV2 = (board: BoardType, sourceColumnId: string, destinationColumnId: string): boolean => {
    const moveValidator = new MoveValidator();
    return moveValidator.canMove(board, sourceColumnId, destinationColumnId);
};