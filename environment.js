class CollisionBox
{
    constructor(offset, width, height, parent)
    {
        this.offset = offset;
        this.width = width;
        this.height = height;
        // this.parent = parent;
        this.position = parent.position;
        this.height = parent.height;
        this.width = parent.width;
    }

    top(other)
    {
        if (this.position.y + this.height >= other.position.y && 
            this.position.y <= other.position.y + other.height &&
            this.position.x + this.width >= other.position.x &&
            this.position.x <= other.position.x + other.width
            ) { return true; }

        return false;
    }

    right(other)
    {
        if (this.position.y + this.height >= other.position.y && 
            this.position.y <= other.position.y + other.height &&
            this.position.x + this.width >= other.position.x &&
            this.position.x <= other.position.x + other.width
            ) { return true; }

        return false;
    }

    checkCollision(other)
    {
        if (this.top(other))
        {
            // FIXME goes to top of surface straight away
            // nee to account for bottom and sides so that it doens't teleport to top if hit on side or bottom
            other.vy = 0;
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