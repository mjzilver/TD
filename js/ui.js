export function drawUI(ctx, engine, gamewidth, gameheight) {
    const padding = 20;
    const lineHeight = 24;
    const uiHeight = lineHeight * 6 + padding; // Adjusted height for UI

    // Draw UI background covering the full screen width
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, gameheight, gamewidth, uiHeight);

    // Set text styles
    ctx.fillStyle = 'white';
    // center text
    ctx.textAlign = 'center';
    ctx.font = '18px Monospace';

    // Helper function to center text
    function drawCenteredText(text, y) {
        const textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (gamewidth) / 2, y);
    }

    let y = gameheight + lineHeight; // Adjusted y position

    // Draw UI elements
    drawCenteredText(`Gold: ${engine.gold}`, y);
    y += lineHeight;
    drawCenteredText(`Base HP: ${engine.entities.base.hp}         Level: ${engine.level}`, y);
    y += lineHeight;
    drawCenteredText(`Towers: ${engine.entities.towers.length}    Walls: ${engine.entities.walls.length}`, y);
    y += lineHeight;
    drawCenteredText(`Enemies: ${engine.entities.monsters.length}    Particles: ${engine.entities.particles.length}`, y);
    y += lineHeight;
    drawCenteredText(`Game Ticks: ${engine.gameTicks}    Arrows: ${engine.entities.arrows.length}`, y);

    // Draw Game Over message if applicable
    if (engine.isGameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '48px Monospace';
        const gameOverText = 'Game Over';
        const textWidth = ctx.measureText(gameOverText).width;
        ctx.fillText(gameOverText, (gamewidth - textWidth) / 2, gameheight / 2);
    }
}
