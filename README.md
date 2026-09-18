# REST API Server - Fake Store API Client

Este proyecto es un servidor ligero construido con Node.js para consumir la API pública de Fake Store API. La aplicación no crea un servidor HTTP local con Express ni otra librería de backend, sino que funciona como un cliente de línea de comandos que realiza peticiones HTTP a recursos de productos.

## ¿Qué hace?

Permite realizar operaciones CRUD básicas sobre productos usando comandos desde la terminal:

- Obtener todos los productos
- Obtener un producto por ID
- Crear un nuevo producto
- Eliminar un producto

## Requisitos

- Node.js 18 o superior
- Conexión a internet para consultar la API pública

## Instalación

```bash
npm install
```

> En este proyecto no se requiere una dependencia adicional para consultar la API, ya que usa `fetch` nativo de Node.js.

## Uso

### 1) Obtener todos los productos

```bash
npm start GET products
```

### 2) Obtener un producto por ID

```bash
npm start GET products/2
```

### 3) Crear un producto

```bash
npm start POST products "Producto de prueba" 19.99 electrónica
```

Este comando envía una solicitud `POST` a la API con un objeto como:

```json
{
  "title": "Producto de prueba",
  "price": 19.99,
  "category": "electrónica"
}
```

### 4) Eliminar un producto

```bash
npm start DELETE products/2
```

## URL base

```text
https://fakestoreapi.com/products
```

## Operaciones soportadas

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `products` | Devuelve todos los productos |
| GET | `products/:id` | Devuelve un producto específico |
| POST | `products` | Crea un nuevo producto |
| DELETE | `products/:id` | Elimina un producto |

## Ejemplo de respuesta

```json
[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  }
]
```

## Notas

- El proyecto está pensado como práctica de consumo de APIs REST desde Node.js.
- Los errores de red o de respuesta se registran por consola con mensajes descriptivos.
- La API externa Fake Store API es de prueba y no guarda datos de forma permanente entre ejecuciones.

## Autor

Proyecto de práctica para Backend / API REST con JavaScript.
