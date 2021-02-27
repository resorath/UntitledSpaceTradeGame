var scmap = new Phaser.Scene('Map');

scmap.preload = function()
{
    this.load.image('system', 'sprites/system.png');
};



scmap.create = function()
{
    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffffff);

    systems = this.physics.add.group();

    var coords = {
        a: {x: 50, y: 500},
        b: {x: 300, y: 300},
        c: {x: 450, y: 400},
        d: {x: 900, y: 500},
        e: {x: 540, y: 650}
    };

    for(const name in coords)
    {
        var coord = coords[name];

        systems.create(coord.x, coord.y, 'system');

    }

    var route = coordsToShortestPath(coords, 500, "a", "d");

    var prev = null;
    for(const node in route.path)
    {
        if(prev == null)
        {
            prev = route.path[node];
            continue;
        }

        var a = coords[prev];
        var b = coords[route.path[node]];

        var line = new Phaser.Geom.Line(a.x, a.y, b.x, b.y);
        graphics.strokeLineShape(line);

        prev = route.path[node];

    }

};

scmap.update = function()
{  
}