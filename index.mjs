import express from 'express';
import fetch from 'node-fetch';
import getRandomQuote from 'get-random-quote';

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const quote = await getRandomQuote();
        res.render('index.ejs', { quote });
    } catch (error) {
        res.render('index.ejs', { quote: { text: "Could not fetch quote.", author: "N/A" } });
    }
});

app.get('/users', async (req, res) => {
    const url = 'https://fakerapi.it/api/v1/users?_quantity=5';
    const response = await fetch(url);
    const data = await response.json();
    res.render('users.ejs', { users: data.data });
});

app.get('/books', async (req, res) => {
    const url = 'https://fakerapi.it/api/v1/books?_quantity=5';
    const response = await fetch(url);
    const data = await response.json();
    res.render('books.ejs', { books: data.data });
});

app.get('/form', (req, res) => {
    res.render('form.ejs');
});

app.post('/result', async (req, res) => {
    const userRes = await fetch('https://fakerapi.it/api/v1/users?_quantity=1');
    const userData = await userRes.json();
    const name = userData.data[0];

    const bookRes = await fetch('https://fakerapi.it/api/v1/books?_quantity=1');
    const bookData = await bookRes.json();
    const book = bookData.data[0];
    res.render('result.ejs', { name,bookCategory: book, user, bookInfo });
});

app.listen(3000, () => {
   console.log('server started');
});