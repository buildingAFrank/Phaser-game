"use strict"

var JeuOmbre = JeuOmbre||{};


 JeuOmbre.FinJeu = function() {};



    JeuOmbre.FinJeu.prototype = {


        init: function () {
            var fond5 = this.add.image(0, 0, "Fond4");
            fond5.anchor.set(0);

        },
        create: function () {

            JeuOmbre.meilleurScore = Math.max(JeuOmbre.score, JeuOmbre.meilleurScore);
            localStorage.setItem(JeuOmbre.NOM_LOCAL_STORAGE, JeuOmbre.meilleurScore);

            var texteFin = {
                font: "40px monospace",
                fill: "#ffffff",
                align: "center"
            };

            var finDuJeu = this.add.text(this.game.width / 2, this.game.height / 3, "C\'est fini! \n Vous avez fait " + JeuOmbre.score + " points!", texteFin);
            finDuJeu.anchor.set(0.5, 0);

            var mScore = this.add.text(this.game.width / 2, this.game.height / 2, "Le meilleur score est de: " + JeuOmbre.meilleurScore + " points!", texteFin);
            mScore.anchor.set(0.5, 0);


            var leBouton = this.add.button(this.game.width / 2, this.game.height * 0.9, "jouerBtn", this.rejouer, this, 1, 0);
            leBouton.anchor.set(0.5, 1);

        },

        rejouer: function () {
            //Aller à l'écran de jeu
            JeuOmbre.cycleLvl = 0;
            JeuOmbre.totalPieces = 0;
            JeuOmbre.timer = 130;
            JeuOmbre.score = 0;
            JeuOmbre.indice=false;
            this.game.sound.stopAll();
            this.game.state.start("Demarrage");
        }
    };
