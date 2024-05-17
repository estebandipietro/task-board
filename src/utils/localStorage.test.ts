import { describe, test, expect, afterEach } from 'vitest';
import { getBoardFromLocalStorage, saveBoardToLocalStorage } from './localStorage';
import { BoardType } from '../types/BoardTypes';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string) => store[key],
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('Board Utils', () => {
    afterEach(() => {
        localStorage.clear();
    });

    test('getBoardFromLocalStorage returns data from localStorage', () => {
        const testData: BoardType = {
            backlog: [{ id: '1', content: 'Task 1' }],
            todo: [{ id: '2', content: 'Task 2' }],
            doing: [{ id: '3', content: 'Task 3' }],
            done: [{ id: '4', content: 'Task 4' }],
        };

        localStorage.setItem('board', JSON.stringify(testData));

        const result = getBoardFromLocalStorage();
        expect(result).toEqual(testData);
    });

    test('getBoardFromLocalStorage returns default data if localStorage is empty', () => {
        const defaultData: BoardType = {
            backlog: [],
            todo: [],
            doing: [],
            done: [],
        };

        const result = getBoardFromLocalStorage(defaultData);
        expect(result).toEqual(defaultData);
    });

    test('saveBoardToLocalStorage saves board data to localStorage', () => {
        const testData: BoardType = {
            backlog: [{ id: '1', content: 'Task 1' }],
            todo: [{ id: '2', content: 'Task 2' }],
            doing: [{ id: '3', content: 'Task 3' }],
            done: [{ id: '4', content: 'Task 4' }],
        };

        saveBoardToLocalStorage(testData);

        const storedData = localStorage.getItem('board');
        expect(JSON.parse(storedData!)).toEqual(testData);
    });
});