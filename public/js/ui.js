export function drawUI(ctx, engine, gamewidth, gameheight) {
    const padding = 20;
    const lineHeight = 24;
    let y = gameheight + padding;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, gamewidth, gameheight, lineHeight * 8);

    ctx.fillStyle = 'white';
    ctx.font = '18px Monospace';

    ctx.fillText(`Gold: ${engine.gold}`, padding, y);
    y += lineHeight;
    ctx.fillText(`Base HP: ${engine.entities.base.hp}        Level: ${engine.level}`, padding, y);
    y += lineHeight;
    ctx.fillText(`Towers: ${engine.entities.towers.length}           Walls: ${engine.entities.walls.length}`, padding, y);
    y += lineHeight;
    ctx.fillText(`Enemies: ${engine.entities.monsters.length}          Particles: ${engine.entities.particles.length}`, padding, y);
    y += lineHeight;
    ctx.fillText(`Game Ticks: ${engine.gameTicks}      Arrows ${engine.entities.arrows.length} `, padding, y);


    if (engine.isGameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '48px Monospace';
        ctx.fillText('Game Over', gamewidth * 0.25, gameheight * 0.25);
    }
}
