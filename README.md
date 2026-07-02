# 💰 FinTrack - Personal Finance Management Platform

## Live Demo

🔗 **Live Application:** https://fintrack-kartik.vercel.app/

---

## Project Status

⚠️ **This project is currently under active development.**

* Bugs are actively being fixed and improvements are ongoing.
* Mobile and tablet responsiveness is currently being implemented.
* Additional features and analytics capabilities are planned for future releases.
* Some features may not be fully implemented or may change during development.

---

## Problem Statement

Managing personal finances manually can make it difficult to track spending habits, monitor financial performance, and gain meaningful insights from financial data.

FinTrack aims to provide a centralized platform where users can record transactions, monitor income and expenses, and visualize financial activity through intuitive dashboards and analytics.

---

## Overview

FinTrack is a full-stack Personal Finance Management Platform designed to help users organize and analyze their financial data.

The application provides secure user authentication, transaction management, financial summaries, and interactive data visualizations to support better financial decision-making.

---

## Current Features

### Authentication & Security

* User Registration
* Email OTP Verification
* Secure Login and Logout
* JWT Authentication
* HTTP-only Cookie Storage
* Forgot Password Flow
* Password Reset Functionality
* Protected Routes

### Transaction Management

* Add income transactions
* Add expense transactions
* Categorize transactions
* View transaction history
* Delete transactions

### Financial Overview

* Current Balance Tracking
* Total Income Tracking
* Total Expense Tracking
* Savings Monitoring

### Analytics Dashboard

* Monthly Spending Analytics
* Category-wise Expense Distribution
* Spending Trend Visualizations
* Interactive Charts

### Search & Filtering

* Search Transactions
* Filter Transactions by Type
* Dynamic Transaction Views

### User Experience

* Real-Time Updates
* Persistent User Sessions
* Dynamic Rendering
* Clean and Intuitive Interface
* Dark/Light Theme Support

---

## Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* CSS3
* Context API

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Tokens (JWT)
* HTTP-only Cookies
* OTP Verification System

### Data Visualization

* Recharts

### Deployment

* Vercel (Frontend)
* Render (Backend)

### Version Control

* Git
* GitHub

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/TechTrooper05/Personal-Finance-Management-Platform.git
```

### Navigate to the Project Directory

```bash
cd Personal-Finance-Management-Platform
```

### Install Dependencies

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

## Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend `.env`

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## Running the Application

### Start Backend Server

```bash
npm run dev
```

### Start Frontend

```bash
npm start
```

---

## Future Enhancements

* Budget Management System
* Savings Goal Tracking
* Recurring Transactions
* AI-Powered Spending Insights
* Financial Forecasting
* Export Reports (PDF/CSV)
* Progressive Web App (PWA) Support
* Multi-Device Data Synchronization
* Notifications and Reminders

---

## Screenshots

### Dashboard

![Dashboard](DashboardSS.png)

### Transaction Management

![Transactions Page](TransactionPageSS.png)

### Analytics

![Analytics Page 1](SpendingAnalyticsSS1.png)

![Analytics Page 2](SpendingAnalyticsSS2.png)

### Financial Overview

![Financial Overview](FinancialOverviewSS.png)

---

## Learning Outcomes

This project helped strengthen my understanding of:

* Full-Stack Application Development
* REST API Development
* Authentication and Authorization
* JWT and Cookie-Based Sessions
* MongoDB Data Modeling
* React State Management
* Data Visualization
* Deployment Workflows
* Production Debugging
* Git and GitHub Workflow

---

## License

This project is licensed under the MIT License.