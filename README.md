# Capital Flow - PWA (Inspired by Corona Capital CDMX)
### Actividad de Clase: Caso 3

Este proyecto es una Progressive Web Application (PWA) desarrollada para PC, diseñada para gestionar horarios y bandas de un festival de música. Cumple estrictamente con los requerimientos de arquitectura y patrones de diseño solicitados.

---

## Arquitectura: Cliente-Servidor (Aplicada a la Perfección)

El sistema no es monolítico. Se ha implementado una separación física y lógica real entre el Cliente y el Servidor.

### 1. Backend (El Servidor)
*   Ubicación: /capital_flow_backend/server.js
*   Tecnología: Node.js Nativo (Sin frameworks, puro módulo HTTP).
*   Función: Actúa como la única fuente de verdad. Almacena los datos en memoria (Bandas y Escenarios) y expone una API REST (JSON) en el puerto 3001.
*   Cumplimiento: El frontend NO tiene acceso directo a los datos; debe solicitarlos vía HTTP.

### 2. Frontend (El Cliente PWA)
*   Ubicación: /capital_flow_pwa
*   Tecnología: Next.js (React).
*   Función: Consume la API del backend, renderiza la interfaz de usuario y gestiona la experiencia PWA (Manifest, Service Workers). Corre en el puerto 3000.

---

## Patrones de Diseño Obligatorios

### 1. Pattern: Adapter (Adaptador)
*   Ubicación: capital_flow_pwa/lib/adapter.ts

**¿Cómo se usó?**
El backend (sistema legado o externo) envía datos con nombres "crudos" y en español (ej. nombre_legal, id_legacy, horario_inicio).
El frontend moderno espera una interfaz limpia y en inglés (ej. name, id, startTime).

La clase BandAdapter intercepta los datos "feos" del backend y los transforma (adapta) al formato que necesita la UI. Si el backend cambia mañana, solo tocamos el adaptador, no toda la aplicación.

### 2. Pattern: Mediator (Mediador)
*   Ubicación: capital_flow_pwa/hooks/useBandMediator.ts

**¿Cómo se usó?**
En la página principal, tenemos varios componentes que quieren controlar qué bandas se muestran:
1.  La Barra de Búsqueda (Search Bar).
2.  Los Filtros de Escenario (Filter Buttons).
3.  La Lista de Bandas (Grid).

En lugar de que la Barra de Búsqueda hable directamente con la Lista, utilizamos un Mediador (useBandMediator).
*   Los componentes le dicen al Mediador lo que el usuario hace ("Busco 'Rock'", "Filtrar por 'Escenario Corona'").
*   El Mediador encapsula la lógica compleja de filtrado y decide qué bandas mostrar.
*   Esto desacopla los componentes y centraliza la lógica de negocio.

---

## PWA (Progressive Web App)
La aplicación cuenta con su manifiesto en public/manifest.json y configuración de viewport en layout.tsx, permitiendo que sea instalable en PC como una aplicación nativa, con iconos y colores de tema personalizados.

---

## Guía de Ejecución

El sistema requiere dos terminales abiertas (una para el servidor, otra para el cliente).

### Paso 1: Iniciar el Backend
cd capital_flow_backend
node server.js
(Debe decir: "Server running on port 3001")

### Paso 2: Iniciar el Frontend
En una NUEVA terminal:
cd capital_flow_pwa
npm run dev
(Abrir http://localhost:3000 en el navegador)

---