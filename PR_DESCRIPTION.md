# feat: Add Dashboard Builder Skill

## Overview

This PR adds a new Dashboard Builder skill for building full-stack dashboard applications. The skill leverages React/Next.js + shadcn/ui + Tailwind CSS + Recharts + Express with customizable data sources. Perfect for data visualization dashboards, business intelligence interfaces, monitoring systems, KPI displays, and analytics platforms.

## Changes

### New Files

1. **README.md** - Added documentation for the Dashboard Builder skill, including location and key features
2. **skills/dashboard-builder/SKILL.md** - Comprehensive skill definition with various dashboard components, animation effects, CSS styles, and resource references
3. **skills/dashboard-builder/QUICKSTART.md** - Quick start guide with project structure, initialization steps, and development instructions
4. **skills/dashboard-builder/DATA_INTEGRATION.md** - Data integration guide explaining how to connect different data sources and API integration
5. **skills/dashboard-builder/ADDITIONAL_COMPONENTS.md** - Additional components specifically designed for large screen dashboards, including status monitors, data tables, gauge charts, etc.
6. **skills/dashboard-builder/package.json** - Project dependency configuration file
7. **skills/dashboard-builder/setup-and-run.sh** - Automated setup and run script
8. **skills/dashboard-builder/references/big-screen-ui.md** - Big screen UI design guidelines
9. **skills/dashboard-builder/references/data-api-integration.md** - Data API integration reference documentation
10. **skills/dashboard-builder/references/recharts-patterns.md** - Recharts chart pattern references

### Key Features

- **Dashboard Components**: Including KPI cards, trend charts, data tables, gauge charts, pie charts, status monitors, etc.
- **Animation Effects**: Multiple animation effects implemented using Framer Motion
- **Big Screen Optimization**: UI design and layout specifically optimized for large screens
- **Data Integration**: Support for multiple data sources including REST APIs, GraphQL, databases, etc.
- **Automation Script**: One-click project creation, dependency installation, and development server startup
- **Theme Support**: Professional dark theme design
- **Responsive Design**: Responsive layouts supporting different screen sizes

## Tech Stack

- React/Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Framer Motion
- Lucide React

## Usage

1. You can use the automation script to quickly create a new project:
   ```bash
   ./setup-and-run.sh
   ```

2. Or set up manually:
   - Create a Next.js app
   - Install required dependencies
   - Add shadcn/ui components
   - Configure dashboard components

## Testing

This skill includes comprehensive documentation and example components to facilitate user onboarding. All components have been validated to ensure they work properly in a dashboard environment.