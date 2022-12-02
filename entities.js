
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

class Entity
{
    // general entity class for user and enemies
    constructor(position, ctx, img, width, height, mass, step)
    {
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
        this.ay = 0;
        this.jumpMultiplier = 3;
    }

    draw()
    {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    checkCollision(other)
    {
        if (this.position.x + this.width >= other.position.x && 
            this.position.x <= other.position.x + other.width) { return true; }

        if (this.position.y + this.height >= other.position.y && 
            this.position.y <= other.position.y + other.height) { return true; }

        return false;
    }

    jump()
    {
        console.log("JUMP");
        this.vy -= this.step*this.jumpMultiplier;
        this.ay = gravity;
    }

    move()
    {
        this.position.x += this.vx;
        this.position.y += this.vy;
        this.vy += this.ay;
    }
}

class Player extends Entity
{
    constructor(position, ctx, width, height)
    {
        super(position, ctx, "images/meat.png", width, height, 2, 5);
        this.jumpCount = 0;
        this.jumpLimit = 2;
    }

    canJump()
    {
        // TODO add 
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