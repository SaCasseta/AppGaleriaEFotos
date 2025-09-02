const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors());

// Configuração do armazenamento de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});



const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Apenas imagens JPEG ou PNG são permitidas'));
  }
});



// Middleware para servir imagens estáticas
app.use('/uploads', express.static('uploads'));

// Middleware para parsear JSON
app.use(express.json());

// Arquivo para armazenar metadados das postagens
const postsFile = './posts.json';

// Inicializar arquivo JSON se não existir
if (!fs.existsSync(postsFile)) {
  fs.writeFileSync(postsFile, JSON.stringify([]));
}

// Endpoint POST /posts
app.post('/posts', upload.single('photo'), (req, res) => {
  try {
    const { text } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma foto enviada' });
    }
    if (!text || text.trim() === '') {
      // Remove o arquivo se o texto estiver vazio
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'O texto não pode estar vazio' });
    }

    const posts = JSON.parse(fs.readFileSync(postsFile));
    const newPost = {
      id: posts.length + 1,
      text: text.trim(),
      photoUrl: `/uploads/${req.file.filename}`,
      createdAt: new Date().toISOString()
    };

    posts.push(newPost);
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));

    res.status(201).json(newPost);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Erro ao processar a postagem' });
  }
});

// Endpoint GET /posts
app.get('/posts', (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync(postsFile));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao recuperar as postagens' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});