# 🚀 Professional Rvite Template

A complete, production-ready Rvite template with Web and Admin panels built with modern best practices.

## ✨ Features

- ⚡ **Vite + SWC** - Blazing fast builds and HMR
- 🎨 **shadcn/ui** - Beautiful, customizable components
- 🔄 **TanStack Query v5** - Server state management
- 🗄️ **Zustand** - Lightweight client state
- 📝 **TypeScript** - Full type safety
- 🎭 **Framer Motion** - Smooth animations
- ✅ **Zod** - Schema validation
- 🎯 **React Hook Form** - Powerful form handling
- 🛠️ **Biome** - Ultra-fast linting & formatting
- 🌓 **Dark/Light Theme** - Built-in theme system
- 🛡️ **Protected Routes** - Authentication ready
- 📱 **Responsive** - Mobile-first design

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components (Header, Sidebar, Footer)
│   ├── features/        # Feature-specific components
│   ├── shared/          # Shared/common components
│   └── providers/       # Context providers
├── hooks/               # Custom React hooks
├── lib/
│   ├── api/            # API client & query client
│   ├── utils/          # Utility functions
│   └── constants/      # Constants & configs
├── services/            # API services (TanStack Query hooks)
├── store/              # Zustand stores
├── types/              # TypeScript types
└── pages/              # Page components
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Rvite Template
VITE_ENABLE_DEVTOOLS=true
```

### 3. Run Development Server

```bash
pnpm dev
```

### 4. Build for Production

```bash
pnpm build
```

## 📚 Usage Examples

### Using TanStack Query

```typescript
import { usePosts } from '@/services/posts.service'

function MyComponent() {
  const { data, isLoading, error } = usePosts()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>{/* Render data */}</div>
}
```

### Using Zustand Store

```typescript
import { useUIStore } from '@/store/uiStore'

function MyComponent() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)

  return <button onClick={toggleSidebar}>Toggle</button>
}
```

### Creating a Form with Validation

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  })

  // ... form implementation
}
```

### Using Custom Hooks

```typescript
import { useDebounce } from '@/hooks/useDebounce'
import { useMediaQuery } from '@/hooks/useMediaQuery'

function MyComponent() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // ... component logic
}
```

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run Biome linter
- `pnpm lint:fix` - Fix linting issues
- `pnpm format` - Format code

## 📦 Key Dependencies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TanStack Query** - Server state
- **Zustand** - Client state
- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Zod** - Validation
- **React Hook Form** - Forms
- **Axios** - HTTP client

## 🎯 Best Practices

1. **State Management**
   - Use TanStack Query for server state
   - Use Zustand for global UI state
   - Use React state for local component state

2. **Component Organization**
   - Keep components small and focused
   - Separate logic from presentation
   - Extract reusable logic into hooks

3. **File Naming**
   - Components: `PascalCase.tsx`
   - Hooks: `camelCase.ts`
   - Utils: `camelCase.ts`
   - Types: `PascalCase.types.ts`

4. **Code Style**
   - Follow Biome configuration
   - Use TypeScript strictly
   - Write clean, readable code

## 🔐 Authentication

The template includes authentication setup:

- Protected routes via `ProtectedRoute` component
- Auth store with Zustand
- Auth service with TanStack Query
- Login form example

## 🎨 Theming

Theme system is built-in:

```typescript
import { useTheme } from '@/components/providers/ThemeProvider'

function MyComponent() {
  const { theme, setTheme } = useTheme()
  // theme: 'light' | 'dark' | 'system'
}
```

## 📝 Adding New Features

1. **Create a Service**
   - Add to `src/services/`
   - Use TanStack Query hooks
   - Export from `services/index.ts`

2. **Create a Component**
   - Add to appropriate folder in `src/components/`
   - Use shadcn/ui components
   - Follow existing patterns

3. **Add a Route**
   - Update `src/App.tsx`
   - Create page component in `src/pages/`
   - Add protected route if needed

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Netlify

```bash
netlify deploy --prod
```

### Static Hosting

Upload the `dist/` folder to your hosting provider.

## 📖 Documentation

- [React Documentation](https://react.dev)
- [TanStack Query](https://tanstack.com/query/latest)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contributing

This is a template project. Feel free to customize it for your needs!

## 📄 License

MIT

---

Built with ❤️ for professional developers
