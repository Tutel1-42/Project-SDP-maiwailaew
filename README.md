# 🧸 Art Toy Pre-order Website

**Project SDP – Maiwailaew**

A web application for pre-ordering collectible **Art Toys**. Members can browse the catalogue of upcoming toys, reserve the ones they want before they arrive, and manage their pre-orders, while admins manage the toy catalogue and oversee every order.

> 🎓 **Course project (2024)** – built as coursework with a focus on **frontend development**.
>
> ⚠️ **Project status:** The backend API this frontend depends on is **no longer operational**. The frontend code is preserved here for reference and portfolio purposes, but the deployed demo can no longer sign in, load the catalogue or place orders. See [Project Status](#-project-status) for details.

---

## ✨ Features

### 👤 For everyone
- **Landing page** with a rotating cover banner (click to switch images)
- **Catalogue** of art toys with poster image, description, SKU, arrival date and remaining quota
- **Toy detail page** for each item
- **Wishlist** – save toys you are interested in (stored in the browser's local storage)
- **Sign-up / Sign-in** with email and password

### 🛍️ For members
- **Order Toy** – pre-order a toy by name, with a quantity of **1–5**
- **One pre-order per toy** – a toy that is already pre-ordered cannot be ordered again
- **My Orders** – view, edit the quantity of, or cancel your pre-orders

### 🛠️ For admins
- **Admin dashboard** showing the admin profile and quick actions
- **Manage Toys** – add, edit and delete art toys (name, SKU, description, poster image URL, arrival date, available quota)
- **Manage Orders** – view and manage all orders placed by members

### 🔐 Role-based access
| Role | Permissions |
| --- | --- |
| Guest | Browse catalogue, use wishlist, register / sign in |
| Member | Everything above + place and manage own pre-orders |
| Admin | Manage toys and orders (admins cannot place orders) |

---

## 🧰 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Actions) with React 18 and TypeScript
- **Styling / UI:** Tailwind CSS, Material UI (MUI), CSS Modules
- **Authentication:** NextAuth.js (Credentials provider, JWT sessions)
- **State management:** Redux Toolkit, Redux Persist, React Context (wishlist)
- **Data models:** Mongoose schemas (User, Toy, Order)
- **Other libraries:** bcryptjs, dayjs, react-datepicker, MUI X Date Pickers
- **Deployment:** Vercel

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── (toyinfo)/toys/       # Catalogue and toy detail pages
│   ├── orders/               # Create a pre-order
│   ├── my-orders/            # Member's own pre-orders
│   ├── wishlist/             # Wishlist page
│   ├── register/             # Sign-up page
│   ├── adminMenu/            # Admin dashboard, toy & order management
│   ├── actions/              # Server Actions (toyActions, orderActions)
│   └── api/auth/             # NextAuth route
├── components/               # TopMenu, Banner, ToyCard, ToyCatalog, ItemsCart, ...
├── db/                       # MongoDB connection and models (User, Toy, Order)
├── libs/                     # Data fetching helpers and NextAuth options
└── redux/                    # Wishlist context and Redux provider
interfaces.ts                 # Shared TypeScript interfaces
```

---

## 🗃️ Data Models

- **User** – `name`, `email`, `tel`, `role` (`member` | `admin`), `password` (hashed)
- **Art Toy** – `sku`, `name`, `description`, `posterPicture`, `arrivalDate`, `availableQuota`
- **Order** – `user`, `artToy`, `orderAmount` (1–5)

---

## 📌 Project Status

The frontend was developed to work with a separate REST backend that was provided and hosted for the course. That backend has since been shut down, so:

- The **Vercel demo** no longer works end to end (no login, catalogue data or orders).
- The app **cannot run fully out of the box** from this repository alone.

The frontend still documents the API it expects, which makes it possible to revive the project by building a compatible backend or mocking one:

| Endpoint | Used for |
| --- | --- |
| `POST /api/v1/auth/register` | Sign-up |
| `POST /api/v1/auth/login` | Sign-in (returns user info, role and JWT token) |
| `GET / POST /api/v1/arttoys` | List and create toys |
| `GET / PUT / DELETE /api/v1/arttoys/:id` | View, update and delete a toy |
| `GET / POST /api/v1/orders` | List and create orders |
| `PUT / DELETE /api/v1/orders/:id` | Update and cancel an order |

Authenticated requests send the token as `Authorization: Bearer <token>`.

---

## 🚀 Running the Frontend Locally

### Prerequisites
- Node.js 18+
- A backend that implements the endpoints above (or a mock server)
- A MongoDB database (the admin dashboard reads user data directly through Mongoose)

### Installation

```bash
git clone https://github.com/Tutel1-42/Project-SDP-maiwailaew.git
cd Project-SDP-maiwailaew
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
API_URL=http://localhost:5000        # Base URL of your backend / mock API
MONGO_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # Build for production
npm run start   # Start the production server
npm run lint    # Run ESLint
```
