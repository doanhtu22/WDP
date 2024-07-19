import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import DefaultLayout from './components/Layout/Layout';
import publicRoutes from './router/PublicRoutes';
import AdminRoutesPage from './pages/admin/index';
import { AuthContextProvider } from './context/AuthContext';
import './App.css';

const SpinnerComponent = () => (
  <>
    <Spinner animation="grow" variant="primary" />
    <Spinner animation="grow" variant="secondary" />
    <Spinner animation="grow" variant="success" />
    <Spinner animation="grow" variant="danger" />
    <Spinner animation="grow" variant="warning" />
    <Spinner animation="grow" variant="info" />
    <Spinner animation="grow" variant="light" />
    <Spinner animation="grow" variant="dark" />
  </>
);

function App() {
  return (
    <AuthContextProvider>
      <Suspense fallback={<SpinnerComponent />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          {publicRoutes.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={<DefaultLayout>{item.element}</DefaultLayout>}
            />
          ))}
          <Route path="/admin/*" element={<AdminRoutesPage />} />
        </Routes>
      </Suspense>
    </AuthContextProvider>
  );
}

export default App;
