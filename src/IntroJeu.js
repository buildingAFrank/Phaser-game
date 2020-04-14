"use strict";


var JeuOmbre = JeuOmbre || {};



JeuOmbre.IntroJeu = function IntroJeu() {


};

JeuOmbre.IntroJeu.prototype = {

        create: function () {
            if (JeuOmbre.mobile) {

                var fond0 = this.add.image(0, 0, "Fond0");
                fond0.anchor.set(0);
                
                //instruction gauche
                var espG = this.add.sprite(96, 240, "depGD");
                espG.anchor.set(0.5);
                var ombreG = this.add.sprite(150,150,"ombre",2);
                ombreG.scale.x =-4;
                ombreG.scale.y =4;
                this.game.add.tween(espG.scale).to({x:1.5,y:1.5},500,Phaser.Easing.Linear.none,true,0,1,true);
                this.game.add.tween(espG).from({alpha:0.2},500,Phaser.Easing.Linear.none,true,0,1,false);
                
                //instruction droite
                var espD = this.add.sprite(this.game.width - 96, 240, "depGD");
                espD.anchor.set(0.5);
                var ombreD = this.add.sprite(this.game.width-150,150,"ombre",2);
                ombreD.scale.x=4;
                ombreD.scale.y =4;
                this.game.add.tween(espD.scale).to({x:2,y:1.5},500,Phaser.Easing.Linear.none,true,2000,1,true);
                this.game.add.tween(espD).from({alpha:0.2},500,Phaser.Easing.Linear.none,true,2000,1,false);
                
                //instruction saut
                var espS = this.add.sprite(this.game.width/2, 241, "depS");
                espS.anchor.set(0.5);
                var ombreS=this.add.sprite(this.game.width/2,245,"ombre",12);
                ombreS.anchor.set(0.5);
                ombreS.scale.x=4;
                ombreS.scale.y=4;
                this.game.add.tween(espS.scale).to({x:1.5,y:1.5},500,Phaser.Easing.Linear.none,true,4000,1,true);
                this.game.add.tween(espS).from({alpha:0.2},500,Phaser.Easing.Linear.none,true,4000,1,false);
                
                //instruction baisser
                var espB = this.add.sprite(this.game.width/2, this.game.height - 76, "depB");
                espB.anchor.set(0.5);
                var ombreB = this.add.sprite(this.game.width/2,this.game.height-10,"ombre",7);
                ombreB.anchor.set(0.5,1);
                ombreB.scale.x=4;
                ombreB.scale.y=4;
                this.game.add.tween(espB.scale).to({x:1.5,y:1.5},500,Phaser.Easing.Linear.none,true,6000,1,true);
                var dTw=this.game.add.tween(espB).from({alpha:0.2},500,Phaser.Easing.Linear.none,true,6000,1,false);
                dTw.onComplete.add(this.Charger,this);

                espG.tint = 0x00ff00;
                espD.tint = 0x00ff00;
                espS.tint = 0x00ff00;
                espB.tint = 0x00ff00;

                espG.alpha = 0.1;
                espD.alpha = 0.1;
                espS.alpha = 0.1;
                espB.alpha = 0.1;
                
                

            } else {


                var fond0 = this.add.image(0, 0, "Fond0");
                fond0.anchor.set(0);

                var titreJeu = this.add.text(this.game.width / 2, 40, "Coureur des bois", {
                    font: "40px monospace",
                    fill: "#00ff12",
                    align: "center"
                });
                titreJeu.anchor.set(0.5);


                var instructionJeu = this.add.text(this.game.width / 2, 150, "Utilisez les fleches pour vous deplacez \n de gauche a droite ou vous baissez, \n et utilisez la barre d\'espace pour sauter!", {
                    font: "40px monospace",
                    fill: "#11f5a6",
                    align: "center"
                });
                instructionJeu.anchor.set(0.5);

                var allerJeu = this.add.text(this.game.width / 2, 250, "Cliquez sur le bouton pour jouer", {
                    font: "30px monospace",
                    fill: "#ffffff",
                    align: "center"
                });
                allerJeu.anchor.set(0.5);

                var boutonJouer = this.add.button(this.game.width / 2, this.game.height / 2, "btnJouer", this.Charger, this);

                boutonJouer.anchor.set(0.5, 0);
            }
            if (JeuOmbre.musique == null) {
                //console.log("musique=null");
                JeuOmbre.musique = this.add.audio("musique", 0.4);
                JeuOmbre.sonPiece = this.add.audio("pieces", 1);
                JeuOmbre.sonMort = this.add.audio("mort", 1);
            } 
        },

            Charger: function () {
                this.game.state.start("ChargerNiveau");

            }

        };