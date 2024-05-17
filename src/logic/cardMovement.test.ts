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

        expect(result.backlog[0].id).toBe('task2');
        expect(result.backlog[1].id).toBe('task1');
    });

    test('should move a card to a different column', () => {
        const boardData: BoardType = {
            backlog: [{ id: 'task1', content: 'Task 1' }],
            todo: [],
            doing: [],
            done: [],
        };

        const result = moveCard(boardData, { droppableId: 'backlog', index: 0 }, { droppableId: 'todo', index: 0 });

        expect(result.backlog.length).toBe(0);
        expect(result.todo[0].id).toBe('task1');
    });

    test('should move a card to the end of a different column', () => {
        const boardData: BoardType = {
            backlog: [{ id: 'task1', content: 'Task 1' }],
            todo: [{ id: 'task2', content: 'Task 2' }],
            doing: [],
            done: [],
        };

        const result = moveCard(boardData, { droppableId: 'backlog', index: 0 }, { droppableId: 'todo', index: 1 });

        expect(result.backlog.length).toBe(0);
        expect(result.todo.length).toBe(2);
        expect(result.todo[1].id).toBe('task1');
    });
});