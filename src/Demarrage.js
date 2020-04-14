"use strict";

var JeuOmbre = JeuOmbre || {};

JeuOmbre.Demarrage = function () {};

    JeuOmbre.Demarrage.prototype = {

        init: function () {
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            this.input.maxPointers = 2;
            
            
//            if (!this.game.device.desktop && (this.game.device.iOS || this.game.device.android)) {
//			this.game.scale.forceOrientation(true, false);
			//this.game.scale.enterIncorrectOrientation.add(this.afficherImage, this);
			//this.game.scale.leaveIncorrectOrientation.add(this.enleverImage, this);
	//	}
        },

        preload: function () {
            this.load.path = "medias/img/";
            this.load.path = "medias/img/";
            this.load.images(["rondelle", "barreFond", "barreChargement"]);
        },

        create: function () {
            this.game.state.start("ChargementMedias");
        }
    };