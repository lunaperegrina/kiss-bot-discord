import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
registerFont('caminho/para/hot-gfkaishokk.ttf', { family: 'hot-gfkaishokk' });

// async function generateYouDiedImage() {
//     const canvas = createCanvas(960, 540);
//     const ctx = canvas.getContext('2d');

//     try {
//         // Imagem de fundo
//         const background = await loadImage('images/dark-souls/anor-londo.jpg');
//         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

//         // Barra escura com sombra suave
//         const shadowBarHeight = canvas.height * 0.16;
//         const shadowBarY = (canvas.height - shadowBarHeight) / 2;

//         ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
//         ctx.shadowBlur = canvas.width * 0.05; // aumenta o blur
//         ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'; // diminui a opacidade

//         ctx.beginPath();
//         ctx.roundRect(
//             0,
//             shadowBarY,
//             canvas.width,
//             shadowBarHeight,
//             // canvas.height * 0.02
//         );
//         ctx.fill(); 

//         // ctx.shadowBlur = 0;

//         // Texto com estilo FromSoftware
//         ctx.fillStyle = '#640909'; // Um vermelho mais "fino" que #640909
//         ctx.font = '48px "Times New Roman"'; // Menor e não-bold
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillText('YOU DIED', canvas.width / 2, canvas.height / 2);

//         const buffer = canvas.toBuffer('image/png');
//         fs.writeFileSync('dark_souls_you_died_with_shadow_bar.png', buffer);
//         console.log('Imagem gerada com estilo ajustado!');

//     } catch (err) {
//         console.error('Erro:', err);
//     }
// }

async function generateSekiroImage() {
    const canvas = createCanvas(960, 540);
    const ctx = canvas.getContext('2d');

    try {
        // Imagem de fundo
        const background = await loadImage('images/dark-souls/ash-lake-eternal-dragon.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Barra escura com sombra suave
        // const shadowBarHeight = canvas.height * 0.16;
        // const shadowBarY = (canvas.height - shadowBarHeight) / 2;

        // ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        // ctx.shadowBlur = canvas.width * 0.05; // aumenta o blur
        // ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'; // diminui a opacidade

        // ctx.beginPath();
        // ctx.roundRect(
        //     0,
        //     shadowBarY,
        //     canvas.width,
        //     shadowBarHeight,
        //     // canvas.height * 0.02
        // );
        ctx.fill();

        // ctx.shadowBlur = 0;

        ctx.fillStyle = '#FFF'; // Um vermelho mais "fino" que #640909
        ctx.font = '96px, hot-gfkaishokk, MS Gothic, Meiryo'; // Menor e não-bold
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText('忍殺', canvas.width / 2, canvas.height / 2);

        // Texto com estilo FromSoftware
        ctx.fillStyle = '#FFF'; // Um vermelho mais "fino" que #640909
        ctx.font = 'bold 24px "Times New Roman"'; // Menor e não-bold
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PERLUTAN APLICADO', canvas.width / 2, canvas.height / 2);

        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('dark_souls_you_died_with_shadow_bar.png', buffer);
        console.log('Imagem gerada com estilo ajustado!');

    } catch (err) {
        console.error('Erro:', err);
    }
}


generateSekiroImage();






// // ==================================================== YOU DIED ====================================================

// /** @type {drawFun} Function which draws an YOU DIED. */
// function drawYouDied(ctx, canvas, gen, sliders) {
//     // CONSTANTS
//     const w = canvas.width, h = canvas.height
//     let s = h/1080

//     // USER INPUT
//     const { xOffset, yOffset, scale: s0 } = sliders.position
//     const gradient = sliders.gradient
//     const gradientKey = gradient && gradient.gradient
//     const x0 = xOffset*w + w/2
//     const y0 = yOffset*h + h/2
//     s *= s0

//     //// SHADE
//     // The shade only moves up or down
//     ctx.translate(0, y0)
//     drawShadowBar(ctx, canvas, gen, sliders, s0)
//     ctx.translate(x0, 0)

//     //// TEXT
//     const [caption, vScale] = applyFontSliders(ctx, canvas, gen, sliders, s)
//     if (gradientKey) {
//         var gradientWidth = gradient.gradientScale * 1920 * s
//         ctx.fillStyle = makePresetGradient(ctx, gradientKey, gradientWidth)
//     }
//     drawMultilineText(ctx, caption, {lineHeight: sliders.font.fontSize*s})
// }

// /** PARTIAL: Draws a horizontal shadow bar at y=0. */
// function drawShadowBar(ctx, canvas, gen, sliders, s0) {
//     const w = canvas.width, h = canvas.height
//     const { shadowSize, shadowOpacity, shadowOffset, shadowSoftness } = sliders.shadow

//     if (shadowSize <= 0) return

//     const shadowHeight = shadowSize * .25*h * s0
//     const shadowCenter = shadowOffset * s0 * h
//     const top = shadowCenter - shadowHeight/2
//     const bottom = shadowCenter + shadowHeight/2

//     const softnessLow  = min(1, shadowSoftness)
//     const softnessHigh = max(1, shadowSoftness) - 1

//     const gradient = ctx.createLinearGradient(0, top, 0, bottom)
//     gradient.addColorStop(0, '#0000')
//     gradient.addColorStop(  .25*softnessLow, `rgba(0, 0, 0, ${shadowOpacity})`)
//     gradient.addColorStop(1-.25*softnessLow, `rgba(0, 0, 0, ${shadowOpacity})`)
//     gradient.addColorStop(1, '#0000')
//     ctx.fillStyle = gradient

//     if( softnessHigh > 0 )
//         ctx.filter = `blur(${floor(shadowHeight*softnessHigh/4)}px)`

//     ctx.fillRect(-shadowHeight/2, top, w+shadowHeight, shadowHeight)
//     ctx.filter = 'none'
// }

// function drawMultilineText(ctx, text, {x=0, y=0, lineHeight=0, align='center', strokeFirst=false}={}) {
//     const lines = text.split('\n')
//     let y0 = y
//     if (align=='center') {
//         y0 -= (lines.length-1)/2 * lineHeight
//     } else if (align === 'bottom') {
//         y0 -= (lines.length-1) * lineHeight
//     }
//     if (strokeFirst) {
//         for (let i=0; i<lines.length; i++) {
//             ctx.strokeText(lines[i], x, y0 + lineHeight*i)
//         }
//     }
//     drawMultilineTextRaw(ctx, lines, x, y0, lineHeight)
// }

// /** Draw multiple lines of text above one another, no bells and whistles. */
// function drawMultilineTextRaw(ctx, lines, x, y, lineHeight) {
//     for (let i=0; i<lines.length; i++) {
//         ctx.fillText(lines[i], x, y + lineHeight*i)
//     }
// }

// /** PARTIAL: Sets the appropriate ctx properties. */
// function applyFontSliders(ctx, canvas, gen, sliders, s=1) {
//     const { fontSize, textColor, fontFamily, fontFamilyFallback, vScale, charSpacing, fontWeight } = sliders.font

//     let caption = sliders.caption

//     // TODO: the chrome version doesn't scale with font size while the other one does!
//     if( browserIs.chrome ) {
//         //// If on Chrome: This feature works (but does cause the horizontal centering to misalign)
//         canvas.style.letterSpacing = floor(charSpacing*s) + 'px'
//         ctx.translate(charSpacing*s/2, 0)
//         // TODO: this throws off the glow-blur centering

//     } else if( charSpacing > 0 ) {
//         //// Otherwise: simply inject little hair spaces in between each character
//         const space = ' '.repeat(floor(charSpacing/5))
//         caption = caption.split('').join(space)
//     }

//     ctx.font = `${fontWeight} ${fontSize*s}px ${fontFamily}, ${fontFamilyFallback}`
//     ctx.fillStyle = `rgb(${textColor.join()})`
//     ctx.textAlign = 'center'
//     ctx.textBaseline = 'middle'

//     ctx.scale(1, vScale)

//     return [caption, vScale]
// }

// /**
//  * Makes a horizontal gradient around x=y=0 from an array of colors.
//  *  May specify opacity.
// */
// function makeGradient(ctx, colors, width, x=0, opacity=1) {
//     const gradient = ctx.createLinearGradient(x-width/2, 0, x+width/2, 0)
//     for (let i=0; i<colors.length; i++) {
//         const [r, g, b] = colors[i]
//         gradient.addColorStop(i/(colors.length-1), `rgba(${r}, ${g}, ${b}, ${opacity}`)
//     }
//     return gradient
// }

// function makePresetGradient(ctx, key, width, x=0, opacity=1, mul=undefined) {
//     let colors = GRADIENTS_RGB[key]
//     if (mul) colors = colors.map(c => RGBMul(c, mul).map(byteClamp))
//     return makeGradient(ctx, colors, width, x, opacity)
// }