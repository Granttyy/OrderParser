# OrderParser

Repository for the OrderParser Next.js project.

## Requirements

- Node.js 18 or 20 (LTS recommended)
- pnpm (recommended, repo includes a pnpm-lock.yaml)

## Quick start (Windows PowerShell)

Open PowerShell and run:

```powershell
cd 'C:\Users\genes\OneDrive\Documents\OrderParser'

# (Optional) Install pnpm if you don't have it
npm install -g pnpm

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open the app in your browser (dev server default: http://localhost:3000)
Start-Process 'http://localhost:3000'
```

## Build and run (production)

```powershell
cd 'C:\Users\genes\OneDrive\Documents\OrderParser'
pnpm install
pnpm build
pnpm start
```

## Useful scripts

- `pnpm dev` — run Next.js in development mode
- `pnpm build` — build the production app
- `pnpm start` — start the production server
- `pnpm run lint` — run eslint

## Troubleshooting

- Node version: If you see Node-related errors, upgrade to Node 18+ or 20.
- pnpm not installed: `npm i -g pnpm` or enable Corepack on Node 18+ with `corepack enable`.
- Dependencies fail to install: remove `node_modules` and reinstall:

```powershell
rm -Recurse -Force node_modules
pnpm install
```

- Port in use: run with a different port in PowerShell:

```powershell
$env:PORT=4000; pnpm dev
```

## Contributing

Feel free to open issues or PRs. I keep code in the `app/` directory (Next.js app router).

## License

This project has no license specified. Add a `LICENSE` file if you want to make this code open source.
