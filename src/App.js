import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Modal from './components/Modal';
import Login from './components/Login';
import Signup from './components/Signup';
import { SpeakTotalsProvider } from './context/SpeakTotals';

function App() {
  return (
    <SpeakTotalsProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/details" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Default />} />
      </Routes>
      <Modal />
    </SpeakTotalsProvider>
  );
}

export default App;
