class Vector
{
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
    constructor(position, ctx, img, width, height, mass, step)
    {
        this.position = position;
        this.img = new Image();
        this.img.src = img;
        this.ctx = ctx;

        this.width = width;
        this.height = height;
        this.mass = mass;
        this.step = step;
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

    moveLeft()
    {
        
    }
}

class Player extends Entity
{
    constructor(position, ctx, width, height)
    {
        super(position, ctx, "images/meat.png", width, height, 1, 5);
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