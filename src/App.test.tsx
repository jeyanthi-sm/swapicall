import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { setupServer } from 'msw/node'
import { rest, setupWorker } from 'msw';

// This configures a request mocking server with the given request handlers.
const server = setupServer()

test('renders headers swapi simply call', () => {
  render(<App />);
  const headerElement = screen.getByText(/swapi simply call/i);
  expect(headerElement).toBeInTheDocument();
});

const json1 = {
  count: 82,
  next: "https://swapi.dev/api/people/?page=2",
  previous: null,
  results: [
    {
      name: "Mock Character1",
    },
  ],
};


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays the first Mock character", async () => {
  render(<App />);

  
  server.use(
    rest.get(`https://swapi.dev/api/people/`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(json1));
    })
  );

  
  await screen.findByText(json1.results[0].name);
  expect(screen.getByText(json1.results[0].name)).toBeInTheDocument();
});

