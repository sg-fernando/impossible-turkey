class Level
{
    constructor(playerPosition, goalPosition, ctx, surfaces, entities)
    {
        this.ctx = ctx
        this.surfaces = surfaces;
        this.entities = entities;
        this.player = new Player(playerPosition, ctx);
        this.goal = new Goal(goalPosition, ctx);
        player = this.player;

        this.player.surfaces = this.surfaces;
        for (let i = 0; i < this.entities.length; i++)
        {
            this.entities[i].surfaces = this.surfaces;
        }
    }

    setSurfaces(surfaces)
    {
        this.surfaces = surfaces;
        this.player.surfaces = surfaces;
        for (let i = 0; i < this.entities.length; i++)
        {
            this.entities[i].surfaces = surfaces;
        }
    }

    appendSurface(surface)
    {
        this.surfaces.push(surface);
        this.player.surfaces.push(surface);
        for (let i = 0; i < this.entities.length; i++)
        {
            this.entities[i].surfaces.push(surface);
        }
    }

    update()
    {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.player.showLives();
        this.player.update();

        this.goal.update();

        for (let i = 0; i < this.entities.length; i++)
        {
            this.entities[i].update();
        }

        for (let i = 0; i < this.surfaces.length; i++)
        {
            this.surfaces[i].draw();
        }
    }
}