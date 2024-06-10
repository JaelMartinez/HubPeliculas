# Veuw - Hub de Películas

## Descripción

Veuw es una aplicación de streaming de películas y series inspirada en plataformas como HBO, Amazon Prime y Netflix. Este proyecto es parte de un sprint de dos semanas y está desarrollado utilizando HTML, CSS, JavaScript y Tailwind CSS.

## Características

- **Desplazamiento automático**: Una galería de imágenes con desplazamiento horizontal suave.
- **Efectos de Hover**: Al pasar el mouse sobre una película, aparecen opciones de reproducción y me gusta, junto con un título estilizado.
- **Carousel de películas**: Se me ocurrió crear un carrusel que le diera la opción a los usuarios de ver una película random.
- **Reproductor de video**: En los sliders de las películas se muestra la opción para reproducir video y este te lleva a un reproductor de YouTube.
- **Diseño Responsivo**: Utiliza Tailwind CSS para garantizar que la aplicación sea responsiva en diferentes dispositivos y tamaños de pantalla.

## Tecnologías Utilizadas

- **HTML**
- **CSS**
- **JavaScript**
- **Tailwind CSS**

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/veuw.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd veuw
    ```
3. Instala las dependencias necesarias utilizando `npm`:
    ```sh
    npm install
    ```
4. Genera el archivo CSS de Tailwind:
    ```sh
    npm run build:css
    ```
5. Abre `inicio/inicio.html` en tu navegador.

## Uso
1. Al abrir la aplicación, se te pedirá iniciar sesión para que puedas entrar a la ventana principal.
2. Tendrás que registrarte primero y luego iniciar sesión con esas credenciales.
3. Al iniciar sesión, se mostrará la página principal con una selección de películas destacadas.
4. En la parte inferior se mostrará un slider con diferentes películas.
5. Pasa el mouse sobre una película para ver las opciones de reproducción, me gusta y más información.
6. En el header puedes navegar a la sección de series y películas, estos tendrán sliders que cumplen la misma función.
7. En el header podrás ver una sección de favoritos, aquí se guardarán todas las películas y series que marques como favoritas al clickear el corazón.
8. Podrás ver más información sobre la película al hacer clic en el icono de más información.
9. Haz clic en el botón "Random" para obtener recomendaciones de películas aleatorias.
10. Si quieres cerrar sesión solo haz hover sobre el icono de perfil y clickea en logout.

## Sprint Review

| ¿Qué salió bien? | ¿Qué puedo hacer diferente? | ¿Qué no salió bien? |
|------------------|-----------------------------|---------------------|
| Secciones personalizadas: Cada sección tiene un diseño atractivo y fácil de utilizar para los usuarios. | En este sprint aprendí más sobre el diseño responsivo así que ahora utilizaré estos conocimientos para ahorrar mucho tiempo, como por ejemplo el uso de media queries. | El buscador no es funcional, aunque más adelante lo cambiaremos porque actualmente no estoy utilizando APIs y bases de datos porque lo veo más fácil y óptimo ya que utilicemos un framework como Angular. Pude haber implementado un buscador temporal. |
| Efectos de hover y transición logrados. | Realizar reuniones diarias de seguimiento. | La parte de categorías aún no tiene una función en el carrusel. |
| Buena gestión del tiempo en la mayoría de las tareas. | Mejorar la documentación del código. | Los diseños de algunos botones y textos pudieron ser más atractivos. |
| Implementación del diseño responsivo: la página es responsiva en todas las pantallas a excepción de los celulares ya que no se nos pidió para este sprint. | Organizar un poco mejor mi trabajo. |  |
| La idea del carrusel de películas me parece muy útil y creativa. | Organizar mejor mis tiempos. |  |
