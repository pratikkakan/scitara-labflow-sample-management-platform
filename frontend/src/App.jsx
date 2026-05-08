import { Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from './layouts/AppLayout.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SampleDashboardPage from './pages/SampleDashboardPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="/samples" />} />
        <Route path="/samples" element={<SampleDashboardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
