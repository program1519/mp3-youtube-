const express = require('express');
const bodyParser = require('body-parser');
const poji_ytmp3 = require('youtube-to-mp3-poji');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); 


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/convert', async (req, res) => {
    const { link } = req.body;

    try {
        const result = await poji_ytmp3(link);
        res.json(result); 
    } catch (error) {
        res.json({ error: `Error occurred: ${error.message}` });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
