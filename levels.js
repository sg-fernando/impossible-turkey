class Level
{
    constructor(playerPosition, goalPosition, ctx, surfaces, entities)
    {
        this.ctx = ctx
        this.surfaces = surfaces;
        this.entities = entities;
        this.player = new Player(playerPosition, ctx);
        this.goal = new Goal(goalPosition, ctx);

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

        this.goal.update();
        
        this.player.showLives();
        this.player.update();


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

class Camera
{
    constructor()
    {
        this.everything = [];
    }

    moveX(amount)
    {
        level.player.position.x += amount;
        level.goal.position.x += amount;

        for (let i = 0; i < level.surfaces.length; i++)
        {
            level.surfaces[i].position.x += amount;
        }
        for (let i = 0; i < level.entities.length; i++)
        {
            level.entities[i].position.x += amount;
        }
    }

    moveY(amount)
    {
        level.player.position.y += amount;
        level.goal.position.y += amount;
        
        for (let i = 0; i < level.surfaces.length; i++)
        {
            level.surfaces[i].position.y += amount;
        }
        for (let i = 0; i < level.entities.length; i++)
        {
            level.entities[i].position.y += amount;
        }
    }

    update()
    {
        console.log(player.position);
        let xOffset = 15;
        let yOffset = 10;
        if (player.position.x+(player.width/2) > canvas.width/2+xOffset)
        {
            this.moveX(-player.step);
        }
        else if (player.position.x+(player.width/2) < canvas.width/2-xOffset)
        {
            this.moveX(player.step);
        }

        if (player.position.y+(player.height/2) > canvas.height/2+yOffset)
        {
            this.moveY(-7);
        }
        else if (player.position.y+(player.height/2) < canvas.height/2-yOffset)
        {
            this.moveY(7);
        }
    }
}

class Main
{
    constructor()
    {
        fetch('./levels.json')
        .then((response) => response.json())
        .then((json) => console.log(json));

    }
}