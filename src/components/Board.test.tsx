import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Board from './Board';

vi.mock('../logic/cardMovement', () => ({
    moveCard: vi.fn(),
}));

vi.mock('../utils/localStorage', () => ({
    getBoardFromLocalStorage: vi.fn(),
    saveBoardToLocalStorage: vi.fn(),
}));

const testData = {
    backlog: [{ id: '1', content: 'Task 1' }],
    todo: [{ id: '2', content: 'Task 2' }],
    doing: [{ id: '3', content: 'Task 3' }],
    done: [{ id: '4', content: 'Task 4' }],
};

describe('Board', () => {
    test('renders columns based on data', () => {
        vi.mock('../utils/localStorage', () => ({
            getBoardFromLocalStorage: () => testData,
        }));

        const { getByText } = render(<Board />);

        // Check if column titles are rendered
        expect(getByText('BACKLOG')).toBeInTheDocument();
        expect(getByText('TODO')).toBeInTheDocument();
        expect(getByText('DOING')).toBeInTheDocument();
        expect(getByText('DONE')).toBeInTheDocument();

        // Check if tasks are rendered in each column
        Object.values(testData).forEach(tasks => {
            tasks.forEach(task => {
                expect(getByText(task.content)).toBeInTheDocument();
            });
        });
    });
});