const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware agar server bisa membaca data berbentuk JSON yang dikirim dari HTML/JS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menjadikan folder ini sebagai tempat file statis (index.html, style.css, script.js)
app.use(express.static(__dirname));

// Data akun sementara (disimpan di memori server)
const users = [];

// Endpoint untuk REGISTER (Menerima data dari form Sign Up)
app.post('/api/register', (req, res) => {
    const { username, email, birthMonth, birthDay, birthYear, password } = req.body;

    // Cek apakah username sudah dipakai
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username sudah terdaftar!' });
    }

    // Simpan data akun baru ke daftar
    const newUser = { username, email, birthDate: `${birthDay}/${birthMonth}/${birthYear}`, password };
    users.push(newUser);

    console.log('Akun baru berhasil terdaftar:', newUser);
    res.json({ success: true, message: 'Registrasi berhasil!' });
});

// Jalankan server di port 3000
app.listen(PORT, () => {
    console.log(`Server backend berjalan di http://localhost:${PORT}`);
});

module.exports = app;