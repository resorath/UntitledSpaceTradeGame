'use strict';

var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
        }
    },
    scene: [scmap]
};

var game = new Phaser.Game(config);

var systems = {}