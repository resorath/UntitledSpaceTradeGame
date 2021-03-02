class Infobox extends Phaser.GameObjects.Graphics
{
    constructor(scene)
    {
        super(scene, { lineStyle: { width: 5, color: 0xFA8128 }, fillStyle: { color: 0x8D4004} });
        this.fillRect(0, 0, 298, 598);
        this.strokeRect(0, 0, 298, 598);
        this.depth = 100;
        

        
        this.txname = this.scene.add.text(90, 50, 'Placeholder').setTintFill(0xffffff);
        this.txname.setVisible(false);

        this.container = scene.cnInfobox;

        this.container.add(this);
        this.container.add(this.txname);
    }

    showSystem(system)
    {
        this.container.add(this.scene.add.sprite(50, 50, system.texture.key));
        this.txname.text = system.name;
        this.txname.setVisible(true);
    }


}