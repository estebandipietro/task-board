/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Column from './Column';
import { Task } from '../types/BoardTypes';

vi.mock('@hello-pangea/dnd', () => ({
    Droppable: ({ children }: any) => children(
        { innerRef: vi.fn(), droppableProps: {} },
        { isDraggingOver: false }
    ),
    Draggable: ({ children }: any) => children(
        { innerRef: vi.fn(), draggableProps: {}, dragHandleProps: {} },
        { isDragging: false, isDropAnimating: false }
    ),
    DragDropContext: ({ children }: any) => <div>{children}</div>,
}));

describe('Column', () => {
    const tasks: Task[] = [
        { id: 'task1', content: 'Task 1' },
        { id: 'task2', content: 'Task 2' },
    ];

    test('renders the column with title and tasks', () => {
        render(<Column id="backlog" title="BACKLOG" tasks={tasks} />);

        // Check if the column title is rendered
        expect(screen.getByText('BACKLOG')).toBeInTheDocument();

        // Check if tasks are rendered
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    test('renders empty state if no tasks', () => {
        render(<Column id="backlog" title="BACKLOG" tasks={[]} />);

        // Check if the column title is rendered
        expect(screen.getByText('BACKLOG')).toBeInTheDocument();

        // Check if no tasks are rendered
        expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    });
});