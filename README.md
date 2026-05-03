# CrudProductos

## 1. Introducción a la problemática (Situación problema)

Una pequeña empresa requiere un módulo web que permita registrar productos. Actualmente, los datos se almacenan de forma manual y no existe un control de errores adecuado o validaciones sistemáticas. El objetivo principal de este desarrollo es proporcionar una solución tecnológica que reciba información desde un formulario web, la procese bajo un modelo Orientado a Objetos (POO) y la almacene de manera segura e íntegra en una tabla de una base de datos relacional.

## 2. Explicación de la estructura MVC y las clases creadas

El proyecto está diseñado sobre una arquitectura moderna que separa claramente las responsabilidades, alineándose con el patrón **MVC (Modelo-Vista-Controlador)**:

- **Modelo (Model)**: Representado en el backend mediante Django ORM (`models.py`). Se crearon dos clases principales:
  - `Categoria`: Representa la agrupación de productos (atributos: `id`, `nombre`, `estado`).
  - `Producto`: Representa los ítems de inventario y está relacionado con `Categoria` mediante una llave foránea (`ForeignKey`). Contiene atributos detallados como `nombre`, `descripcion`, `precio`, `stock`, `estado` y una imagen (`img`).

- **Vista (View)**: Implementada principalmente en el frontend utilizando **React** (Vite). La interacción del usuario ocurre en componentes como `ProductFormPage.jsx` y `ProductListPage.jsx`, los cuales renderizan los formularios web y las tablas utilizando CSS moderno.

- **Controlador (Controller)**: En este sistema bifurcado, el controlador está compuesto por:
  - **Backend**: Los `ModelViewSet` en `views.py` (ej. `ProductoViewSet`) y los Serializadores (`ProductoSerializer`) de Django Rest Framework, que procesan las peticiones HTTP (GET, POST, PUT, DELETE) y se comunican con los modelos.
  - **Frontend**: Los archivos en `api/` (ej. `product.api.js`) y los Hooks de React, que actúan como intermediarios conectando la vista con las reglas de negocio del servidor.

## 3. Justificación del uso de POO (Programación Orientada a Objetos)

La Programación Orientada a Objetos es el pilar de este desarrollo por las siguientes ventajas:
1. **Modelado real**: Clases como `Producto` permiten representar un "Producto" del mundo real como un objeto en código, haciéndolo intuitivo de entender y manejar.
2. **Encapsulamiento**: Las reglas de interacción con la base de datos están encapsuladas dentro del ORM de Django (Object-Relational Mapping). No interactuamos directamente con sentencias SQL en el código, sino a través de objetos que protegen la integridad de sus propios datos.
3. **Reutilización y Herencia**: Al heredar de `models.Model`, nuestras clases de Base de Datos ganan automáticamente todas las funcionalidades de persistencia, filtrado y validación preconstruidas por el framework, agilizando enormemente el desarrollo.

## 4. Capturas de pantalla del formulario y resultados

> [!NOTE]
> *Reemplaza los enlaces entre paréntesis de abajo con las ubicaciones reales de tus capturas de pantalla, o arrastra las imágenes desde tu computadora sobre este documento directamente.*

**Formulario de Registro/Edición de Producto:**
![Captura del formulario](agregar_captura_formulario.png)

**Lista de Productos (Resultados almacenados):**
![Captura de la tabla de resultados](agregar_captura_resultados.png)

## 5. Explicación de validaciones

El sistema previene errores humanos y asegura la integridad de los datos empleando una estrategia de **Validación en Dos Capas**:

1. **Validación en Cliente (Frontend)**: Utilizando la librería `react-hook-form` en `ProductFormPage.jsx`, todos los campos del formulario especifican una regla `{ required: true }`. Si el usuario intenta enviar un formulario con campos vacíos, el proceso se detiene antes de gastar recursos de red y se presentan mensajes visuales de error (ej. *"El nombre es requerido"*).
2. **Validación en Servidor (Backend)**: Definida por las restricciones explícitas en `models.py`. 
   - `max_length=100`: Limita el tamaño del texto.
   - `DecimalField(max_digits=10, decimal_places=2)`: Garantiza que un precio solo pueda ser un valor monetario coherente.
   - `IntegerField()`: Restringe el campo "Stock" para que solo acepte números enteros.

## 6. Explicación del INSERT ejecutado

La inserción del producto a la Base de Datos procede mediante la siguiente cadena de eventos:

1. El usuario presiona el botón "Guardar producto" y el Frontend recopila los datos, instancia una variable `FormData` (necesaria por la imagen), e invoca `axios.post()` enviando los datos a la ruta `/api/v1/products/`.
2. El servidor Django intercepta la petición. El router de DRF redirige este método POST al `ProductoViewSet`.
3. El JSON/FormData es recibido por el `ProductoSerializer`, que valida los tipos de datos contra la clase `Producto`.
4. Al llamar al método `save()`, Django ORM **traduce el objeto Python en una sentencia SQL implícita**. El resultado final equivalente a nivel Base de Datos es:
   ```sql
   INSERT INTO products_producto (nombre, descripcion, precio, stock, estado, categoria_id, img) 
   VALUES ('Valor ingresado', '...', 1500, 10, true, 1, 'img.png');
   ```
5. SQLite almacena este registro permanentemente y el servidor responde con un código lógico `201 Created` al frontend.

## 7. Conclusiones

- La modernización de este proceso manual a un sistema web proporciona escalabilidad inmediata. El uso de React como frontend desconectado (Headless) y Django como API robustece el sistema y prepara a la aplicación para posibles nuevas interfaces a futuro (como aplicaciones móviles).
- Las validaciones duales (Front y Back) protegen los datos contra errores en el registro y garantizan una base de datos limpia.
- La aplicación del paradigma de Programación Orientada a Objetos reduce dramáticamente la complejidad técnica, mejora el mantenimiento de la aplicación a largo plazo y permite al desarrollador interactuar mediante conceptos humanos claros (Entidades en vez de Tablas aisladas).