import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../../components/Dashboard';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe('Dashboard', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    it('renders the Create button', () => {
        render(<Dashboard />);
        const createButton = screen.getByRole('button', { name: /create/i });
        expect(createButton).toBeInTheDocument();
    });

    it('calls create-session API and redirects on success', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ session_id: 'new-session-id' }),
        });

        render(<Dashboard />);
        const createButton = screen.getByRole('button', { name: /create/i });

        fireEvent.click(createButton);

        expect(screen.getByText('Creating secure session...')).toBeInTheDocument();

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/create-session', {
                method: 'POST',
            });
        });

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/chat/new-session-id');
        });
    });

    it('handles error gracefully and resets state', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Fail'));
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        render(<Dashboard />);
        const createButton = screen.getByRole('button', { name: /create/i });

        fireEvent.click(createButton);

        expect(screen.getByText('Creating secure session...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('Creating secure session...')).not.toBeInTheDocument();
        });

        expect(mockPush).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
