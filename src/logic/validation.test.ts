import { expect, test, describe } from 'vitest'
import { canMoveCard } from './validations';
import { BoardType } from '../types/BoardTypes';

const boardData: BoardType = {
    backlog: [{ id: 'task1', content: 'Task 1' }],
    todo: [{ id: 'task2', content: 'Task 2' }],
    doing: [{ id: 'task3', content: 'Task 3' }],
    done: [{ id: 'task4', content: 'Task 4' }],
};

describe('canMoveCard', () => {
    test('should allow moving a card to the adjacent column', () => {
        expect(canMoveCard(boardData, 'backlog', 'todo')).toBe(true);
        expect(canMoveCard(boardData, 'todo', 'backlog')).toBe(true);
        expect(canMoveCard(boardData, 'todo', 'doing')).toBe(true);
        expect(canMoveCard(boardData, 'doing', 'todo')).toBe(true);
        expect(canMoveCard(boardData, 'doing', 'done')).toBe(true);
    });

    test('should not allow moving a card more than one column away', () => {
        expect(canMoveCard(boardData, 'backlog', 'doing')).toBe(false);
        expect(canMoveCard(boardData, 'todo', 'done')).toBe(false);
    });

    test('should not allow more than two cards in the DOING column', () => {
        const boardWithTwoDoing = {
            ...boardData,
            doing: [
                { id: 'task3', content: 'Task 3' },
                { id: 'task5', content: 'Task 5' },
            ],
        };
        expect(canMoveCard(boardWithTwoDoing, 'todo', 'doing')).toBe(false);
    });

    test('should not allow moving cards out of the DONE column', () => {
        expect(canMoveCard(boardData, 'done', 'doing')).toBe(false);
        expect(canMoveCard(boardData, 'done', 'todo')).toBe(false);
    });
});