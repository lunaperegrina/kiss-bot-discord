import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

async function generateYouDiedImage() {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    try {
        // Carrega a imagem de fundo (Anor Londo)
        const background = await loadImage('images/dark-souls/anor-londo.jpg');
        
        // Redimensiona e desenha a imagem de fundo (cobre todo o canvas)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Adiciona uma camada escura para melhorar a legibilidade do texto
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Preto com 70% de opacidade
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Texto "YOU DIED" (estilo Dark Souls)
        ctx.fillStyle = '#8B0000'; // Vermelho escuro (sangue)
        ctx.font = 'bold 72px "Times New Roman", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Texto principal (com borda sutil)
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeText('YOU DIED', canvas.width / 2, canvas.height / 2);
        ctx.fillText('YOU DIED', canvas.width / 2, canvas.height / 2);

        // Opcional: Adiciona uma textura de sangue (se disponível)
        try {
            const bloodTexture = await loadImage('blood_texture.png');
            ctx.globalAlpha = 0.3; // Deixa a textura mais transparente
            ctx.drawImage(bloodTexture, 0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1.0; // Volta ao normal
        } catch (err) {
            console.log("Textura de sangue não encontrada. Ignorando...");
        }

        // Salva a imagem
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('dark_souls_you_died_anor_londo.png', buffer);
        console.log('Imagem gerada: dark_souls_you_died_anor_londo.png');
    } catch (err) {
        console.error('Erro ao carregar a imagem de fundo:', err);
    }
}

generateYouDiedImage();