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
        expect(canMoveCard(boardData, 'backlog', 'todo')).toEqual({ canMove: true, error: '' });
        expect(canMoveCard(boardData, 'todo', 'backlog')).toEqual({ canMove: true, error: '' });
        expect(canMoveCard(boardData, 'todo', 'doing')).toEqual({ canMove: true, error: '' });
        expect(canMoveCard(boardData, 'doing', 'todo')).toEqual({ canMove: true, error: '' });
        expect(canMoveCard(boardData, 'doing', 'done')).toEqual({ canMove: true, error: '' });
    });

    test('should not allow moving a card more than one column away', () => {
        expect(canMoveCard(boardData, 'backlog', 'doing')).toEqual({ canMove: false, error: 'Cards can only be moved by one column in any direction' });
        expect(canMoveCard(boardData, 'todo', 'done')).toEqual({ canMove: false, error: 'Cards can only be moved by one column in any direction' });
    });

    test('should not allow moving a card to DOING if there are already two cards', () => {
        const boardWithTwoDoing = {
            ...boardData,
            doing: [{ id: '3', content: 'Task 3' }, { id: '4', content: 'Task 4' }],
        };
        expect(canMoveCard(boardWithTwoDoing, 'todo', 'doing')).toEqual({ canMove: false, error: 'There can only be two cards in the DOING column at any time' });
    });

    test('should not allow moving a card from DONE to another column', () => {
        expect(canMoveCard(boardData, 'done', 'doing')).toEqual({ canMove: false, error: 'Once in DONE, cards cannot go back' });
        expect(canMoveCard(boardData, 'done', 'todo')).toEqual({ canMove: false, error: 'Cards can only be moved by one column in any direction' });
    });
});