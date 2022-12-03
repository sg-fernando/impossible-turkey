class CollisionBox
{
    constructor(offset, width, height)
    {
        this.offset = offset;
        this.width = width;
        this.height = height;
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
    }

    draw()
    {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
}