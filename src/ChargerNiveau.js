"use strict";

var JeuOmbre = JeuOmbre ||{};


    JeuOmbre.ChargerNiveau = function ChargerNiveau() {

    };

    JeuOmbre.ChargerNiveau.prototype = {
        create: function () {
            if (JeuOmbre.cycleLvl === 0) {
                this.add.audio("musique",0.4).play();
            }
            this.game.state.start("JeuLvl");

        },
    };
