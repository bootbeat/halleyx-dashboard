# Halleyx Full Stack Engineer Challenge II -- Custom Dashboard Builder

## Overview

This project is a simplified implementation of a Custom Dashboard
Builder for admin users. It allows administrators to create personalized
analytics dashboards using configurable widgets such as KPI cards,
charts, and order tables.

The application demonstrates core full‑stack concepts including UI state
management, dynamic widget rendering, data integration, and responsive
layout behaviour.

## Features

### Admin Authentication

Simple admin login screen\
Demo credentials: Email: admin@halleyx.com\
Password: admin123

### Dashboard Builder

Default empty dashboard state\
Configure Dashboard mode\
Add and remove widgets dynamically\
Save dashboard layout

### Widgets

KPI Card\
Displays aggregated revenue from customer orders\
Updates automatically when new orders are created

Chart Widget\
Pie chart showing product distribution\
Bar chart showing order totals

Orders Form\
Create customer orders\
Mandatory field validation\
Auto calculation of total amount\
Delete created orders\
Real‑time dashboard data update

### Responsive Layout

Grid‑based widget layout\
Works across desktop and smaller screen sizes

## Tech Stack

Frontend: React (Vite)\
Axios\
Recharts

Backend: Node.js\
Express

## How to Run

Backend:

cd server\
node server.js

Frontend:

cd client\
npm install\
npm run dev

App runs at http://localhost:5173
