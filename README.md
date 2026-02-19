# 🍽️ Wurko Cafetería-Restaurante - Website

Página web profesional para Wurko Cafetería-Restaurante en Jerez de la Frontera.

## 📁 Estructura del Proyecto

```
wurko-website/
├── html/
│   └── index.html          # Página principal
├── css/
│   └── styles.css          # Estilos de la web
├── js/
│   └── script.js           # Funcionalidad JavaScript
├── images/
│   └── Logo_Wurko.jpg      # Logo del restaurante
└── README.md               # Este archivo
```

## 🚀 Cómo Usar la Web

### Opción 1: Abrir Directamente
1. Ve a la carpeta `html`
2. Abre el archivo `index.html` con tu navegador web favorito (Chrome, Firefox, Safari, Edge)
3. ¡La web se cargará automáticamente!

### Opción 2: Usando un Servidor Local (Recomendado para desarrollo)
Si tienes Python instalado:
```bash
cd wurko-website/html
python -m http.server 8000
```
Luego abre: `http://localhost:8000`

## 📸 Cómo Añadir tus Fotos

### Para el Menú:
1. Guarda tus fotos de platos en la carpeta `images/` con nombres descriptivos:
   - `bocadillo-pollo.jpg`
   - `menu-del-dia.jpg`
   - `tostada.jpg`
   - etc.

2. En el archivo `html/index.html`, busca las líneas con `placeholder-food.jpg` y reemplázalas:
   ```html
   <!-- Antes -->
   <img src="../images/placeholder-food.jpg" alt="Bocadillo de pollo">
   
   <!-- Después -->
   <img src="../images/bocadillo-pollo.jpg" alt="Bocadillo de pollo">
   ```

### Para la Galería:
1. Guarda tus fotos del restaurante en la carpeta `images/`:
   - `galeria-1.jpg`
   - `galeria-2.jpg`
   - etc.

2. En el archivo `html/index.html`, busca las líneas con `placeholder-gallery.jpg` y reemplázalas.

## ✨ Características de la Web

### ✅ Secciones Incluidas:
- **Hero**: Presentación principal con call-to-action
- **Sobre Nosotros**: Información del restaurante y características
- **Menú**: Menú completo con filtros por categoría (Desayunos, Bocadillos, Almuerzos, Cenas)
- **Galería**: Fotos del restaurante y platos
- **Reservas**: Formulario de reservas conectado a WhatsApp
- **Reseñas**: Testimonios de clientes
- **Contacto**: Información de contacto, horarios y mapa de Google Maps

### 🎨 Características Técnicas:
- ✅ Diseño Responsive (se adapta a móviles, tablets y ordenadores)
- ✅ Navegación suave entre secciones
- ✅ Menú hamburguesa para móviles
- ✅ Filtrado dinámico del menú
- ✅ Formulario de reservas conectado a WhatsApp
- ✅ Botón "Volver arriba"
- ✅ Animaciones modernas y profesionales
- ✅ Colores basados en el logo (azul y verde lima)
- ✅ Mapa de Google Maps integrado

## 🎨 Personalización

### Cambiar Colores:
En el archivo `css/styles.css`, al principio verás las variables CSS:
```css
:root {
    --primary-blue: #0B6FA8;
    --primary-green: #C5D900;
    /* Puedes cambiar estos valores */
}
```

### Cambiar Textos:
Abre `html/index.html` y edita directamente el contenido que desees cambiar.

### Añadir/Quitar Platos del Menú:
Busca la sección `<!-- Menu Section -->` en `index.html` y copia/pega bloques de `.menu-item` para añadir más platos.

## 📱 WhatsApp Reservas

El formulario de reservas está configurado para enviar a WhatsApp automáticamente.
El número actual es: **690 96 86 02**

Si necesitas cambiarlo, edita en `js/script.js` la línea:
```javascript
const phoneNumber = '34690968602'; // Cambia aquí el número
```

## 🗺️ Google Maps

El mapa está integrado con la ubicación del restaurante. Si la dirección cambia, actualiza el iframe en la sección de contacto.

## 🌐 Subir a Internet

### Opción 1: Hosting Gratuito (Netlify, Vercel, GitHub Pages)
1. Crea una cuenta en [Netlify](https://www.netlify.com/) (gratis)
2. Arrastra la carpeta completa `wurko-website`
3. ¡Tu web estará online en segundos!

### Opción 2: Hosting de Pago
Sube todo el contenido de la carpeta mediante FTP a tu servidor web.

## 📝 Notas Importantes

- Las fuentes se cargan desde Google Fonts (requiere conexión a internet)
- El mapa de Google Maps requiere conexión a internet
- Los placeholders de imágenes son temporales - reemplázalos con fotos reales
- El sitio es 100% responsive y funciona en todos los dispositivos

## 🆘 Soporte

Si tienes problemas:
1. Verifica que todos los archivos estén en sus carpetas correctas
2. Asegúrate de que las rutas de las imágenes sean correctas
3. Abre la consola del navegador (F12) para ver errores

## 📄 Licencia

Este proyecto ha sido creado específicamente para Wurko Cafetería-Restaurante.

---

**¡Disfruta de tu nueva web!** 🎉

Para cualquier modificación o mejora, puedes editar los archivos HTML, CSS y JavaScript según tus necesidades.
