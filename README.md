# Thai Injury Surveillance Dashboard

A web dashboard for visualizing injury surveillance data in Thailand. Built with React, TypeScript, Vite, and TailwindCSS.

## Features

- Interactive charts (Bar, Line) for age, month, province, and time-based injury events
- Responsive design with modern UI
- Data loaded from CSV files
- Easy deployment to GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
npm install
```

### Development

```sh
npm run dev
```

### Build

```sh
npm run build
```

### Preview

```sh
npm run preview
```

## Deployment

This project is configured for GitHub Pages. The base path is set to `/dashboard_thai_injury_surveillance` in `vite.config.ts`.

## Project Structure

- `src/` — Main source code
  - `components/charts/` — Chart components
  - `pages/OverViews/` — Overview pages and chart boxes
  - `utils/` — Data parsing and utility functions
- `public/data/` — CSV data files

## Data Sources

CSV files are located in `public/data/`:

- `2024_age_event_counts.csv`
- `2024_month_event_counts.csv`
- `2024_province_event_counts.csv`
- `2024_time_event_counts.csv`

## License

MIT
