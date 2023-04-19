import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import Main from "./components/main/Main";
import SignIn from "./components/signin/SignIn";
import Todo from "./components/todo/Todo";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route index element={<Main />} />
          <Route path="main" element={<Main />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
