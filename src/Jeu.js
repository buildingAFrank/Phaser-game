"use strict";

var JeuOmbre = JeuOmbre || {};



JeuOmbre.JeuLvl = function () {

    //perso ombre
    this.ombre = null;

    //groupe pieces
    this.pieces = null;

    //groupe ennemis
    this.ennemis = null;

    //carte du Jeu et niveau different
    this.carteJeu = null;
    this.niveaux = null;
    if (JeuOmbre.cycleLvl == 0) {
        JeuOmbre.timer = 130;
        JeuOmbre.score = 0;
    }


    //les images de fond
    this.fond = null;

    //les touches du clavier
    this.lesFleches = null;
    this.spaceKey = null;

    this.leScore;

    this.btnGOn = false;
    this.btnDOn = false;
    this.btnSOn = false;
    this.btnBOn = false;
};

JeuOmbre.JeuLvl.prototype = {
    init: function () {
        //initialisation du score
        JeuOmbre.score = JeuOmbre.score;

    },

    create: function () {
        if (JeuOmbre.mobile) {

            this.cntrMobile();
        }

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.creerFond();

        this.creerMondeJeu();

        this.creerPerso();

        this.creerEnnemi();

        this.creerPieces();

        this.lesFleches = this.game.input.keyboard.createCursorKeys();

        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

        this.physiqueJeu();

        this.creerTimer();

        this.afficherScore();

    },

    /*********************** Creation des platforme*******************/
    creerMondeJeu: function () {


        this.carteJeu = this.add.tilemap("carteJeu");

        this.carteJeu.addTilesetImage("Tuile32_32");


        this.niveaux = {
            "lvl0": this.carteJeu.createLayer('lvl' + JeuOmbre.cycleLvl)
        };
        this.niveaux.lvl0.resizeWorld();
        this.carteJeu.setCollision([], true, this.niveaux.lvl0);

        if (JeuOmbre.cycleLvl == 1) {
            //3 et 16
            var pX = 3;
            var pY = 16;
            var carre;
            this.pSecret = [];

            for (var i = 0; i < 3; i++) {
                carre = this.add.sprite(JeuOmbre.TAILLE_TUILE * (pX + i), JeuOmbre.TAILLE_TUILE * pY, "tuile32", 1)
                carre.anchor.set(0);
                //console.log("placer");
                this.pSecret[i] = carre;
            }
            carre = this.add.sprite(JeuOmbre.TAILLE_TUILE * 5, JeuOmbre.TAILLE_TUILE * 13, "tuile32", 0);
            carre.tint = 0xceff93;
            this.pSecret[3] = carre;
            //this.pSecret[3].body.setSize(32,15,0,0);
            // console.log("cube secret", this.pSecret[3]);
        }
        if (JeuOmbre.mobile) {

            this.cntrMobile();
        }


    },
    /****************************************Arriere Plan****************************************************************/
    creerFond: function () {

        var fond1 = this.add.image(0, 0, "Fond" + (JeuOmbre.cycleLvl + 1));
        fond1.anchor.set(0);

    },
    /***************************************Creation du personnage********************************************************/
    creerPerso: function () {


        if (JeuOmbre.cycleLvl == 2) {
            this.ombre = this.add.sprite(JeuOmbre.TAILLE_TUILE * 28.5, JeuOmbre.TAILLE_TUILE, "ombre", 0);
        } else {
            this.ombre = this.add.sprite(JeuOmbre.TAILLE_TUILE * 1.5, JeuOmbre.TAILLE_TUILE, "ombre", 0);
        }
        this.ombre.anchor.set(0.5);

        this.ombre.animations.add("marche", [1, 2, 3, 4], 10, true);
        this.ombre.animations.add("aGenoux", [5, 6, 7, 8], 4, false);
        this.ombre.animations.add("marcheGenoux", [7, 8], 3, false);
        this.ombre.animations.add("saut", [9, 10, 11, 12, 13, 14, 15, 16], 10, false);
    },
    /**************************************Creation des ennemis************************************************************/
    creerEnnemi: function () {
        var posX,
            posY,
            pos,
            vitesse,
            nbrEnnemi,
            positionsEnnemis,
            ennemi;


        var aEnnemis = [4, 4, 5];
        this.ennemis = this.add.physicsGroup(Phaser.Physics.ARCADE);
        if (JeuOmbre.cycleLvl == 0) {

            nbrEnnemi = aEnnemis[JeuOmbre.cycleLvl];
            positionsEnnemis = [[17, 7], [1, 8], [24, 18], [19, 18]];
            vitesse = [200, 250, 50, 100];
        }


        if (JeuOmbre.cycleLvl == 1) {

            nbrEnnemi = aEnnemis[JeuOmbre.cycleLvl];
            positionsEnnemis = [[13, 6], [11, 9], [15, 14], [15, 11]];
            vitesse = [125, 150, 150, 250];
        }


        if (JeuOmbre.cycleLvl == 2) {

            nbrEnnemi = aEnnemis[JeuOmbre.cycleLvl];
            positionsEnnemis = [[13, 4], [13, 6], [11, 9], [15, 14], [17, 15]];
            vitesse = [125, 100, 150, 50, 40];
        }


        for (var i = 0; i < nbrEnnemi; i++) {
            pos = positionsEnnemis[i];
            posX = (pos[0] * JeuOmbre.TAILLE_TUILE) + JeuOmbre.TAILLE_TUILE / 2;
            posY = (pos[1] * JeuOmbre.TAILLE_TUILE) + JeuOmbre.TAILLE_TUILE / 2;
            ennemi = this.ennemis.create(posX, posY, "ennemiImg");
            ennemi.anchor.set(0.5);
            ennemi.body.setSize(25, 25, 3.5, 3.5);
            ennemi.animations.add("tourne", null, 24, true);
            ennemi.play("tourne");
            ennemi.vitesse = vitesse[i];
            ennemi.body.velocity.x = ennemi.vitesse;
            JeuOmbre.groupeE[i] = ennemi;
        }
        // console.log("Ennemis ", JeuOmbre.groupeE);

    },
    /*************************************** Creation des pieces *************************************************/

    creerPieces: function () {

        var posX,
            posY,
            pos,
            positionPieces,
            nbrPieces;

        this.pieces = this.add.physicsGroup(Phaser.Physics.ARCADE);
        
        if (JeuOmbre.cycleLvl == 0) {
            positionPieces = [[17, 7], [1, 8], [28, 16], [19, 16]];
            nbrPieces = positionPieces.length;

        }

        if (JeuOmbre.cycleLvl == 1) {
            positionPieces = [[4, 11], [15, 6], [16, 9], [16, 18], [19, 14], [28, 8]];
            nbrPieces = positionPieces.length;

        }

        if (JeuOmbre.cycleLvl == 2) {
            positionPieces = [[4, 8], [12, 9], [28, 5], [15, 15]];
            nbrPieces = positionPieces.length;
        }


        //console.log("lesPieces ;", positionPieces);
        var piece;
        for (var i = 0; i < nbrPieces; i++) {
            pos = positionPieces[i];
            posX = (pos[0] * JeuOmbre.TAILLE_TUILE) + JeuOmbre.TAILLE_TUILE / 2;
            //console.log( "posX : ",pos[0]);
            posY = (pos[1] * JeuOmbre.TAILLE_TUILE) + JeuOmbre.TAILLE_TUILE / 2;
            //console.log( "posY : ",pos[1]);
            piece = this.pieces.create(posX, posY, "etoileImg");
            //console.log(piece);
            piece.anchor.set(0.5);
            piece.body.setSize(25, 25, 3.5, 3.5);
            piece.animations.add("Zoom", null, 12, true);
            piece.play("Zoom");
        }
        JeuOmbre.totalPieces += nbrPieces;
    },

    cntrMobile: function () {

        //bouton gauche
        this.btnG = this.add.button(-10, 0, "depGD");
        this.btnG.alpha = 0;
        this.btnG.onInputDown.add(function () {
            this.btnGOn = !this.btnGOn;
        }, this);
        this.btnG.onInputUp.add(function () {
            this.btnGOn = !this.btnGOn;
        }, this);


        this.btnD = this.add.button(this.game.width - 202, 0, "depGD");
        this.btnD.alpha = 0;
        this.btnD.onInputDown.add(function () {
            this.btnDOn = !this.btnDOn;
        }, this);
        this.btnD.onInputUp.add(function () {
            this.btnDOn = !this.btnDOn;
        }, this);

        this.btnS = this.add.button((this.game.width / 2) + 2, 0, "depS");
        this.btnS.anchor.set(0.5, 0);
        this.btnS.alpha = 0;
        this.btnS.onInputDown.add(function () {
            this.btnSOn = !this.btnSOn;
        }, this);
        this.btnS.onInputUp.add(function () {
            this.btnSOn = !this.btnSOn;
        }, this);

        this.btnB = this.add.button(0, this.game.height - 150, "depB");
        this.btnB.alpha = 0;
        this.btnB.onInputDown.add(function () {
            this.btnBOn = !this.btnBOn;
        }, this);
        this.btnB.onInputUp.add(function () {
            this.btnBOn = !this.btnBOn;
        }, this);

    },

    creerTimer: function () {

        this.timer = this.game.time.create(false);
        this.timer.start();
        this.decompte = this.add.text(this.game.width / 4, JeuOmbre.TAILLE_TUILE / 4, "Temps restant: " + JeuOmbre.timer, {
            font: "20px monospace",
            fill: "#f70000",
            align: "center"
        });
        // this.decompte.anchor.set(0,1);
        this.timer.loop(1000, this.updateTimer, this);

    },

    updateTimer: function () {
        JeuOmbre.timer--;
        this.decompte.setText("Temps restant :" + JeuOmbre.timer, true);
        //console.log(this.decompte.text);
    },

    afficherScore: function () {
        this.leScore = this.add.text(this.game.width / 2, JeuOmbre.TAILLE_TUILE / 4, "Score :" + JeuOmbre.score, {
            font: "20px monospace",
            fill: "#f70000",
            align: "center"
        });
        //console.log("leSCORE",this.leScore);
    },




    /********************************************************lvl**************************************************/
    physiqueJeu: function () {

        /***************************Pour le monde*************************/
        this.carteJeu.setCollisionBetween(1, 1000, true, 'lvl' + JeuOmbre.cycleLvl);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.physics.enable(this.niveaux.lvl0, Phaser.Physics.ARCADE);

        this.niveaux.lvl0.body.immovable = true;

        if (JeuOmbre.cycleLvl == 1) {
            var secret = this.pSecret.length;
            //console.log(secret);
            for (var i = 0; i < secret; i++) {
                this.game.physics.enable(this.pSecret[i], Phaser.Physics.ARCADE);
                this.pSecret[i].body.immovable = true;
            }

        }

        /*********************Pour le personnage ************************/
        //Ajout de la physique pour perso ombre
        this.game.physics.enable(this.ombre, Phaser.Physics.ARCADE);

        this.ombre.body.velocity.y = 100;
        //Application d'un effet de gravité
        this.ombre.body.gravity.y = 400;

        this.ombre.body.setSize(10, 40, 7.5, 2.5);

        this.ombre.body.collideWorldBounds = true;

        /**************************Pour les ennemis**********************/

        this.game.physics.enable(this.ennemis, Phaser.Physics.ARCADE);
        this.ennemis.setAll('body.immovable', true);

    },

    update: function () {

        /************************* Secret**********************************/
        this.updateScore();
        //console.log("temps Actuel: ",leJeu.time.now);
        // console.log("tempsSaut :", tempsSaut);
        if (JeuOmbre.cycleLvl == 1) {
            var secret = this.pSecret.length - 1;
            for (var i = 0; i < secret; i++) {
                this.game.physics.arcade.collide(this.pSecret[i], this.ombre);
            }

            this.game.physics.arcade.collide(this.pSecret[3], this.ombre, this.blockCompteur, null, this);
        };

        /************************************Pour le joueur***************/

        this.game.physics.arcade.collide(this.ombre, this.niveaux.lvl0);
        this.ombre.body.setSize(10, 40, 7.5, 2.5);
        //this.ombreSaut = this.ombre.animations.add("saut");
        /*****************deplacement vers la gauche*******************/

        
        
        
        if (this.lesFleches.left.isDown || this.btnGOn) {

            this.ombre.scale.x = -1;
            if (this.lesFleches.down.isDown || this.btnBOn) {
                this.ombre.body.setSize(10, 25, 7.5, 18);
                this.ombre.animations.play('marcheGenoux');
                this.ombre.body.velocity.x = -(JeuOmbre.VITESSE / 3);
            } 
            else if (this.spaceKey.isDown || this.btnSOn) 
            {
                if(this.game.time.now > JeuOmbre.tempsSaut)
                {
                    this.ombre.body.velocity.y = -250;
                    JeuOmbre.nbrSaut += 1;
                    JeuOmbre.tempsSaut = this.game.time.now + 1000;
                    this.ombre.animations.play('saut');
                }
                

            } else {
                this.ombre.body.velocity.x = -JeuOmbre.VITESSE;
                this.ombre.animations.play("marche");
            }

        } 
        //deplacement droit
        else if (this.lesFleches.right.isDown || this.btnDOn)
        {
            this.ombre.scale.x = 1;
            if (this.lesFleches.down.isDown || this.btnBOn) {
                this.ombre.body.setSize(10, 25, 7.5, 18);
                this.ombre.animations.play('marcheGenoux');
                this.ombre.body.velocity.x = JeuOmbre.VITESSE / 3;
            } 
            else if (this.spaceKey.isDown || this.btnSOn) 
            {
                if(this.game.time.now > JeuOmbre.tempsSaut){
                   this.ombre.body.velocity.y = -250;
                   JeuOmbre.nbrSaut += 1;
                JeuOmbre.tempsSaut = this.game.time.now + 1000;
                    this.ombre.animations.play('saut');
                   }
                
                
            } else {
                this.ombre.animations.play("marche");
                this.ombre.body.velocity.x = JeuOmbre.VITESSE;
            }
        } 
        else if (this.spaceKey.isDown || this.btnSOn ) 
            {
                if(this.game.time.now > JeuOmbre.tempsSaut){this.ombre.body.velocity.y = -250;
                this.ombre.animations.play('saut');
                JeuOmbre.nbrSaut += 1;
                JeuOmbre.tempsSaut = this.game.time.now + 1000; }
            }
        
        else if (this.lesFleches.down.isDown || this.btnBOn) 
        {
            this.ombre.body.velocity.x = 0;
            this.ombre.body.setSize(10, 25, 7.5, 18);
            this.ombre.frame = 8;
        } else {
            this.ombre.body.velocity.x = 0;
            if(this.game.time.now < JeuOmbre.tempsSaut){
                this.ombre.animations.play('saut');
            }
            this.ombre.frame = 0;
        }


        // console.log(this.ombre.position);

        //pour empecher le joueur de remonter le niveau en sautant
        if ((this.spaceKey.isDown || this.btnSOn) && JeuOmbre.nbrSaut < JeuOmbre.MAX_SAUT) {
            JeuOmbre.sautTempo = this.game.time.now + 1010;
            //console.log('max');
        }
        if (JeuOmbre.sautTempo < this.game.time.now && JeuOmbre.nbrSaut > 0) {
            JeuOmbre.nbrSaut -= 1;
            // console.log(JeuOmbre.nbrSaut);
        }
        if (JeuOmbre.nbrSaut >= JeuOmbre.MAX_SAUT) {
            JeuOmbre.tempsSaut = this.game.time.now + 1500;
        }

        this.game.physics.arcade.overlap(this.ombre, this.pieces, this.collectePieces, null, null);
        //leJeu.physics.arcade.overlap(this.ombre, this.pieces, this.updateScore, null, null);

        //console.log(nbrSaut);



        /************************ Detection de progression du perso dans les niveaux *******************************/
        if (this.ombre.position.x >= 37 && this.ombre.position.y == 620 && JeuOmbre.cycleLvl == 0) {
            JeuOmbre.cycleLvl = JeuOmbre.cycleLvl + 1;
            //score = collecte;
            this.game.state.start("ChargerNiveau");
        }

        if (this.ombre.position.x >= 869 && this.ombre.position.y == 620 && JeuOmbre.cycleLvl == 1) {
            JeuOmbre.cycleLvl = JeuOmbre.cycleLvl + 1;
            //score = collecte;
            this.game.state.start("ChargerNiveau");
        }

        // Détection et affichage de l'indice
        if (this.ombre.position.x >= 330 && this.ombre.position.y == 396 && JeuOmbre.cycleLvl == 1 && JeuOmbre.indice === false) {

            this.motIndice = this.add.text(this.game.width / 2, this.game.height / 2, "Par 3 fois, un block différent doit être \ntouché pour ouvrir l\'accès!", {
                font: "30px monospace",
                fill: "#fc0000",
                align: "center"
            });
            this.motIndice.anchor.set(0.5);
            JeuOmbre.tIndice = this.game.time.now + 5000;
            if(JeuOmbre.cycleLvl==2){
            JeuOmbre.indice = true;}
        }
        //compteur pour effacer l'indice
        if (JeuOmbre.mobile) {
            if (JeuOmbre.indice) {
                if (this.game.time.now > JeuOmbre.tIndice) {
                    this.motIndice.destroy();
                }
            }

        } 
            if (JeuOmbre.indice) {
                if (this.game.time.now > JeuOmbre.tIndice) {
                    this.motIndice.destroy();
                }
            }
        
        //pour aller a la fin du jeu quand le joueur termine les niveaux
        if (this.ombre.position.x >= 453 && this.ombre.position.x <= 507 && this.ombre.position.y == 620 && JeuOmbre.cycleLvl == 2) {
            JeuOmbre.cycleLvl = JeuOmbre.cycleLvl + 1;
            //score = collecte;
            this.game.state.start("FinJeu");
        }

        //lorsque le joueur est touche
        this.game.physics.arcade.collide(this.ennemis, this.ombre, this.Mort, null, this);

        //lorsque le temps est fini
        if (JeuOmbre.timer <= 0) {
            //console.log("fini");
            this.Mort();
        }

        /**************************** Pour les ennemis*******************/

        this.game.physics.arcade.collide(this.ennemis, this.niveaux.lvl0, this.changerDirection, null, this);

    },

    collectePieces: function (ombre, piece) {

        if (piece.alive == true) {
            piece.alive = false;
            JeuOmbre.score = JeuOmbre.score + 1;
            JeuOmbre.timer += 10;
            JeuOmbre.sonPiece.play();
            piece.destroy();
        }
    },

    updateScore: function (leScore) {
        this.leScore.setText("Score :" + JeuOmbre.score + "/" + JeuOmbre.totalPieces);
        //console.log(this.leScore.text);
    },

    changerDirection: function (ennemi) {
        ennemi.vitesse *= -1;
        ennemi.body.velocity.x = ennemi.vitesse;
    },

    render: function () {
        //this.game.debug.body(this.ombre);
        //leJeu.debug.body(this.pSecret[3]);

    },

    blockCompteur: function () {
        JeuOmbre.compteS += 1;
        if (JeuOmbre.compteS == 3) {
            //console.log('ouvert');
            this.pSecret[2].position.y += JeuOmbre.TAILLE_TUILE * 2;
            this.pSecret[2].position.x -= JeuOmbre.TAILLE_TUILE;
            this.pSecret[0].position.y += JeuOmbre.TAILLE_TUILE;
            this.pSecret[1].position.y += JeuOmbre.TAILLE_TUILE * 2;
            this.pSecret[1].position.x -= JeuOmbre.TAILLE_TUILE;
        }
    },

    Mort: function (ombre) {
        JeuOmbre.sonMort.play();
        this.game.state.start("FinJeu");
    },

    AllerFinJeu: function (ombre, ennemi) {
        this.game.state.start("FinJeu");
    }
};