class CollisionBox
{
    constructor(offset, width, height, parent)
    {
        this.offset = offset;
        this.width = width;
        this.height = height;
        this.parent = parent;
    }

    top(other)
    {
        if (this.parent.position.y + this.parent.height >= other.position.y && 
            this.parent.position.y <= other.position.y + other.height &&
            this.parent.position.x + this.parent.width >= other.position.x &&
            this.parent.position.x <= other.position.x + other.width
            ) { return true; }

        return false;
    }

    side(other)
    {
        if (this.parent.position.x + this.parent.width >= other.position.x && 
            this.parent.position.x <= other.position.x + other.width) { return true; }

        return false;
    }

    checkCollision(other)
    {
        if (this.top(other))
        {
            other.vy = 0;
            other.position.y = this.parent.position.y - other.height;
            other.jumpCount = 0;
        }
    }
}

class Surface
{
    // general entity class for user and enemies
    constructor(position, ctx, img, width, height)
    {
        this.position = position;
        this.img = new Image();
        this.img.src = img;
        this.ctx = ctx;

        this.width = width;
        this.height = height;

        this.collision = new CollisionBox(new Vector(0,0), width, height, this);
    }

    draw()
    {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
}