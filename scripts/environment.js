class CollisionBox
{
    constructor(position, width, height)
    {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    collides(other)
    {
        if (this.position.y + this.height > other.position.y && 
            this.position.y < other.position.y + other.height &&
            this.position.x + this.width > other.position.x &&
            this.position.x < other.position.x + other.width
            ) { return true; }

        return false;
    }

    updatePosition(position)
    {
        this.position = position;
    }
}

class Surface
{
    // general entity class for user and enemies
    constructor(position, img, width, height)
    {
        this.position = position;
        this.img = new Image();
        this.img.src = img;

        this.width = width;
        this.height = height;

        this.collision = new CollisionBox(this.position, this.width, this.height);
    }

    draw()
    {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
}

class Brick extends Surface
{
    constructor(position)
    {
        super(position, "images/brick.png", 80, 80);
    }
}