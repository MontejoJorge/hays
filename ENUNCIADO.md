# Prueba de Acceso – Desarrollador/a Fullstack (Java + React)

## Descripción General

En Ariadna Grid trabajamos con grandes volúmenes de eventos, cada uno asociado a una fuente, un valor y una marca temporal. Queremos evaluar tu capacidad para diseñar e implementar una solución profesional, eficiente y mantenible, tanto en el backend como en el frontend, sin utilizar bases de datos.

## Requisitos

### Backend (Java)

- Implementa una API REST en Java (versión 8 o superior, sin frameworks complejos ni bases de datos, ni siquiera en memoria tipo H2).
- Los datos deben cargarse desde archivos (mínimo 6 ficheros de eventos, al menos 1000 eventos en total, y un fichero de fuentes).
- La carga de datos debe realizarse de forma paralela para optimizar tiempos.
- Estructuras de datos:
  - **Fuente**: id, nombre, coordenadas (latitud, longitud)
  - **Evento**: id, fuente_id, timestamptz, valor, coordenadas (latitud, longitud)

Utiliza el mínimo de librerías externas posible, pero será necesario incluir tests unitarios que comprueben la funcionalidad de carga y endpoints desarrollados. Incluye a su vez, un README para indicarnos la forma de ejecución.

### Frontend (React)

- Implementa una interfaz con dos vistas principales:
  1. **Tabla de eventos y fuentes**:  
     - Tabla paginada y ordenable por cualquier columna.
     - Filtrado por cada columna, y rango de fechas.
     - Filtrado por nombre de fuente.
     - Muestra los eventos y su fuente asociada.
  2. **Mapa**:  
     - Muestra en un mapa los eventos y las fuentes usando sus coordenadas.
     - Los iconos de los eventos y las fuentes, deben ser diferentes (diferente color es suficiente). Además cada evento deberá estar unido por una línea a su fuente asociada.
- La interfaz debe consumir exclusivamente la API REST JAVA desarrollada.
- Incluye instrucciones de ejecución.

### Restricciones
- No se permite el uso de bases de datos de ningún tipo.
- Se valorará la calidad del código, la eficiencia, la claridad y la documentación.

## Entregables
- Código fuente completo del backend y frontend.
- Archivos de datos utilizados para la carga.
- Instrucciones de ejecución para ambos componentes.
- Breve documentación explicando las decisiones técnicas tomadas.

## Tiempo de entrega
- Tienes un plazo de 2 días para completar la prueba.
- Entrega el proyecto en un repositorio git: Github, gitlab.