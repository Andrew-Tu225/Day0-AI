import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatInterface from '../../components/ChatInterface';
import '@testing-library/jest-dom';

describe('ChatInterface', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders initial state correctly', () => {
        render(<ChatInterface />);
        expect(screen.getByText('Hello! How can I help you today?')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    });

    it('fetches history when sessionId is provided', async () => {
        const mockHistory = {
            history: [
                { role: 'user', content: 'Hi previous' },
                { role: 'assistant', content: 'Hello back' }
            ]
        };

        (global.fetch as jest.Mock).mockImplementation(async (url) => {
            if (url.includes('/history')) {
                return {
                    ok: true,
                    json: async () => mockHistory,
                };
            }
            return { ok: false };
        });

        render(<ChatInterface sessionId="123" />);

        // Wait for the history to be fetched and rendered
        expect(await screen.findByText('Hi previous')).toBeInTheDocument();

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/chat/123/history');
    });

    it('sends a message and displays response', async () => {
        (global.fetch as jest.Mock).mockImplementation(async (url, options) => {
            if (url.includes('/history')) {
                return {
                    ok: true,
                    json: async () => ({ history: [] }),
                };
            }
            if (url.toString().endsWith('/chat') && options?.method === 'POST') {
                const body = JSON.parse(options.body as string);
                if (body.message === 'Hello bot') {
                    return {
                        ok: true,
                        json: async () => ({ reply: 'I am a bot response' }),
                    };
                }
            }
            return { ok: false };
        });

        render(<ChatInterface sessionId="123" />);

        // Wait for history fetch (mocked empty)
        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/history')));

        const input = screen.getByPlaceholderText('Type your message...');
        const button = screen.getByRole('button');

        fireEvent.change(input, { target: { value: 'Hello bot' } });
        fireEvent.click(button);

        expect(screen.getByText('Thinking...')).toBeInTheDocument();

        expect(await screen.findByText('I am a bot response')).toBeInTheDocument();
        expect(screen.getByText('Hello bot')).toBeInTheDocument();
    });

    it('handles error when sending message', async () => {
        (global.fetch as jest.Mock).mockImplementation(async (url, options) => {
            if (url.includes('/history')) {
                return {
                    ok: true,
                    json: async () => ({ history: [] }),
                };
            }
            if (url.toString().endsWith('/chat') && options?.method === 'POST') {
                throw new Error('Network error');
            }
            return { ok: false };
        });

        render(<ChatInterface sessionId="123" />);

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/history')));

        const input = screen.getByPlaceholderText('Type your message...');
        const button = screen.getByRole('button');

        fireEvent.change(input, { target: { value: 'Hello fail' } });
        fireEvent.click(button);

        expect(await screen.findByText('Sorry, connection error. Please try again.')).toBeInTheDocument();
    });
});
