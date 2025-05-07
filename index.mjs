import express from 'express';
import argon2 from 'argon2';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('pages'));
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'pages' });

})
app.post('/hash', async (req, res) => {
    try{
        const { password } = req.body;
        const hashedPassword = await argon2.hash(password);
        console.log('Hashed Password:', hashedPassword);
       console.log('Password:', password);
    }catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('Internal Server Error');
    }

})
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}
);