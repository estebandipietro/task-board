import { expect, test, describe } from 'vitest'
import { BoardType } from '../types/BoardTypes';
import { moveCard } from './cardMovement';

describe('moveCard', () => {
    test('should move a card within the same column', () => {
        const boardData: BoardType = {
            backlog: [
                { id: 'task1', content: 'Task 1' },
                { id: 'task2', content: 'Task 2' },
            ],
            todo: [],
            doing: [],
            done: [],
        };

        const result = moveCard(boardData, { droppableId: 'backlog', index: 0 }, { droppableId: 'backlog', index: 1 });

        expect(result.newBoard?.backlog[0].id).toBe('task2');
        expect(result.newBoard?.backlog[1].id).toBe('task1');
        expect(result.error).toBeUndefined()
    });

    test('should move a card to a different column', () => {
        const boardData: BoardType = {
            backlog: [{ id: 'task1', content: 'Task 1' }],
            todo: [],
            doing: [],
            done: [],
        };

        const result = moveCard(boardData, { droppableId: 'backlog', index: 0 }, { droppableId: 'todo', index: 0 });

        expect(result.newBoard?.backlog.length).toBe(0);
        expect(result.newBoard?.todo[0].id).toBe('task1');
    });

    test('should move a card to the end of a different column', () => {
        const boardData: BoardType = {
            backlog: [{ id: 'task1', content: 'Task 1' }],
            todo: [{ id: 'task2', content: 'Task 2' }],
            doing: [],
            done: [],
        };

        const result = moveCard(boardData, { droppableId: 'backlog', index: 0 }, { droppableId: 'todo', index: 1 });

        expect(result.newBoard?.backlog.length).toBe(0);
        expect(result.newBoard?.todo.length).toBe(2);
        expect(result.newBoard?.todo[1].id).toBe('task1');
    });

    test('should return error when canMoveCard returns false', () => {
        const boardData: BoardType = {
            backlog: [{ id: '1', content: 'Task 1' }],
            todo: [{ id: '2', content: 'Task 2' }],
            doing: [{ id: '3', content: 'Task 3' }],
            done: [{ id: '4', content: 'Task 4' }],
        };

        const result = moveCard(boardData, { droppableId: 'backlog', index: 0 }, { droppableId: 'done', index: 0 });

        expect(result.newBoard).toBeUndefined();
        expect(result.error).not.toBeUndefined();
    });
});