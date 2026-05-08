import { Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from './layouts/AppLayout.jsx';
import CreateSamplePage from './pages/CreateSamplePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SampleDashboardPage from './pages/SampleDashboardPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="/samples" />} />
        <Route path="/samples" element={<SampleDashboardPage />} />
        <Route path="/samples/new" element={<CreateSamplePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
