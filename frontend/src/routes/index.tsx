import { Navigate, Route, Routes } from 'react-router';

import EventsPage from '../pages/events';
import MapPage from '../pages/map';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/events" element={<EventsPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="*" element={<Navigate to="/events" replace />} />
    </Routes>
  );
};

export default AppRoutes;
