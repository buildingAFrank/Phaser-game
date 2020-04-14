"use strict";


var JeuOmbre = JeuOmbre || {};


JeuOmbre.ChargementMedias = function () {
    this.rondelle;
};

JeuOmbre.ChargementMedias.prototype = {

    preload: function () {
        //URL commun au chargement de toutes les images
        this.load.path = "medias/img/";

        //Chargement de l'image du bouton
        this.load.image("jouerBtn", "bouton-jouer.png", 134, 136);

        for (var i = 0; i < 5; i++) {

            this.load.image("Fond" + i, "Fond" + i + ".png", 960, 640);
        }

        //Chargement des feuilles de sprites
        this.load.spritesheet("ombre", "silouhette225_45.png", 30, 45);
        this.load.spritesheet("ennemiImg", "ennemi-spriteSheet.png", 32, 32);
        this.load.spritesheet("etoileImg", "PIECE.png", 25, 25);

        //Chargement des données de la carte du jeu (TileMap)
        this.load.tilemap("carteJeu", "mondeJeu.json", null, Phaser.Tilemap.TILED_JSON);
        //Chargement de l'image des tuiles utilisées (TileSet)
        this.load.image("Tuile32_32", "Tuile32_32.png");
        this.load.image("depGD","espaceGD.png",192,480);
        this.load.image("depB","espaceBaisser.png",950,150);
        this.load.image("depS","espaceSaut.png",570,475);

        this.load.spritesheet("tuile32", "Tuile32_32.png", 32, 32);

        //chargement du bouton pour jouer
        this.load.image("btnJouer", "bouton-jouer.png", 134, 136);

        //Chargement des sons du jeu
        this.load.path = "medias/sons/";
        this.load.audio("pieces", ["coins.mp3", "coins.ogg"]);
        this.load.audio("mort", ["gameOver.mp3", "gameOver.ogg"]);
        this.load.audio("musique", ["San An.mp3", "San An.ogg"]);


        //Afficher les barres pour illustrer l'avancement du chargement
        //Afficher et centrer l'image du fond...
        var fondBarreChargement = this.game.add.image(this.game.width / 2, this.game.height / 2, "barreFond");
        fondBarreChargement.anchor.set(0.5);

        //Afficher la barre de chargement comme telle...
        var barreChargement = this.game.add.sprite(0, 0, "barreChargement");
        //barreChargement.anchor.set(0.5);
        barreChargement.centerX = JeuOmbre.width / 2;
        barreChargement.centerY = JeuOmbre.height / 2;
        this.load.setPreloadSprite(barreChargement);


        //Afficher le pourcentage chargé après le chargement de chaque média
        //Créer et afficher le texte
        this.pourcentTxt = this.add.text(this.game.width / 2, this.game.height * 0.75, "0 %", {
            font: "bold 64px Arial",
            fill: "#001252",
            align: "center"
        });

        this.pourcentTxt.anchor.set(0.5);

        //Mettre le gestionnaire d'événement
        this.load.onFileComplete.add(this.afficherPourcentage, this);


        //Créer et afficher la rondelle
        this.rondelle = this.add.image(this.game.width / 2, this.game.height / 4, "rondelle");
        this.rondelle.anchor.set(0.5);


    },

    afficherPourcentage: function (progression, cle) {
        this.pourcentTxt.text = progression + " %"

    },

    loadUpdate: function () {

        this.rondelle.angle += 2;

    },


    create: function () {
        //Quand le chargement des actifs est complété - on affiche l'écran du jeu

        this.str = navigator.userAgent;
        this.android = new RegExp("Android");
        this.apple = new RegExp("like Mac OS");
        this.testApple = this.apple.test(this.str);
        this.testAndroid = this.android.test(this.str);
        this.intro = null;

        if (this.testApple || this.testAndroid) {
            //console.log("mobile");
        }

        if (!this.game.device.desktop && (this.testApple || this.testAndroid)) {
            //console.log("android");
            JeuOmbre.mobile=true;
            this.game.state.start("IntroJeuMobile");

        } else {
            //console.log("desktop");

            this.game.state.start("IntroJeu");
       }
    }
};






















