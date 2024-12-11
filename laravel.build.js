const fs = require("fs");
const path = require("path");

const archivoDestino = process.argv[2] || "";

// Rutas de los archivos generados por Angular
const indexPath = path.join(__dirname, "dist", "browser", "index.html");

const outputViewPath = path.join(
  __dirname,
  "..",
  "resources",
  "views",
  `${archivoDestino}.blade.php`
);

// Lee el contenido del archivo index.html generado por Angular
fs.readFile(indexPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo index.html:", err);
    return;
  }

  // Reemplaza las rutas de los archivos estáticos en el HTML
  const updatedHtml = data
    .replace(/href="\/?(styles-[A-Z0-9]+\.css)"/g, `href="$1"`)
    .replace(/src="\/?(polyfills-[A-Z0-9]+\.js)"/g, `src="$1"`)
    .replace(/src="\/?(main-[A-Z0-9]+\.js)"/g, `src="$1"`);

  try {
    // Escribe el HTML actualizado en un archivo Blade de Laravel
    fs.writeFileSync(outputViewPath, updatedHtml, "utf8");
    console.log("El archivo blade.php ha sido actualizado exitosamente.");
  } catch (err) {
    console.error("Error al escribir el archivo blade.php:", err);
  }
});
