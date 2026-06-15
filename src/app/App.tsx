import { AppProviders } from './providers';
import { AppShell } from './layout/AppShell';
import { AppRouter } from './router';

export function App() {
  return (
    <AppProviders>
      <AppShell>
        <AppRouter />
      </AppShell>
    </AppProviders>
  );
}
