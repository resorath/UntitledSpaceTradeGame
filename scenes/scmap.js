var scmap = new Phaser.Scene('Map');

scmap.preload = function()
{
    this.load.image('system', 'sprites/system.png');
};

scmap.pathgraphics = null;

scmap.create = function()
{  


    scmap.systems = this.physics.add.group();

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

        this.add.existing(system);

        scmap.systems.add(system);

    }
};

scmap.pickedsystems = [];
scmap.picksystem = function(system)
{
    system.tint = "0xff0000";

    scmap.pickedsystems.push(system);

    if(scmap.pickedsystems.length == 2)
    {
        
        scmap.shortest(500);
    }
}

scmap.update = function()
{  
}

scmap.shortest = function(distance) 
{
    var route = coordsToShortestPath(scmap.coords, distance, scmap.pickedsystems[0].name, scmap.pickedsystems[1].name);
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