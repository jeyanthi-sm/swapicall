import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { setupServer } from 'msw/node'
import { rest } from 'msw';

// This configures a request mocking server with the given request handlers.
const server = setupServer()

test('renders headers swapi simply call', () => {
  render(<App />);
  const headerElement = screen.getByText(/swapi simply call/i);
  expect(headerElement).toBeInTheDocument();
});

const json1 = {
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

const json500 = {
      "detail": "Oops... something went wrong, try again 🤕",
};

 

test("loads 500 Error", async () => {
  render(<App />);

  server.use(
    rest.get(`https://swapi.dev/api/people/`, (req, res, ctx) => {
    return res(ctx.status(500), 
    ctx.set('Content-Type', 'application/json'), ctx.json(json500));
    })
  );
    
 
  
  await screen.findByText(json500.detail);
  expect(screen.getByText(json500.detail)).toBeInTheDocument();
});

const json418 =  {
      "detail": "418 I'm a tea pot, silly",
    }

 

test("loads 418 Error", async () => {
  render(<App />);

  
  server.use(
    rest.get(`https://swapi.dev/api/people/`, (req, res, ctx) => {
      console.log(ctx.status);
      console.log(ctx.json);  
        return res(ctx.status(418), ctx.json(json418));
    })
  );

  
  await screen.findByText(json418.detail);
  expect(screen.getByText(json418.detail)).toBeInTheDocument();
});


 

