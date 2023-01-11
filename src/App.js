import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./app/store";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <div className="dark:bg-[#23242a]">
      <Provider store={store} >
        <AppRouter />
        <ToastContainer />
      </Provider> 
    </div>
  );
};

export default App;
