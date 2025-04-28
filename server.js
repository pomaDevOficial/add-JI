const express = require('express');
const app = express();
const port = 7770;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
