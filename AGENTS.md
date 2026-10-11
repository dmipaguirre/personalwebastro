# AGENTS.md - Personal Web Astro

## Stack
- **Framework**: Astro 5.x
- **Package Manager**: pnpm (not npm)
- **Language**: TypeScript (strict mode)
- **Styling**: Plain CSS with CSS variables (no preprocessor)


## Project Structure
- Blog posts: MDX files in `src/post/*.mdx` (not a content collection; allow embedding Astro components)
- Blog data helper: `src/data/blogPosts.ts` (`getAllPosts()`, `formatPostDate()`, `PostEntry`/`PostFrontmatter` types)
- Blog listing: `src/pages/blog/index.astro` (grid + styles, renders `ArticleCard` for each post) → route `/blog`
- Blog article: `src/pages/post/[slug].astro` (dynamic `getStaticPaths`, wraps MDX content with `BlogLayout`) → route `/post/:slug`
- Article preview: `src/components/blog/ArticleCard.astro` (presentational only, no styles; receives `post: PostEntry`)
- Article layout: `src/layouts/BlogLayout.astro` (full post rendering, SEO, meta)
- SEO component: `src/components/Seo.astro` (handles meta tags, Open Graph, Twitter Cards, and canonical URLs using `Astro.site`)
- Legacy: `src/components/SectionBlog.astro` retained as backup (no longer used by `/blog`)
- Components: `src/components/*.astro`
- Layouts: `src/layouts/Layout.astro`, `BlogLayout.astro`
- Styles: `src/styles/global.css` (CSS variables for theming)

## Path Aliases
- `@/*` maps to `src/*` (configured in tsconfig.json)

## Important Config
- **Site URL**: `astro.config.mjs` sets `site` from `PUBLIC_SITE_URL` env var (`https://` only, no creds/query/hash). Set it before deploying: `PUBLIC_SITE_URL=https://yourdomain.com pnpm build`.
- **Integrations**: `@astrojs/mdx` enabled in `astro.config.mjs:35`; all posts are `.mdx` so they can embed Astro components.
- **Legacy redirects**: `astro.config.mjs:27` maps `/post/post-1` … `/post/post-5` to canonical slugs (generate static redirect pages; also configure 301 at hosting).

## Restricciones
- **Package Manager**: pnpm (not npm)
- No levantes servidores ni hagas `build`, simplemente avisa, que lo hará un humano.
- Si una página se está repitiendo mucho, contempla separarlo a un componente Astro.
- No levantes servidores sin previa autorización

## Tareas pendientes

[] Construir un componente que será la landing que agrupará las categorías de los blog (en este caso, tecnología y lenguajes). Sería BlogDirectory.astro:
    BlogLanding
    ├── título del tema
    ├── descripción del tema
    ├── título de sección: “Últimos artículos”
    └── BlogGrid
[] Completar el componente ArticleCard.astro que pintará un único cuadro de un artículo
[] BlogGrid.astro coloca muchas tarjetas en cuadrícula. Su única resposabilidad es el diseño de la cuadrícula
    logGrid
    ├── ArticleCard: Terminal Linux
    ├── ArticleCard: CSS Grid
    └── ArticleCard: Flexbox

# Instrucciones para implementar una sección de blog dinámica en Astro

## Objetivo

Mejora la sección del blog existente para que presente artículos almacenados en archivos Markdown (`.md`) de forma dinámica, consistente y visualmente atractiva. El diseño debe admitir artículos con contenidos y estructuras internas diferentes sin requerir HTML ni estilos escritos manualmente para cada artículo.

## Antes de modificar el código

1. Inspecciona la estructura actual del proyecto y revisa, como mínimo:
   - La página que monta el blog.
   - `src/components/SectionBlog.astro`.
   - `src/layouts/Layout.astro`.
   - La configuración actual de Astro y de las colecciones de contenido.
   - Uno o varios archivos Markdown representativos.
   - Las rutas que generan las páginas individuales de los artículos.
2. Identifica la versión de Astro y utiliza las API compatibles con esa versión. No mezcles ejemplos de versiones diferentes.
3. Conserva la arquitectura, los estilos, las convenciones de nombres y las dependencias existentes cuando sea razonable. No reemplaces archivos ni rediseñes el sitio entero sin necesidad.
4. Antes de implementar, resume brevemente qué archivos piensas modificar y por qué. Si faltan datos imprescindibles, indícalo en lugar de inventar rutas o estructuras.

## Principios de arquitectura

### 1. Separar contenido, datos y presentación

- Markdown es la fuente del contenido editorial.
- Los metadatos del *frontmatter* proporcionan la información necesaria para mostrar las tarjetas.
- `SectionBlog.astro` se encarga de obtener, ordenar y representar la colección de artículos y de definir la composición de la cuadrícula.
- Un componente reutilizable de tarjeta controla el marcado y la presentación de cada artículo.
- Las páginas individuales muestran el artículo completo; las tarjetas muestran únicamente una vista previa.

No dupliques manualmente la tarjeta para cada archivo Markdown.

### 2. Establecer un contrato de metadatos

Revisa primero qué campos existen en los artículos actuales. Reutilízalos siempre que sea posible y evita renombrarlos o exigir migraciones sin una razón clara.

Si es necesario definir o mejorar el esquema, utiliza validación mediante Zod y las convenciones de Content Collections correspondientes a la versión instalada de Astro.

Los metadatos habituales pueden incluir:

- `title`: título del artículo.
- `description`: resumen breve para la tarjeta.
- `publishDate`: fecha de publicación, utilizando el nombre que ya adopte el proyecto.
- `category`: categoría o etiqueta, si se utiliza.
- `featuredImage`: imagen representativa, si existe.
- `cardVariant` o `featured`: solo si el diseño realmente necesita distinguir artículos especiales.

Haz opcionales los campos que no sean imprescindibles y proporciona valores predeterminados únicamente cuando tengan sentido editorial. No agregues propiedades solo por anticipación.

No intentes deducir automáticamente la estructura completa del artículo a partir de sus encabezados o párrafos para decidir cómo dibujar la tarjeta. Prioriza metadatos explícitos y predecibles.

### 3. Crear una tarjeta reutilizable

Crea o adapta un componente, por ejemplo `ArticleCard.astro`, que reciba los datos de un artículo mediante props.

- Mantén una estructura semántica y consistente.
- Muestra el título y, cuando exista, la descripción, la categoría, la fecha y la imagen.
- Si un campo opcional no existe, oculta ese elemento o usa un fallback visual deliberado.
- No dejes espacios vacíos, imágenes rotas ni etiquetas con valores `undefined`.
- Limita la longitud visual del título y la descripción mediante CSS cuando sea apropiado, sin alterar innecesariamente el contenido original.
- Mantén accesibles los enlaces, las imágenes y los estados de foco.
- Evita repetir lógica de obtención de datos dentro de cada tarjeta.

No muestres el cuerpo completo del Markdown en la tarjeta. Utiliza `description` como resumen; si no existe, aplica un fallback razonable basado en las convenciones del proyecto.

### 4. Usar variantes visuales con moderación

El diseño puede ser editorial o asimétrico, pero no se deben crear múltiples componentes independientes si las diferencias son principalmente de tamaño, color, espaciado o distribución.

- Empieza con una tarjeta común y un sistema CSS Grid responsive.
- Si se necesita una tarjeta destacada, añade una variante explícita, por ejemplo `featured` o `variant="hero"`.
- Reserva componentes separados para casos que tengan estructura o comportamiento verdaderamente distintos, como un reproductor de audio o un bloque de código interactivo.
- Evita crear seis variantes por defecto sin comprobar que cada una sea necesaria.
- Si se implementa un selector de variantes, usa un mapa tipado y un fallback explícito. No utilices condicionales dispersos por toda la página.

La variante visual no debe cambiar la URL ni la identidad del artículo.

### 5. No asignar diseños arbitrarios por índice

No asignes automáticamente una variante con `index % variantes.length` como estrategia principal. Esto puede hacer que un artículo cambie de diseño solo porque se añadió o eliminó otro artículo, y puede asignar un formato que no corresponde a su contenido.

Prefiere este orden:

1. Variante explícita en los metadatos, si el proyecto la necesita.
2. Diseño estándar como fallback.
3. Diseño destacado determinado por una regla editorial clara, si corresponde.

Si se propone una composición cíclica como efecto visual opcional, debe ser deliberada, estable y no depender de campos incompatibles con los metadatos predeterminados.

### 6. Cuadrícula responsive y composición

- Usa CSS Grid para la distribución de las tarjetas.
- En pantallas pequeñas, prioriza una sola columna o una composición sencilla.
- En pantallas medianas y grandes, permite varias columnas y, si el diseño lo requiere, una tarjeta destacada que ocupe más espacio.
- Asegura que las tarjetas mantengan una altura y alineación razonables sin recortar información esencial.
- No supongas que una secuencia concreta de tarjetas siempre sumará las columnas previstas.
- Comprueba el comportamiento con un número impar de artículos, con pocos artículos y con artículos sin imagen.
- Conserva el sistema de estilos actual (por ejemplo, Tailwind o CSS convencional) en vez de introducir otro sin justificación.

## Rutas y enlaces

- Inspecciona cómo se generan actualmente las páginas individuales de los artículos.
- Usa la propiedad de identificación y la estrategia de rutas compatibles con la versión instalada de Astro y con las rutas reales del proyecto.
- No asumas que `entry.slug` existe en todas las versiones; comprueba la API utilizada por el proyecto.
- Comprueba que cada tarjeta enlaza a una página existente y que no se generan enlaces duplicados o rotos.
- No cambies las URL públicas sin necesidad. Si una modificación las afecta, explica el impacto y conserva compatibilidad cuando sea posible.

## Rendimiento, accesibilidad y mantenimiento

- Evita dependencias nuevas si las capacidades nativas de Astro y CSS son suficientes.
- Utiliza carga diferida para imágenes que no estén en la parte inicial visible, cuando corresponda.
- Define textos alternativos adecuados para imágenes informativas; usa `alt=""` para imágenes puramente decorativas.
- Utiliza elementos HTML semánticos y enlaces con un propósito comprensible.
- Evita duplicar estilos y lógica entre componentes.
- No agregues JavaScript del lado del cliente si el diseño puede resolverse en tiempo de compilación con Astro y CSS.

## Validación final

Al terminar:

1. Ejecuta las comprobaciones disponibles en el proyecto, como `astro check`, el linter y/o el comando de build configurado.
2. Corrige errores de TypeScript, de esquema, de importación y de renderizado que hayas introducido.
3. Comprueba artículos con metadatos completos y artículos con campos opcionales ausentes.
4. Comprueba que las páginas individuales siguen funcionando.
5. Comprueba la cuadrícula en móvil, tablet y escritorio.
6. Resume los archivos modificados, las decisiones tomadas, las comprobaciones ejecutadas y cualquier limitación que permanezca.

## Criterios de aceptación

La implementación se considera correcta si:

- Todos los artículos de la colección se obtienen dinámicamente, sin enumerarlos manualmente.
- Las tarjetas usan un componente reutilizable y consistente.
- Las diferencias en el cuerpo Markdown no rompen el diseño de las tarjetas.
- Los metadatos opcionales se manejan sin errores ni espacios vacíos inesperados.
- Las variantes especiales, si existen, son explícitas y justificadas.
- La cuadrícula responde bien a diferentes tamaños de pantalla y cantidades de artículos.
- Los enlaces llevan a las páginas individuales correctas.
- El proyecto compila y no introduce errores nuevos.
- La solución se integra con la arquitectura existente en vez de sustituirla innecesariamente.
