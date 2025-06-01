const http = require('http');

const server = http.createServer((req, res) => {
    // Генерация массива из 100 случайных чисел от 1 до 17
    const array = Array.from({length: 100}, () => Math.floor(Math.random() * 17) + 1);
    
    // Находим максимальный элемент
    const maxElement = Math.max(...array);
    
    // Сортируем массив по возрастанию
    const sortedArray = [...array].sort((a, b) => a - b);
    
    // HTML-шаблон для вывода результатов
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Node.js</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; margin-bottom: 20px; }
            td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            .section { margin-bottom: 30px; }
            h2 { color: #333; }
        </style>
    </head>
    <body>
        
        <div class="section">
            <h2>Исходный массив 10×10</h2>
            <table>${generateTableHTML(array)}</table>
        </div>
        
        <div class="section">
            <h2>Отсортированный массив по возрастанию</h2>
            <table>${generateTableHTML(sortedArray)}</table>
        </div>
        
        <div class="section">
            <h2>Максимальный элемент массива</h2>
            <p>${maxElement}</p>
        </div>
    </body>
    </html>
    `;
    
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(html);
});

// Функция для генерации HTML таблицы 10×10 из массива
function generateTableHTML(arr) {
    let html = '';
    for (let i = 0; i < 10; i++) {
        html += '<tr>';
        for (let j = 0; j < 10; j++) {
            html += `<td>${arr[i * 10 + j]}</td>`;
        }
        html += '</tr>';
    }
    return html;
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});