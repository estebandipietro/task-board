import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Card from './Card';

// Mock Draggable component
vi.mock('@hello-pangea/dnd', () => ({
    Draggable: ({ children }: any) => children({ draggableProps: {}, dragHandleProps: {}, innerRef: vi.fn() }, { isDragging: false }),
}));

describe('Card', () => {
    test('renders card with content', () => {
        const cardId = 'task1';
        const content = 'Task 1';
        const index = 0;

        render(<Card cardId={cardId} content={content} index={index} />);

        // Check if the card content is rendered
        expect(screen.getByText(content)).toBeInTheDocument();
    });
});