class Level
{
    constructor(playerPosition, goalPosition, surfaces, entities)
    {
        this.surfaces = surfaces;
        this.entities = entities;
        this.player = new Player(playerPosition);
        this.goal = new Goal(goalPosition);

        this.camera = new Camera();

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
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.goal.update();
        
        this.player.update();
        
        
        for (let i = 0; i < this.entities.length; i++)
        {
            this.entities[i].update();
        }
        
        for (let i = 0; i < this.surfaces.length; i++)
        {
            this.surfaces[i].draw();
        }
        
        this.player.showLives();
        this.camera.update();
    }
}

class MenuLevel extends Level
{
    constructor()
    {
        let e = [];
        let s = [
            new Brick(new Vector(500,375)),
            new Brick(new Vector(500+65,375)),
            new Brick(new Vector(500+65+65,375)),
            new Brick(new Vector(500+65+65+65,375)),
            new Brick(new Vector(500+65+65+65+65,375))
        ];
        super(new Vector(500+65+65,0), new Vector(-1000,0), s, e);
    }

    update()
    {
        super.update()
    }
}

class Camera
{
    constructor()
    {
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
        let xOffset = 5;
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
            this.moveY(-player.vy);
        }
        else if (player.position.y+(player.height/2) < canvas.height/2-yOffset)
        {
            this.moveY(8);
        }
    }
}



class LevelGenerator
{
    constructor(difficulty)
    {
        this.difficulty = difficulty;
        this.range = 5;
        this.canvas = document.getElementById("levelCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.levelArray = [0];
        this.data = [];
        this.imgs = [];

        this.brickWidth = 80;

        this.surfaces = [];
        this.entities = [];
    }

    randomLevel()
    {
        this.levelArray = [0];
        for (let i = 0; i < (1+(this.difficulty*5)); i++)
        {
            let n = Math.ceil(Math.random() * this.range);
            this.levelArray.push(n);
        }
    }

    arrayConversion()
    {
        this.data = [];
        this.imgs = [];
        for (let i = 0; i < this.levelArray.length; i++)
        {
            this.imgs.push(new Image());
            
        }
        for (let i = 0; i < this.levelArray.length; i++)
        {
            let img = this.imgs[i];
            img.onload = ()=>
            {
                this.ctx.drawImage(img, 0, 0);
                let pixels = [];
                for (let x = 0; x < this.canvas.width; x++)
                {
                    for (let y = 0; y < this.canvas.height; y++)
                    {
                        let pixel = this.ctx.getImageData(x, y, 1, 1).data;
                        pixels.push({
                            x: x,
                            y: y,
                            pixel: pixel
                        });
                    }
                }
                this.data.push(pixels);
            };
            img.src = "terrain/"+this.levelArray[i]+".png";
        };
        return this.data;
    }

    getLevel()
    {
        let xOffset = 0;
        this.surfaces = [];
        this.entities = [];
        for (let i = 0; i < this.data.length; i++)
        {
            xOffset = i*this.brickWidth*this.canvas.width;
            // console.log(xOffset);
            for (let j = 0; j < this.data[i].length; j++)
            {
                let x = this.data[i][j].x;
                let y = this.data[i][j].y;
                let pixel = this.data[i][j].pixel;
                if (
                    pixel[0] == 0 &&
                    pixel[0] == pixel[1] && 
                    pixel[1] == pixel[2] &&
                    pixel[3] == 255)
                {
                    // console.log(xOffset+(x*this.brickWidth));
                    let brick = new Brick(new Vector(xOffset+(x*this.brickWidth), y*this.brickWidth));
                    this.surfaces.push(brick);
                }
                else if (
                    pixel[0] == 237 &&
                    pixel[1] == 28 && 
                    pixel[2] == 36 &&
                    pixel[3] == 255
                )
                {
                    let turkeySpeed = Math.ceil(Math.random() * this.difficulty+5);
                    let turkeyJump = (Math.random() * this.difficulty) + 0.5;
                    let turkey = new Turkey(new Vector(xOffset+(x*this.brickWidth), y*this.brickWidth), turkeySpeed, turkeyJump);
                    this.entities.push(turkey);
                }
            }
        }
    }
    create()
    {
        let doorX = this.levelArray.length*this.canvas.width*this.brickWidth;
        let doorY = (this.canvas.width/2)*this.brickWidth-100;
        return new Level(new Vector(100, 0), new Vector(doorX,doorY), this.surfaces, this.entities);
    }
    
}