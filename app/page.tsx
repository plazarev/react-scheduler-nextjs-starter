import Scheduler from '../components/Scheduler/Scheduler';
import { events } from '../data/demoData';

export default function HomePage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Scheduler events={events} />
    </div>
  );
}
