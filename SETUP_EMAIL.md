# Contact Form Email Setup

## 1) Install Node.js
Install Node.js LTS from [https://nodejs.org](https://nodejs.org).

## 2) Install project dependencies
Open terminal in this folder and run:

```bash
npm install
```

## 3) Configure environment variables
1. Copy `.env.example` to `.env`
2. Fill in real SMTP values:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM`
   - `CONTACT_RECEIVER_EMAIL`

## 4) Run server

```bash
npm start
```

The site will run at:

```text
http://localhost:3000
```

## 5) Test
Open `http://localhost:3000/contact.html`, submit the form, and confirm the email arrives at `CONTACT_RECEIVER_EMAIL`.
