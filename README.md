# 🧸 Art Toy Pre-order Website

**Project SDP – Maiwailaew**

A web application for pre-ordering collectible **Art Toys**. Members can browse the catalogue of upcoming toys, reserve the ones they want before they arrive, and manage their pre-orders, while admins manage the toy catalogue and oversee every order.

🔗 **Live demo:** [Vercel deployment](https://project-sdp-maiwailaew-7s4yayzya-tute1-42s-projects.vercel.app/)

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
- **Database:** MongoDB with Mongoose
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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB database
- The backend REST API (this frontend calls `/api/v1/auth`, `/api/v1/arttoys` and `/api/v1/orders`)

### Installation

```bash
git clone https://github.com/Tutel1-42/Project-SDP-maiwailaew.git
cd Project-SDP-maiwailaew
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
API_URL=http://localhost:5000        # Base URL of the backend API
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

---

## ☁️ Deployment

The project is deployed on [Vercel](https://vercel.com/). Remember to set the environment variables above in the Vercel project settings.
