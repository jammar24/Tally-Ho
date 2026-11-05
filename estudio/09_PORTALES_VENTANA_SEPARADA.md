# 09 — Portales en Ventana Separada & Navbar Simplificado

> **Sesión:** 4 de noviembre de 2026, 21:00 EST  
> **Estado:** Completado ✅ | Servidor corriendo en `localhost:3000`

---

## Qué se hizo en esta actualización

### Problema que se resolvía
El Navbar anterior exponía directamente los portales (`/merchant`, `/portal`, `/admin`) como links de navegación. El admin tenía un botón prominente a la derecha. Esto creaba confusión de roles, exponía rutas privilegiadas a cualquier visitante, y mezclaba la navegación pública con los portales privados.

### Solución implementada
1. **Navbar limpio** — solo rutas públicas visibles
2. **Portales abren en pestaña nueva** — separación visual y de contexto
3. **Guard de autenticación** — protección real en rutas de portal

---

## Archivos modificados

### `components/Navbar.tsx`
**Lo que se cambió:**
- Eliminados del array `navLinks`: `/merchant`, `/portal`
- Eliminado el botón dedicado de Admin (pestaña derecha con `IconShield`/`IconLock`)
- Eliminado el Role Switcher Pill (botón "Merchant / Customer / switch")
- El menú móvil también quedó limpio — sin portales ni admin

**Nav links actuales (definitivos):**
```
Home  ·  Disputes  ·  Insights  ·  Orders  ·  About  ·  Docs
```

**Botón de autenticación (derecha del navbar):**
- Si **NO hay sesión** → botón azul `Acceder` → lleva a `/auth`
- Si **hay sesión** → muestra nombre del usuario (punto verde) + botón `Salir` con `IconLogOut`

**Iconos del toggler móvil:**
- Reemplazados `✕` y `☰` (caracteres) por SVG inline — consistente con la política de 0 emojis/caracteres especiales

---

### `app/auth/page.tsx`
**Lo que se cambió:**

#### Quick Preset buttons (login de un clic)
Ahora hacen **dos cosas**: login + abrir el portal en nueva pestaña automáticamente.

```ts
// Antes
login('merchant-apex@sandbox.paypal.com', 'Apex Gear Store', 'merchant');

// Ahora
login('merchant-apex@sandbox.paypal.com', 'Apex Gear Store', 'merchant');
window.open('/merchant', '_blank', 'noopener,noreferrer');
```

| Preset | Portal que abre |
|---|---|
| "Entrar como Comerciante" | `/merchant` en nueva pestaña |
| "Entrar como Cliente" | `/portal` en nueva pestaña |
| (admin via custom form) | `/admin` en nueva pestaña |

#### Botones de portal (cuando ya hay sesión activa)
Cambiados de `<Link href="...">` a `<a target="_blank" rel="noopener noreferrer">`:

```tsx
// Antes (misma pestaña)
<Link href="/merchant">Ir al Portal Comerciante</Link>

// Ahora (nueva pestaña + icono de enlace externo)
<a href="/merchant" target="_blank" rel="noopener noreferrer">
  <IconStore size={14} />
  Abrir Portal Comerciante
  <svg>/* icono de nueva ventana */</svg>
</a>
```

Los tres portales tienen este patrón:
- **Admin** → `bg-indigo-600` + `IconShield`
- **Merchant** → `bg-blue-600` + `IconStore`  
- **Customer** → `bg-purple-600` + `IconUser`

---

### `app/merchant/page.tsx`
**Guard de autenticación añadido:**

```ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const router = useRouter();

useEffect(() => {
  if (user === null) {
    router.replace('/auth');
  }
}, [user, router]);
```

Si alguien entra directamente a `localhost:3000/merchant` sin sesión → redirige inmediatamente a `/auth`.

---

### `app/portal/page.tsx`
**Mismo guard que merchant:**

```ts
useEffect(() => {
  if (user === null) {
    router.replace('/auth');
  }
}, [user, router]);
```

> **Nota:** `/admin` ya tenía su propio gate interno (pantalla de login con credenciales), por eso no se le añadió este useEffect — su protección es diferente (requiere password, no solo sesión).

---

## Flujo completo de acceso por rol

```
Usuario llega a localhost:3000
        │
        ▼
    [Navbar público]
    Home · Disputes · Insights · Orders · About · Docs
        │
        │  (no hay link a portales aquí)
        │
        ▼
    Botón "Acceder" → /auth
        │
        ├── Sin sesión → formulario de login / quick preset
        │
        └── Con sesión → botón "Abrir Portal [rol]"
                              │
                              ▼
                    Se abre en NUEVA PESTAÑA
                    /merchant | /portal | /admin
```

---

## Credenciales de acceso

| Rol | Email | Password / Método |
|---|---|---|
| **Admin** | `admin@disputedesk.ai` | `Admin2026!` (en pantalla gate de `/admin`) |
| **Merchant** | `merchant-apex@sandbox.paypal.com` | Quick Preset en `/auth` |
| **Customer** | `buyer-john@sandbox.paypal.com` | Quick Preset en `/auth` |

---

## Verificaciones post-cambio

| Check | Resultado |
|---|---|
| `npx tsc --noEmit` | ✅ exit 0 — 0 errores TypeScript |
| `npx next dev -p 3000` | ✅ Ready in 10.7s |
| Webpack warnings SWC | ⚠️ Inofensivos — binarios de otras plataformas (Linux/macOS) no presentes en Windows, Next.js los ignora |

---

## Notas de arquitectura

- **Admin** nunca aparece en el nav — es una ruta "secreta" accesible solo desde `/auth`
- Los portales son **SPA independientes** dentro de Next.js App Router — al abrir en nueva pestaña obtienen su propio contexto de sesión (compartido via `localStorage` / `sessionStorage` según el `AppContext`)
- El guard `useEffect` con `user === null` (no `!user`) es importante: evita redirigir cuando el contexto aún está cargando (estado inicial puede ser `undefined`)

---

*Documento generado por Antigravity · Tally-Ho Dispute Engine v2.0*

