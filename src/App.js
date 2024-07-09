import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import ProductList from './components/ProductList';
import LoginPage from './Pages/LoginPage'; 
import AboutUs from './Pages/AboutUs';
import AdminPage from './Pages/AdminPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='register' element={<RegisterPage onCreatedUser={() => {}} />} />
          <Route path="login" element={<LoginPage onLogin={() => {}} />} />
          <Route path='product' element={<ProductList />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='admin' element={<AdminPage onCreatedProduct={() => {}} />} />
          

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
