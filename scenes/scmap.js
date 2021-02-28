var scmap = new Phaser.Scene('Map');

scmap.preload = function()
{
    scmap.load.image('system', 'sprites/system.png');
};

scmap.pathgraphics = null;

scmap.create = function()
{

    systems = this.physics.add.group();

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

        systems.create(coord.x, coord.y, 'system');

    }

    scmap.shortest(500);

};

scmap.update = function()
{  
}

scmap.shortest = function(distance) 
{
    var route = coordsToShortestPath(scmap.coords, distance, "a", "d");
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