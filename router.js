const express = require('express');

const { readJSONFile } = require('./main');

const router = express.Router();

let currentIndex = 0;

router.get('/', async (req, res) => {
    try {
        const type = req.query.type; 
        const  contents = ['jokes','quotes','healthtip','poetry','recipes'];

        if(!type || !contents.includes(type)){
            return res.status(400).json({ error: 'Invalid or missing type parameter' });
        }
        
        let filePath = `JSON/${type}.json`;

        let data= await readJSONFile(filePath);
   
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'No data available' });
        }
 
        const count = parseInt(req.query.count) || 1;

        const validCount = Math.min(count, data.length);

        const selectedItems = data.slice(currentIndex, currentIndex + validCount);
        currentIndex = (currentIndex + validCount) % data.length; 

        res.json(selectedItems);     
        
    } catch (err) {
        console.error(`Error processing request: ${err}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;