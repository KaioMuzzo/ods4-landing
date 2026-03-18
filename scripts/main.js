// funcionalidades da aplicação

history.scrollRestoration = 'manual';
window.addEventListener('load', () => window.scrollTo(0, 0));

// Binary Game
let currentAnswer = 0;
let debounceTimer = null;

function generateBinaryGame() {
    const number = Math.floor(Math.random() * 32);
    currentAnswer = number;
    const binary = number.toString(2).padStart(5, '0');
    const blocks = document.querySelectorAll('#binary-game .blocks');

    blocks.forEach((block, index) => {
        const bit = binary[index];
        block.textContent = bit;
        block.classList.toggle('active', bit === '1');
    });
}

const INSTRUCTIONS_DEFAULT = {
    title: 'Teste agora',
    text: 'Converta o número ao lado para decimal. <br>Você pode tentar quantas vezes quiser.'
};

function setInstructions(title, text) {
    document.querySelector('.game-instructions h2').textContent = title;
    document.querySelector('.game-instructions p').innerHTML = text;
}

function resetGame() {
    setInstructions(INSTRUCTIONS_DEFAULT.title, INSTRUCTIONS_DEFAULT.text);
    generateBinaryGame();
    const input = document.getElementById('answer');
    input.value = '';
    input.closest('.input-wrapper').classList.remove('correct', 'wrong', 'filling');
}

function generateWrongExplanation() {
    const binary = currentAnswer.toString(2).padStart(5, '0');
    const positions = [16, 8, 4, 2, 1];
    const activeBits = positions.filter((_, i) => binary[i] === '1');

    let calcText;
    if (activeBits.length === 0) {
        calcText = `nenhum bit está ativo, então o resultado é <strong>0</strong>`;
    } else {
        const sum = activeBits.join(' + ');
        calcText = `some onde aparece 1: <strong>${sum} = ${currentAnswer}</strong>`;
    }

    return `${calcText}. <br><a href="#" id="try-again">Tentar de novo</a>.`;
}

function validateAnswer(input) {
    const wrapper = input.closest('.input-wrapper');
    const value = parseInt(input.value, 10);

    if (value === currentAnswer) {
        wrapper.classList.add('correct');
        setInstructions(
            'Acertou!',
            'Viu como é simples? <br>Se quiser tentar de novo <a href="#" id="try-again">clique aqui</a>.'
        );
        document.getElementById('try-again').addEventListener('click', (e) => {
            e.preventDefault();
            resetGame();
        });
    } else {
        wrapper.classList.add('wrong');
        setInstructions('Quase!', generateWrongExplanation());
        document.getElementById('try-again').addEventListener('click', (e) => {
            e.preventDefault();
            resetGame();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateBinaryGame();

    const input = document.getElementById('answer');
    input.value = '';
    const wrapper = input.closest('.input-wrapper');

    wrapper.addEventListener('animationend', () => {
        wrapper.classList.remove('filling');
        validateAnswer(input);
    });

    input.addEventListener('input', () => {
        wrapper.classList.remove('filling', 'correct', 'wrong');
        setInstructions(INSTRUCTIONS_DEFAULT.title, INSTRUCTIONS_DEFAULT.text);
        clearTimeout(debounceTimer);

        if (input.value === '') return;

        debounceTimer = setTimeout(() => {
            void wrapper.offsetWidth; // força reflow para reiniciar animação
            wrapper.classList.add('filling');
        }, 300);
    });
});
