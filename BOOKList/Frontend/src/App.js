import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/login";
import RegisterPage from "./components/Register/register";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Books from "./components/Book/Books";
import BookDetail from "./components/Book/BookDetail";
import Header from "./components/Header";
// import Todo from "./components/Todo/Todo"
function App() {
  return (
    <>
     
    <BrowserRouter>
    <header>
        <Header />
      </header>
      <Routes>
        <Route path="/" element={<LoginPage />} />
         
        <Route path="/home" element={<Home />} exact />
          <Route path="/add" element={<AddBook />} exact />
          <Route path="/books" element={<Books />} exact />
          <Route path="/books/:id" element={<BookDetail />} exact />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
