"use strict"

var JeuOmbre = JeuOmbre || {};


JeuOmbre.IntroJeuMobile = function() {};

JeuOmbre.IntroJeuMobile.prototype = {






    create: function () {


        var boutonJouer = this.add.button(this.game.width / 2, this.game.height / 2, "btnJouer", this.Charger, this);

        boutonJouer.anchor.set(0.5, 0);
        if (JeuOmbre.musique == null) {
            //console.log("musique=null");
            JeuOmbre.musique = this.add.audio("musique", 0.4);
            JeuOmbre.sonPiece = this.add.audio("pieces", 1);
            JeuOmbre.sonMort = this.add.audio("mort", 1);
        } 




    },


    gererPleinEcran: function () {
        //console.log("prise en charge ecran");
        if (!this.game.scale.isFullScreen) {
            Ecran.mettrePleinEcran();

        }
        Ecran.verrouillerEcran(Ecran.PAYSAGE);
    },

    Charger: function () {
        this.gererPleinEcran();
        this.game.state.start("IntroJeu");

    }




};