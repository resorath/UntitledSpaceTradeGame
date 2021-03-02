var scmap = new Phaser.Scene('Map');

scmap.preload = function()
{
    this.load.image('system', 'sprites/system.png');
};

scmap.pathgraphics = null;

scmap.cnWorld = null;
scmap.cnStatus = null;
scmap.cnInfobox = null;
scmap.systems = [];

scmap.create = function()
{  
    scmap.cnWorld = this.add.container(0, 0).setSize(1300, 800);
    scmap.cnStatus = this.add.container(1300, 0).setSize(300, 200);
    scmap.cnInfobox = this.add.container(1300, 200).setSize(300, 600);

    scmap.gui = {}
    
    scmap.gui.infobox = new Infobox(this);

    scmap.gui.status = new Phaser.GameObjects.Graphics(this, { lineStyle: { width: 5, color: 0xFA8128 }, fillStyle: { color: 0x8D4004} });
    scmap.gui.status.fillRect(0, 2, 298, 200);
	scmap.gui.status.strokeRect(0, 2, 298, 200);
	scmap.gui.status.depth = 100;
    scmap.cnStatus.add(scmap.gui.status);


    scmap.coords = {
        a: {x: 50, y: 500},
        b: {x: 300, y: 300},
        c: {x: 450, y: 400},
        d: {x: 900, y: 500},
        e: {x: 540, y: 650}
    };

    for(const name in scmap.coords)
    {
        var coord = scmap.coords[name];

        var system = new System(scmap, coord.x, coord.y, name);

        scmap.systems.push(scmap);
        scmap.cnWorld.add(system);

    }

};

scmap.pickedsystems = [];
scmap.picksystem = function(system)
{
    if(scmap.pickedsystems.length == 2)
    {
        scmap.pickedsystems[0].unselect();
        scmap.pickedsystems[1].unselect();
        scmap.pickedsystems = [];
        scmap.pathgraphics.destroy();
    }

    if(scmap.pickedsystems.length == 1 && scmap.pickedsystems[0].name == system.name)
    {
        scmap.pickedsystems[0].unselect();
        scmap.pickedsystems = [];
        return;
    }

    system.select();

    scmap.pickedsystems.push(system);

    if(scmap.pickedsystems.length == 2)
    {
        scmap.shortest(500, scmap.pickedsystems[0].name, scmap.pickedsystems[1].name);
    }
}

scmap.update = function()
{  
}

scmap.shortest = function(distance, start, end) 
{
    var route = coordsToShortestPath(scmap.coords, distance, start, end);
    console.log(route);
    
    if(scmap.pathgraphics != null)
        scmap.pathgraphics.destroy();

    scmap.pathgraphics = this.add.graphics();
    scmap.pathgraphics.lineStyle(2, 0xffffff);

    var prev = null;
    for(const node in route.path)
    {
        if(prev == null)
        {
            prev = route.path[node];
            continue;
        }

        var a = scmap.coords[prev];
        var b = scmap.coords[route.path[node]];

        var line = new Phaser.Geom.Line(a.x, a.y, b.x, b.y);
        scmap.pathgraphics.strokeLineShape(line);

        prev = route.path[node];

    }


}