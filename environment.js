class CollisionBox
{
    constructor(offset, width, height, parent)
    {
        this.offset = offset;
        this.width = width;
        this.height = height;
        this.parent = parent;
    }

    collides(other)
    {
        if (this.parent.position.y + this.parent.height >= other.position.y && 
            this.parent.position.y <= other.position.y + other.height &&
            this.parent.position.x + this.parent.width >= other.position.x &&
            this.parent.position.x <= other.position.x + other.width
            ) { return true; }

        return false;
    }

    checkCollision(other)
    {
        if (this.collides(other))
        {
            // FIXME goes to top of surface straight away
            // nee to account for bottom and sides so that it doens't teleport to top if hit on side or bottom
        
            // if (other.position.x <= this.parent.position.x + this.parent.width &&
            //     other.position.x + other.width > this.parent.position.x &&
            //     other.position.y > this.parent.position.y)
            // {
            //     other.position.x = this.parent.position.x + this.parent.width;
            // }
            // if (this.parent.position.x + this.parent.width >= other.position.x)
            // {
            //     console.log("right");
            // }
            // else if (this.parent.position.x <= other.position.x + other.width)
            // {
            //     console.log("left");
            // }
            // else if (this.parent.position.y + this.parent.height >= other.position.y)
            // {
            //     console.log("bottom");
            // }
            // else
            // {
            // }
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