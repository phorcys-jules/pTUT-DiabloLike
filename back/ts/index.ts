import express from 'express';

const app = express();
const PORT = 8752;

app.get('/', (req, res) => res.send('Express + TypeScript Server'));



app.get('/user', function (req, res ) {
  console.log('coucou');
  res.send("You're on the user page");
});


//api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});