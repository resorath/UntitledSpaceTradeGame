class System extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, name)
    {
        super(scene, x, y, "system");
        this.name = name;
        this.setInteractive().on('pointerdown', this.click);
        this.setInteractive().on('pointerup', this.release);
        
        this.tint = "0x00ff00";
        this.selected = false;
    }

    click(pointer, x, y, event)
    {
        console.log(this);
        this.tint = "0xffffff";
    }

    release(pointer, x, y, event)
    {
        this.tint = "0x00ff00";
        this.scene.picksystem(this);
    }

    select()
    {
        this.selected = true;
        this.tint = "0xff0000";
    }

    unselect()
    {
        this.selected = false;
        this.tint = "0x00ff00";
    }


}