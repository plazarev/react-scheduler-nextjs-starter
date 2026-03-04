# DHTMLX React Scheduler with Next.js Demo

[![dhtmlx.com](https://img.shields.io/badge/made%20by-DHTMLX-blue)](https://dhtmlx.com/)

> Demo project demonstrating how to integrate [DHTMLX React Scheduler](https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/) in a Next.js application with TypeScript and App Router.

## Quick Start

Clone the repository:

```bash
git clone https://github.com/dhtmlx/dhx-react-scheduler-nextjs-demo.git
cd dhx-react-scheduler-nextjs-demo
```

Install dependencies:

```
npm install
```

or

```
yarn
```

### Run the demo on the local server and explore it

```
npm run dev
```

or

```
yarn dev
```

## Code example

The Scheduler component is implemented as a Next.js Client Component with TypeScript and React hooks for optimal performance:

```typescript
'use client';

import { useMemo, useRef } from 'react';
import ReactScheduler, {
  type ReactSchedulerRef,
  type Event,
  type SchedulerTemplates,
  type SchedulerConfig,
} from '@dhx/trial-react-scheduler';
import '@dhx/trial-react-scheduler/dist/react-scheduler.css';

export interface ReactSchedulerProps {
  events: Event[];
  activeView?: string;
  activeDate?: Date;
}

export default function Scheduler({
  events,
  activeView = 'week',
  activeDate = new Date('2025-12-08T00:00:00Z'),
}: ReactSchedulerProps) {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  const templates: SchedulerTemplates = useMemo(
    () => ({
      event_class: (start: Date, end: Date, event: Event) => {
        return event.classname || '';
      },
    }),
    []
  );

  const config: SchedulerConfig = useMemo(() => {
    return {
      first_hour: 6,
      last_hour: 22,
      hour_size_px: 60,
    };
  }, []);

  return (
    <ReactScheduler
      ref={schedulerRef}
      events={events}
      view={activeView}
      date={activeDate}
      templates={templates}
      config={config}
      data={{
        save: (entity: string, action: string, data: Event, id: string | number) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        },
      }}
    />
  );
}
```

Check the [React Scheduler documentation](https://docs.dhtmlx.com/scheduler/react.html) for more details and advanced features.

## Project Structure

```
dhx-react-scheduler-nextjs-demo/
├── app/
│   ├── layout.tsx                 # root layout
│   ├── page.tsx                   # home page with Scheduler
│   ├── globals.css                # global styles
│   └── favicon.ico
├── components/
│   └── Scheduler/
│       └── Scheduler.tsx          # Client Component with <ReactScheduler />
├── data/
│   └── demoData.ts                # sample events data
├── next.config.ts                 # Next.js configuration
└── package.json                   # dependencies and scripts
```

## Scripts

- `npm run dev` - start Next.js development server (default port: 3000)
- `npm run build` - build Next.js application for production
- `npm start` - start production server
- `npm run lint` - run ESLint code checks

## License

The code in this repository is released under the **MIT** License.

`@dhx/react-scheduler` and `@dhx/trial-react-scheduler` are commercial libraries. To use it in your projects, please choose a proper license on the DHTMLX website: [https://dhtmlx.com/docs/products/licenses.shtml](https://dhtmlx.com/docs/products/licenses.shtml).

## Useful links

[DHTMLX React Scheduler product page](https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/)

[DHTMLX Scheduler product page](https://dhtmlx.com/docs/products/dhtmlxScheduler/)

[Documentation](https://docs.dhtmlx.com/scheduler/)

[React Scheduler Documentation](https://docs.dhtmlx.com/gantt/integrations/react/)

[Blog](https://dhtmlx.com/blog/)

[Forum](https://forum.dhtmlx.com/)
