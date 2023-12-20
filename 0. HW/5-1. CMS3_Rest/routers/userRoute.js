const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mycrm.db');

// USER
router.get('/:page?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'user.html'));
});

router.get('/list/:page?', (req, res) => {
    const query = 'SELECT * FROM users';
    
    db.all(query, (err, rows) => {
        if (err) return handleDatabaseError(res, err);
        
        const itemsPerPage = 20;
        const page = parseInt(req.params.page) || 1;
        const currPageRows = paginateData(rows, page, itemsPerPage);
        const totalPages = calculateTotalPages(rows.length, itemsPerPage);
        
        res.json({
            currPageRows,
            totalPages,
            page,
        });
    });
});

// Function for pagination
function paginateData(rows, page, itemsPerPage) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const currPageRows = rows.slice(startIndex, endIndex);
    
    return currPageRows;
}

function calculateTotalPages(totalRows, itemsPerPage) {
    return Math.ceil(totalRows / itemsPerPage);
}

// Funtion to handle DB Error
function handleDatabaseError(res, err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = router;