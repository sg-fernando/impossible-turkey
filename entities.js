
class Vector
{
    // plan to use this class for easier enemy ai calculations
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
    get length()
    {
        return Math.sqrt((this.x*this.x) + (this.y*this.y));
    }

    minus(other)
    {
        return new Vector(this.x-other.x, this.y-other.y);
    }

    plus(other)
    {
        return new Vector(this.x+other.x, this.y+other.y);
    }
}

class SpriteAnimation
{
    constructor(inner, range, onTwos)
    {
        // using animations folder
        this.outer = "animations";
        this.inner = inner;
        this.begin = range[0];
        this.end = range[1];
        this.current = this.begin;

        this.onTwos = onTwos;
        this.timing = 2;
        this.timingCurrent = 1;
    }

    get src()
    {
        return this.outer + "/" + this.inner + "/" + this.current + ".png";
    }

    nextFrame()
    {
        if (this.onTwos)
        {
            this.timingCurrent++;
            if (this.timingCurrent > this.timing)
            {
                this.timingCurrent = 1;
                return;
            }
        }
        if (this.current == this.end)
        {
            this.current = this.begin;
        }
        else
        {
            this.current++;
        }
    }

    previousFrame()
    {
        if (this.onTwos)
        {
            this.timingCurrent++;
            if (this.timingCurrent > this.timing)
            {
                this.timingCurrent = 1;
                return;
            }
        }
        if (this.current == this.begin)
        {
            this.current = this.end;
        }
        else
        {
            this.current--;
        }
    }
}

class Entity
{
    constructor(position, ctx, img, width, height)
    {
        this.mainImgSrc = img;

        this.position = position;
        this.img = new Image();
        this.img.src = img;
        this.ctx = ctx;

        this.width = width;
        this.height = height;
    }

    draw()
    {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
}

class Movable extends Entity
{
    // general entity class for user and enemies
    constructor(position, ctx, img, width, height, mass, step, jump)
    {
        super(position, ctx, img, width, height);
        this.step = step;
        this.mass = mass;
        this.vx = 0;
        this.vy = 0;
        this.ay = gravity;
        this.jumpMultiplier = jump;

        this.moveAnimation;
        this.standAnimation;

        this.surfaces = [];
    }

    jump()
    {
        // maybe add check of velocity so that can double jump higher when at apex of first jump
        this.vy = 0;
        this.vy -= this.step*this.jumpMultiplier;
    }

    animateMove()
    {
        if (this.vx > 0)
        {
            this.moveAnimation.nextFrame();
            this.img.src = this.moveAnimation.src;
        }
        else if (this.vx < 0)
        {
            this.moveAnimation.previousFrame();
            this.img.src = this.moveAnimation.src;
        }
    }

    surfaceCollision(x, y)
    {
        let tempEntity = new Object();
        tempEntity.position = new Vector(x, y);
        tempEntity.width = this.width;
        tempEntity.height = this.height;

        for (let i = 0; i < this.surfaces.length; i++)
        {
            if (this.surfaces[i].collision.collides(tempEntity))
            {
                return true;
            }
        }
        return false;
    }

    move()
    {
        // FIXME dampening occurs at end of jump
        if (this.surfaceCollision(this.position.x + this.vx, this.position.y))
        {
            this.vx = 0;
        }
        if (this.surfaceCollision(this.position.x, this.position.y + this.vy))
        {
            this.jumpCount = 0;
            this.vy = 0;
        }
        this.position.x += this.vx;
        this.position.y += this.vy;
        this.vy += this.ay;
    }

    update()
    {
        this.move();
        this.draw();
        this.animateMove();
    }
}

class Player extends Movable
{
    constructor(position, ctx)
    {
        super(position, ctx, "images/player.png", 60, 60, 2, 5, 2.5);
        this.jumpCount = 0;
        this.jumpLimit = 2;
        this.moveAnimation = new SpriteAnimation("player-moving", [1,8], true)
        this.lives = 3;
    }

    canJump()
    {
        if (this.jumpCount < this.jumpLimit) return true;
        return false;
    }

    showLives()
    {
        this.ctx.font = "48px serif";
        this.ctx.fillText("Lives: " + this.lives, 10, 50);

    }

    respawn()
    {
        this.position = new Vector(50,0);
        this.vy = 0;
    }

    loseLife()
    {
        if (this.lives > 0)
        {
            this.lives--;
            this.respawn();
        }
        else
        {
            // TODO game over
            console.log("game over");
        }
    }
}

class Turkey extends Movable
{
    constructor(position, ctx, step)
    {
        super(position, ctx, "images/turkey.png", 60, 60, 2, step, 3);
        // TODO 
        // flip turkey on turn
        // change animation for feet to reach bottom
        this.moveAnimation = new SpriteAnimation("turkey-moving", [1,9], true)
        this.direction = 1;
        this.vx = this.step;
        let offset = 10;
        this.collision = new CollisionBox(
            new Vector(this.position.x + offset, this.position.y + offset), 
            this.width-(offset*2), 
            this.height-(offset*2)
        );
    }

    randomTurkey()
    {
        return "images/turkey.png"
    }

    move()
    {
        super.move();
        if (this.vx == 0)
        {
            this.direction *= -1;
            this.vx = this.direction*this.step;
        }
        this.collision.updatePosition(this.position);
    }

    checkHit()
    {
        if (this.collision.collides(player))
        {
            player.loseLife();
            console.log("LIFE");
        }
    }

    update()
    {
        super.update();
        this.checkHit();
    }
}

class Goal extends Entity
{
    constructor(position, ctx)
    {
        super(position, ctx, "images/key.png", 60, 60);
        let offset = 15
        this.collision = new CollisionBox(
            new Vector(this.position.x + offset, this.position.y + offset), 
            this.width-(offset*2), 
            this.height-(offset*2)
        );
    }

    checkGoal()
    {
        if (this.collision.collides(player))
        {
            console.log("GOAL");
        }
    }

    update()
    {
        this.draw();
        this.checkGoal();
    }
}