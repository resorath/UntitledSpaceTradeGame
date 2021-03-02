class Infobox extends Phaser.GameObjects.Graphics
{
    constructor(scene)
    {
        super(scene, { lineStyle: { width: 5, color: 0xFA8128 }, fillStyle: { color: 0x8D4004} });
        this.container = scene.cnInfobox;


        this.fillRect(this.container.x, this.container.y, 298, 598);
        this.strokeRect(this.container.x, this.container.y, 298, 598);
        this.depth = 50;

        scene.add.existing(this);
        
        this.init();
        
    }

    init()
    {
        this.txname = this.scene.add.text(100, 50, 'Placeholder').setTintFill(0xffffff);
        this.txname.setVisible(false);

        this.container.add(this.txname);

    }

    showSystem(system)
    {
        this.container.add(this.scene.add.sprite(50, 50, system.texture.key));
        this.txname.text = system.name;
        this.txname.setVisible(true);
    }

    empty()
    {
        this.container.removeAll();
        this.init();
    }

}