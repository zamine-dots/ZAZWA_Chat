
# 🧩 ONESPACE - Client

This is the **client-side** of the ONESPACE project, built with **Vite**, **React**, **TypeScript**, and UI components powered by **shadcn/ui**. 

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm`/`yarn`/`pnpm`

### Installation

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   _Or_

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

   _Or_

   ```bash
   npm run dev
   ```

4. Open your browser and go to:

   ```
   http://localhost:5173
   ```

---

## 🗂️ Project Structure

```txt
client/
│
├── public/              # Static assets
├── src/                 # Source code
│   └── ...              # Your components, pages, hooks, etc.
├── components.json      # shadcn component registry
├── index.html           # Vite HTML entry
├── vite.config.ts       # Vite config
├── tsconfig*.json       # TypeScript configs
└── README.md            # You're reading it!
```

---

## 🧱 UI Components: shadcn/ui

We use [shadcn/ui](https://ui.shadcn.com/) to build accessible, modern UI components.

### Adding a New Component

To generate a new component using `shadcn/ui`:

```bash
npx shadcn-ui@latest add <component-name>
```

For example:

```bash
npx shadcn-ui@latest add button
```

### Component List

Installed components are listed in `components.json`.

You can browse available components here: [https://ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)

### Updating Theme

You can customize the UI via Tailwind CSS and the `theme.ts` file (if present). Check [Shadcn Theming Guide](https://ui.shadcn.com/docs/theming) for details.

---

## 🧪 Linting

Lint your code with:

```bash
pnpm lint
```

Or

```bash
npm run lint
```

Configuration: `eslint.config.js`

---

## 🚀 Building for Production

To build the app:

```bash
pnpm build
```

The output will be in the `dist/` folder.

---

## 📁 Backend

The corresponding backend for this project lives in the `api/` directory.

Make sure to run the API server separately (check its own README).

---

## 📦 Dependencies

- **React**
- **Vite**
- **TypeScript**
- **shadcn/ui**
- **Tailwind CSS**
- **Radix UI**
- **Lucide Icons**
---