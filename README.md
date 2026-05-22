# DHTMLX React Scheduler with Next.js (App Router)
 
A quick-start demo of **DHTMLX React Scheduler** integrated into a **Next.js** application using the **App Router**. Built with TypeScript and Tailwind CSS, it shows the correct `'use client'` pattern for mounting a browser-only scheduler component inside a server-rendered Next.js page.

A companion tutorial walks through the integration step by step: [Next.js integration guide](https://docs.dhtmlx.com/scheduler/integrations/react/nextjs/)

## What is DHTMLX React Scheduler with Next.js Starter

This starter shows how to embed DHTMLX React Scheduler inside a Next.js App Router application. The central challenge is that DHTMLX Scheduler is a browser-only component: it accesses the DOM on initialization and cannot run during server-side rendering. The demo solves this by wrapping the scheduler in a dedicated Client Component (marked with `'use client'`), which tells Next.js to render it only on the client.
 
The Scheduler component is configured through React props passed from the page, with `useMemo` used for `config` and `templates` objects to prevent unnecessary re-initialization. A `useRef<ReactSchedulerRef>` is also wired up for imperative access to the Scheduler API when needed. Event data is loaded from a static seed file, giving you a working calendar with day, week, and month views out of the box.
 
## When to Use
 
- Use this demo when building a Next.js App Router application that needs a full-featured event scheduling UI.
- Use this when you need a working reference for the `'use client'` pattern that correctly isolates DHTMLX Scheduler from Next.js server-side rendering.
- Use this as a starting point before adding a backend data source — the static seed events are easy to replace with a `fetch` call in the page component.
- Use this when you want a minimal, props-driven Scheduler component with `useMemo`-stable config and templates.

## Quick Start
 
```bash
git clone https://github.com/DHTMLX/react-scheduler-nextjs-starter
cd react-scheduler-nextjs-starter
npm install
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 
### Production Build
 
```bash
npm run build
npm start
```
 
## Architecture
 
```
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page — loads seed data, renders Scheduler
│   ├── globals.css             # Global styles
│   └── favicon.ico
├── components/
│   └── Scheduler/
│       └── Scheduler.tsx       # 'use client' component wrapping ReactScheduler
├── data/
│   └── demoData.ts             # Seed events dataset
├── next.config.ts              # Next.js configuration
└── postcss.config.mjs          # PostCSS / Tailwind configuration
```
 
`page.tsx` is a Server Component — it loads event data and passes it as props to `Scheduler.tsx`. `Scheduler.tsx` is a Client Component that handles all browser-specific Scheduler initialization. This boundary keeps the server component clean while ensuring Scheduler only runs in the browser.
 
## Key Patterns
 
- **`'use client'` boundary** — `Scheduler.tsx` is marked as a Client Component, which is the correct Next.js App Router mechanism for keeping browser-only libraries like DHTMLX Scheduler out of SSR. The page itself remains a Server Component.
- **`useMemo` for config and templates** — `config` and `templates` objects are memoized with `useMemo` to ensure stable references across re-renders, preventing Scheduler from re-initializing unnecessarily when the parent re-renders.
- **`useRef<ReactSchedulerRef>` for imperative access** — a typed ref is attached to the Scheduler instance, giving access to the Scheduler API for imperative operations (e.g., navigating to a specific date, triggering a refresh) without prop changes.
- **Props-driven configuration** — `events`, `activeView`, and `activeDate` are all passed as props from the page, making the Scheduler component stateless and reusable across different routes.

## Code Example
 
The core of the integration — the Client Component with memoized config and the `data.save` callback:
 
```tsx
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
 
 const config: SchedulerConfig = useMemo(() => ({
   first_hour: 6,
   last_hour: 22,
   hour_size_px: 60,
 }), []);
 
 return (
   <ReactScheduler
     ref={schedulerRef}
     events={events}
     view={activeView}
     date={activeDate}
     templates={templates}
     config={config}
     data={{
       save: (entity, action, data, id) => {
         console.log(`${entity} - ${action} - ${id}`, data);
       },
     }}
   />
 );
}
```
 
`data.save` is the entry point for all event mutations. Replace the `console.log` with a `fetch` call to persist events to your backend.
 
## Features
 
| Feature | Details |
|---|---|
| Next.js App Router | Uses the current App Router architecture, not Pages Router |
| SSR-safe integration | `'use client'` directive isolates Scheduler from server rendering |
| Props-driven config | Events, view, and date passed as props from the Server Component page |
| `useMemo` stability | Config and templates memoized to prevent unnecessary Scheduler reinit |
| `useRef` API access | Typed ref for imperative Scheduler API calls |
| `data.save` callback | Ready-to-extend mutation hook for connecting a backend |
| TypeScript | Full type coverage including `ReactSchedulerRef`, `Event`, `SchedulerConfig` |
| Tailwind CSS | Utility-first styling via PostCSS |
 
## Production Notes
 
This demo is a starter, not a production-ready application. Before going to production:
 
- **Replace static data** — `demoData.ts` is a seed file. Load real events in the page's Server Component using `fetch` or an ORM query, then pass them as props to the Scheduler.
- **Wire up `data.save`** — the current implementation logs mutations to the console. Replace it with an API call to persist creates, updates, and deletes.
- **Add error handling and loading states** — no loading indicators or error boundaries are included.
- **Scheduler license** — the demo uses `@dhx/trial-react-scheduler`. Replace with `@dhx/react-scheduler` under a valid commercial license for production use (see License section below).

## Related Resources
 
- [DHTMLX React Scheduler product page](https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/)
- [DHTMLX Scheduler product page](https://dhtmlx.com/docs/products/dhtmlxScheduler/)
- [DHTMLX Scheduler documentation](https://docs.dhtmlx.com/scheduler/)
- [DHTMLX Scheduler React integration guide](https://docs.dhtmlx.com/scheduler/react.html)
- [Remix scheduler starter (alternative SSR framework)](https://github.com/DHTMLX/react-scheduler-remix-starter)
- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [Community forum](https://forum.dhtmlx.com/)
- [Report an issue](https://github.com/DHTMLX/react-scheduler-nextjs-starter/issues)

## License
 
The source code in this repository is released under the **MIT License**.
 
**Commercial License**
Required for proprietary or commercial applications. Includes access to PRO features, dedicated technical support, and long-term maintenance.
[Learn more →](https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/#licensing)
 
**Try before you buy**
A free evaluation of DHTMLX React Gantt is available — no credit card required.
[Start your evaluation →](https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/download.shtml)

