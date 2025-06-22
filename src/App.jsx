import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import router from './routes/routes';

function App() {
  return (
    // <h1 class="text-2xl font-bold text-amber-300 underline">
    // Hello world!
    // </h1>
    <>
      <RouterProvider router={router}/>
      <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
      />
    </>
  );
}

export default App;