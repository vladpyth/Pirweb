class BlockBuilder {
    constructor() {
        this.colors = new Set(['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD133', '#33FFD1', '#D133FF', '#FF3333']);
        //this.texts = new Set(['Первый блок', 'Второй блок', 'Третий блок', 'Четвертый блок', 'Пятый блок', 'Шестой блок', 'Седьмой блок', 'Восьмой блок']);
    }

    createBlock(color, text, headingType) {
        const block = document.createElement('div');
        block.className = 'block';
        block.style.backgroundColor = color;
        block.style.width = '200px';
        block.style.height = '100px';

        const heading = document.createElement(`h${headingType}`);
        heading.textContent = text;

        block.appendChild(heading);
        document.body.appendChild(block);
        this.positionBlock(block);
    }

    positionBlock(block) {
        const blocks = document.querySelectorAll('.block');
        const offset = blocks.length * 120;
        block.style.top = `${offset}px`;
        block.style.left = '10px'; // Можно настроить позицию
    }
}

// Инициализация
const blockBuilder = new BlockBuilder();
const colorSelect = document.getElementById('colorSelect');
const addBlockButton = document.getElementById('addBlockButton');
const textInput = document.getElementById('textInput');
const headingType = document.getElementById('headingType');

// Заполнение выпадающего списка цветами
blockBuilder.colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = color;
    colorSelect.appendChild(option);
});

addBlockButton.addEventListener('click', () => {
    const selectedColor = colorSelect.value;
    const inputText = textInput.value || 'Новый блок';
    const selectedHeadingType = headingType.value;

    blockBuilder.createBlock(selectedColor, inputText, selectedHeadingType);
});