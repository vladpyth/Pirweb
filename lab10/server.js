const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const originalFile = 'original_data.txt';
const sortedAscFile = 'sorted_asc.txt';
const sortedDescFile = 'sorted_desc.txt';

// Генерация массива дробных чисел
function generateRandomArray() {
    return Array.from({length: 100}, () => (Math.random() * 16 + 1).toFixed(4));
}

// Сохранение массива в файл
function saveArrayToFile(filename, array) {
    fs.writeFileSync(filename, array.join('\n'), 'utf-8');
}

// Чтение массива из файла
function readArrayFromFile(filename) {
    if (!fs.existsSync(filename)) return null;
    return fs.readFileSync(filename, 'utf-8').split('\n');
}

// Обработчик HTTP-запросов
const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // Генерация нового массива при первом запросе
        const originalArray = generateRandomArray();
        saveArrayToFile(originalFile, originalArray);
        
        // Чтение HTML-шаблона
        fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, html) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading HTML file');
            }
            
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        });
    } 
    else if (req.url === '/api/data' && req.method === 'GET') {
        // Отправка исходных данных
        const originalData = readArrayFromFile(originalFile);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({data: originalData}));
    }
    else if (req.url === '/api/sort' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const {order, decimals} = JSON.parse(body);
            const originalData = readArrayFromFile(originalFile);
            
            // Сортировка массива
            let sortedData = [...originalData].map(Number);
            sortedData.sort((a, b) => order === 'asc' ? a - b : b - a);
            
            // Форматирование чисел
            sortedData = sortedData.map(num => num.toFixed(decimals));
            
            // Сохранение в файл
            const filename = order === 'asc' ? sortedAscFile : sortedDescFile;
            saveArrayToFile(filename, sortedData);
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({data: sortedData}));
        });
    }
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});