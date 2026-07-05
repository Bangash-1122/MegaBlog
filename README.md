# ⚡ MegaBlog - Modern Blogging Application

MegaBlog is a professional, full-featured blogging web application built with **React**, **Vite**, **Redux Toolkit**, and **Appwrite** (as the Backend-as-a-Service). It provides a responsive blogging interface supporting user authentication, interactive dashboards, post editing through a Rich Text Editor (TinyMCE), image uploading, and route protection.

---

## 🚀 Key Features

*   **🔒 Complete Authentication System**: Secure User Signup, Login, and Session management with Appwrite Account service and Redux-managed global state.
*   **📝 Rich Text Editor (RTE)**: Fully integrated TinyMCE rich text editor, enabling styled content formatting for blog creation.
*   **📁 Image Storage**: Automated featured-image uploading, updating, and preview retrieval using Appwrite Storage Buckets.
*   **🛡️ Protected Routes**: Custom `AuthLayout` middleware routing guards that restrict/allow access to pages dynamically based on authentication state.
*   **📑 Blog Post Management (CRUD)**: Create, Read, Update, and Delete blog posts. Posts support slugs, titles, content, featured image IDs, and active status.
*   **⚡ React Hook Form Integration**: Lightweight and fast form submission with built-in validation rules and subscription watch hooks for automated slug conversion.
*   **🎨 Responsive Styling**: Built with Tailwind CSS for layouts and sleek modern animations.

---

## 🛠️ Technology Stack

| Technology | Purpose | Description |
| :--- | :--- | :--- |
| **React (v19)** | UI Library | Modern component-driven frontend architecture. |
| **Vite (v7)** | Development Server | Hyper-fast build tooling and Hot Module Replacement (HMR). |
| **Redux Toolkit (v2)** | State Management | Centralized store for user session variables (`authSlice`). |
| **React Router DOM (v7)** | Routing | Client-side routing with route protection guards. |
| **Appwrite (v22)** | BaaS Backend | Handles Database collections, User Auth, and Storage. |
| **TinyMCE React** | Rich Text Editor | Embedded WYSIWYG editor for composing posts. |
| **React Hook Form (v7)** | Form Handler | High-performance forms validation and performance management. |
| **Tailwind CSS** | Styling | Utility-first CSS styling framework. |

---

## 📂 Project Structure Walkthrough

```text
src/
├── appwrite/
│   ├── auth.js          # Appwrite authentication wrapper service (login, signup, logout)
│   └── config.js        # Appwrite database, collection, and storage/bucket operations
├── assets/              # Static media assets (logos, images, etc.)
├── components/          # Reusable UI & Page-layout components
│   ├── container/       # Container component for centering layout width
│   ├── Footer/          # Global application Footer layout
│   ├── Header/          # Global application Header and Logout components
│   ├── Post-form/       # PostForm component for creating and editing blog posts
│   ├── AuthLayout.jsx   # Route guard / Protected routing component
│   ├── Button.jsx       # Generic button UI component
│   ├── Input.jsx        # ForwardRef-enabled generic input UI component
│   ├── Logo.jsx         # Branding logo component
│   ├── Login.jsx        # Login form layout & form submission logic
│   ├── PostCard.jsx     # Card component for previewing single blog post item
│   ├── RTE.jsx          # Rich Text Editor wrapper utilizing TinyMCE
│   ├── Select.jsx       # Custom select dropdown input component
│   ├── Signup.jsx       # Signup form layout & registration logic
│   └── index.js         # Centralized export barrel file for components
├── conf/
│   └── conf.js          # Stringified environment variable mapper
├── pages/               # Page views mapped to Router routes
│   ├── AddPost.jsx      # Page to create a new post (wraps PostForm)
│   ├── AllPosts.jsx     # Page to display a list of all posts matching query
│   ├── EditPost.jsx     # Page to edit a post (fetches data & passes to PostForm)
│   ├── Home.jsx         # Landing page (public post preview list)
│   ├── Login.jsx        # Page view for Login route
│   ├── Post.jsx         # Individual post detail page with options to edit/delete
│   └── Signup.jsx       # Page view for Signup route
├── store/               # Redux state management files
│   ├── authSlice.js     # Redux slice tracking authentication status & user info
│   └── store.js         # Redux configureStore initialization
├── App.css              # Global styles
├── App.jsx              # Main App entry point (checks session state and wraps layouts)
├── index.css            # Tailwind directives
└── main.jsx             # Entry point mounting RouterProvider and Redux Provider
```

---

## ⚙️ Environment Configuration

To connect the application to your Appwrite instance, create a `.env` file in the root directory and add the following variables:

```env
VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id_here"
VITE_APPWRITE_DATABASE_ID="your_database_id_here"
VITE_APPWRITE_COLLECTION_ID="your_collection_id_here"
VITE_APPWRITE_BUCKET_ID="your_bucket_id_here"
```

*Note: Ensure all variables are prefixed with `VITE_` as the frontend uses Vite which requires this prefix to make them accessible via `import.meta.env`.*

---

## 🗄️ Appwrite Setup Guide

To run this project successfully, you need to configure your Appwrite console database and storage bucket:

### 1. Database & Collection
Create a new database and a collection with the following attributes (schema):

| Attribute Key | Type | Size / Constraint | Required | Note |
| :--- | :--- | :--- | :--- | :--- |
| **title** | String | 255 | Yes | The title of the blog post |
| **content** | String | 10000 | Yes | The HTML output from TinyMCE RTE |
| **featuredImage**| String | 255 | Yes | The Appwrite Storage File ID |
| **status** | String | 20 (e.g. Enum: `active`, `inactive`) | Yes | The publication status of the post |
| **userId** | String | 255 | Yes | ID of the author/user who created it |

*Index: Create an Index on the `status` attribute (attribute name `status`, index type `key`) if you intend to filter query results by active posts.*

### 2. Storage Bucket
Create a storage bucket to handle featured images:
*   Name it according to your bucket ID.
*   Set appropriate permissions (e.g., Allow read access to all users or authenticated users, and write access to authenticated users).

---

## 🏃 Getting Started

Follow these steps to run the application locally:

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18.x or above recommended)
*   An active [Appwrite](https://appwrite.io/) Cloud account or local self-hosted instance.

### Installation

1. Clone the repository and navigate into the folder:
   ```bash
   git clone <repository-url>
   cd 12MegaBlog
   ```

2. Install the node packages:
   ```bash
   npm install
   ```

3. Configure your Environment:
   *   Create a `.env` file in the root folder.
   *   Fill in your Appwrite credentials (as described in [Environment Configuration](#-environment-configuration)).

4. Start the Vite local development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Build & Deployment

To build the application for production:

```bash
npm run build
```

This compiles optimized production-ready assets into the `dist/` directory, which can then be deployed to any static host (Vercel, Netlify, GitHub Pages, Firebase Hosting, etc.).

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
