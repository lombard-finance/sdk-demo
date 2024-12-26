import { Navigate, Route, Routes } from 'react-router-dom';

import { Stake } from 'modules/stake/Stake';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Stake />} index />

      <Route element={<Navigate to="/" />} path="*" />
    </Routes>
  );
}
