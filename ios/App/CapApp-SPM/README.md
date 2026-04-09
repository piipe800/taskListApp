# Task List App

Aplicación desarrollada con Ionic + Angular para la gestión de tareas con categorías y filtrado dinámico.

## Tecnologías

- Angular
- Ionic
- Firebase Remote Config
- Capacitor

## Cómo ejecutar la aplicación

### Requisitos

- Node.js
- Ionic CLI
- Angular CLI

### Instalación

npm install

### Ejecutar en navegador

ionic serve

## Funcionalidades

- CRUD de tareas
- Persistencia en localStorage
- Gestión de categorías
- Asignación de categorías a tareas
- Filtrado por categoría
- Feature flag con Firebase Remote Config para habilitar/deshabilitar categorías
- Optimización de rendimiento (lazy loading, reactive forms, precarga de rutas)



## Cambios y decisiones técnicas

- Arquitectura
Separación de lógica mediante servicios (TaskService, CategoryService)
Uso de interfaces (Task, Category) para tipado fuerte
- Manejo de formularios
Uso de Reactive Forms en lugar de ngModel para mayor control y escalabilidad
- Persistencia
Uso de localStorage para mantener la información sin necesidad de backend
- Feature Flags
Integración con Firebase Remote Config
Permite activar/desactivar funcionalidades sin necesidad de redeploy
- Filtrado de tareas
Separación de estado entre:
selección de categoría para creación
selección para filtrado
Uso de un arreglo derivado (filteredTasks) para optimizar renderizado
- UX/UI
Uso de ion-card, ion-chip y estados vacíos
Indicador visual para tareas completadas
Interfaz clara y estructurada