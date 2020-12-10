var path = require('path');
const express = require('express')
const handlebars = require('express-handlebars');
const app = express()
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');



// Connect to DB
db.connect();


app.use(methodOverride('_method'));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")))

const port = 3000


app.engine('.hbs', handlebars(
  {
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    }
  }
));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));



route(app);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})