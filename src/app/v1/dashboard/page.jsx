// app/dashboard/page.tsx
import DashboardPage from './Dashboard';

export const metadata = {
  title: 'Content Dashboard',
  description: 'Manage your articles and track performance',
  keywords: ['dashboard', 'content', 'cms', 'articles'],
  openGraph: {
    title: 'Content Dashboard',
    description: 'Manage your articles and track performance',
  },
};

export default function Dashboard() {
  return <DashboardPage />;
}