
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
    // general entity class for user and enemies
    constructor(position, ctx, img, width, height, mass, step, jump)
    {
        this.mainImgSrc = img;

        this.position = position;
        this.img = new Image();
        this.img.src = img;
        this.ctx = ctx;

        this.width = width;
        this.height = height;
        this.step = step;
        this.mass = mass;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.jumpMultiplier = jump;

        this.walkAnimation;
        this.jumpAnimation;
        this.standAnimation;
    }

    draw()
    {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    jump()
    {
        // maybe add check of velocity so that can double jump higher when at apex of first jump
        this.vy = 0;
        this.vy -= this.step*this.jumpMultiplier;
        this.ay = gravity;
    }

    animate()
    {
        if (this.vx > 0)
        {
            this.walkAnimation.nextFrame();
            this.img.src = this.walkAnimation.src;
        }
        else if (this.vx < 0)
        {
            this.walkAnimation.previousFrame();
            this.img.src = this.walkAnimation.src;
        }
        // else if (this.vx == 0)
        // {
            // this.img.src = this.mainImgSrc;
        // }
    }

    move()
    {
        this.position.x += this.vx;
        this.position.y += this.vy;
        this.vy += this.ay;
        this.vx += this.ax;
    }
}

class Player extends Entity
{
    constructor(position, ctx)
    {
        super(position, ctx, "images/player.png", 60, 60, 2, 5, 3);
        this.jumpCount = 0;
        this.jumpLimit = 2;
        this.walkAnimation = new SpriteAnimation("player-moving", [1,8], true)
    }

    canJump()
    {
        if (this.jumpCount < this.jumpLimit) return true;
        return false;
    }
}

class Turkey extends Entity
{
    constructor(position, ctx)
    {
    }

    randomTurkey()
    {
        return "images/turkey.png"
    }
}