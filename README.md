# Magma Frontend - Sistema de Gestión

Proyecto migrado desde Figma/Vite a Next.js 15 con Tailwind 4 y Hero UI.

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── (features)/              # Grupo de rutas para features
│   │   ├── peticiones/          # Gestión de peticiones ✅
│   │   ├── personal/            # Gestión de personal
│   │   ├── departamentos/       # Gestión de departamentos
│   │   ├── formularios/         # Gestión de formularios
│   │   ├── horarios/            # Gestión de horarios
│   │   └── layout.tsx
│   ├── globals.css              # Estilos globales con Tailwind 4
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
│
├── features/                    # Features organizados por dominio
│   ├── peticiones/              # ✅ Feature completo
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── data/
│   │   └── index.ts
│   └── [otros features]/        # 🚧 Por migrar
│
└── shared/                      # Código compartido
    ├── components/
    │   └── common/              # Sidebar, TopBar, Logo
    ├── layouts/
    │   └── MainLayout.tsx
    ├── constants/
    │   └── routes.ts
    └── index.ts
```

## 🚀 Tecnologías

- **Next.js 15**: Framework React con App Router
- **Tailwind 4**: CSS utility-first (sin tailwind.config)
- **Hero UI**: Librería de componentes UI
- **TypeScript**: Tipado estático
- **Lucide React**: Iconos
- **Biome**: Linter y formatter

## 📦 Instalación

```bash
npm install
```

## 🏃 Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y serás redirigido a `/peticiones`.

## 📝 Convenciones

### Importaciones

Usa el alias `@/` para importar desde `src/`:

```typescript
import { MainLayout } from '@/shared/layouts/MainLayout';
import { PeticionesPage } from '@/features/peticiones';
```

### Rutas

Se definen en `src/shared/constants/routes.ts`

## 🎨 Estilos con Tailwind 4

Los estilos se configuran directamente en `globals.css`:

```css
@import "tailwindcss";
@theme inline {
  --color-primary: var(--primary);
}
```

## 📄 Estado Actual

### ✅ Completado

- Estructura base del proyecto Next.js
- Componentes shared (Sidebar, TopBar, Layout)
- Feature de Peticiones completo con tabla y métricas
- Navegación funcional entre secciones
- Estilos con Tailwind 4 y Hero UI

### 🚧 Por Migrar

- Componentes detallados de Personal, Departamentos, Formularios y Horarios
- Modales y formularios del proyecto Vite original
- Paneles de detalle
- Calendario de horarios

## 🔧 Scripts

```bash
npm run dev       # Desarrollo
npm run build     # Build de producción
npm run start     # Servidor de producción
npm run lint      # Linter (Biome)
npm run format    # Formatter (Biome)
```
