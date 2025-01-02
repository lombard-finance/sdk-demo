import { Stake } from 'modules/stake/Stake';
import { StakeAndBakeForm } from 'modules/stake/components/StakeAndBakeForm';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { Navigate, Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/stake" replace />} />

      <Route path="/stake" element={<Stake />}>
        <Route index element={<StakeForm />} />
        <Route path="stake-and-bake" element={<StakeAndBakeForm />} />
      </Route>

      <Route path="*" element={<Navigate to="/stake" />} />
    </Routes>
  );
}
