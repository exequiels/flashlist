# Flashlist – Collaborative Lists (No Registration)

Flashlist is a small exploratory project built to practice building simple, low-friction products.
It allows users to create collaborative lists without registration and share them easily, for example via WhatsApp.
List expires 24hs.

The project was intentionally kept simple to explore cost-efficient architectures using React and a monolithic Laravel backend hosted on low-cost infrastructure.

[Visit flashlist.com.ar](https://flashlist.com.ar)

---

## Tech Stack

- React + TypeScript
- Laravel (API)
- PrimeReact / PrimeFlex

---

## What I Learned

- Client-side React alone is not SEO-friendly; this project helped clarify when CSR is sufficient and when it isn’t.
- Real-time features are not free: WebSockets in PHP often require paid infrastructure or external services.
- Using Laravel purely as an API does not solve SSR or SEO; the frontend remains client-side rendered.
- For many products, a simple monolithic backend hosted on low-cost infrastructure is more effective than prematurely adopting microservices.
- This project reinforced my shift in mindset: today I use AI primarily as a learning and reasoning tool, not just for code generation.
- Working on this project deepened my understanding of Laravel and motivated me to build a future project focused purely on PHP/Laravel to better leverage its full capabilities.

## Local Setup

Create an `.env` file and add the variables:

```bash
VITE_URL=
VITE_BACKEND_URL=
```

Start it up:

```bash
npm run install
npm run dev
```

You need to set up the backend for all of this to generate the lists. However, you can see a full preview of the list builder in the React part until you click the "Create" button.

Search my repo for the backend.

<!-- PORTFOLIO_DATA_START
**Stack:** React, TypeScript, PrimeFlex, PrimeReact, Laravel APIs.
**Description:** Flashlist – a shared to-do list that can be completed collaboratively via WhatsApp.
**What I've learned and tested:**
- Client-side React is not SEO-friendly by default, and this project helped me better understand when CSR is sufficient and when it isn’t.
- Real-time features are not free: WebSockets in PHP usually require paid infrastructure or external services.
- Using Laravel purely as an API does not solve SSR or SEO; the frontend remains a client-side rendered application.
- For many products, a simple monolithic backend is more effective and easier to operate than prematurely adopting microservices.
- This project reinforced my shift in mindset: today I use AI primarily as a learning and reasoning tool, not just for code generation.
- Working on this project deepened my understanding of Laravel, and it motivated me to build a future project focused purely on PHP/Laravel to better leverage its full capabilities.
PORTFOLIO_DATA_END -->
