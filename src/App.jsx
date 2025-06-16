import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';

function App() {
  return (
    // <h1 class="text-2xl font-bold text-amber-300 underline">
    // Hello world!
    // </h1>
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;