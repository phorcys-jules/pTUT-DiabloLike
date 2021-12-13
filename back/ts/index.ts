import express from 'express';
import { connect } from './database.js';
// rest of the code remains same
const app = express();
const PORT = 8752;
/**
 * Routes available
 */
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.get('/ginette', async function (req, res) {

  const conn = await connect();
  await conn.query("INSERT INTO `user` (`id`, `pseudo`, `firstname`, `lastname`, `password`, `email`) VALUES (NULL, 'GinGinGaming', 'Gin', 'ette', '1234', 'ginette@gaming.com')");
  res.json({
    message: 'Ginette Created'
  });
});




//Launch the app
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});