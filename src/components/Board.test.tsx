import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Board from './Board';
import * as localStorageUtils from '../utils/localStorage'

describe('Board', () => {
    test('renders without errors', () => {
        render(<Board />);
    });

    test('renders reset button', () => {
        const { getByText } = render(<Board />);
        const resetButton = getByText('Reset Board');
        expect(resetButton).toBeInTheDocument();
    });

    test('resets board and local storage on button click', () => {
        const localStorageSpy = vi.spyOn(localStorageUtils, 'saveBoardToLocalStorage')
        const { getByText } = render(<Board />);
        const resetButton = getByText('Reset Board');
        fireEvent.click(resetButton);
        expect(localStorageSpy).toHaveBeenCalledWith({
            backlog: [
                { id: '1', content: 'Task 1' },
                { id: '2', content: 'Task 2' },
            ],
            todo: [
                { id: '3', content: 'Task 3' },
                { id: '4', content: 'Task 4' },
            ],
            doing: [
                { id: '5', content: 'Task 5' },
            ],
            done: [
                { id: '6', content: 'Task 6' },
            ],
        });
    });
});