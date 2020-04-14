 "use strict";

 //Variable du jeu
 var JeuOmbre = JeuOmbre || {};

 //constante du jeu

 JeuOmbre = {
     TAILLE_TUILE: 32,
     VITESSE: 150,
     //nbr maximal de saut avant un cool-down
     MAX_SAUT: 4,
     NOM_LOCAL_STORAGE: "CoureurDesBois",
     score: 0,
     meilleurScore: 0,
     //compteur du niveau en cours
     cycleLvl: 0,
     //le Groupe des ennemis
     groupeE: [],
     //nombre de piece total
     totalPieces: 0,
     //le nombre de fois que le block clé est touché
     compteS: 0,
     //quantité de saut éffectuer en séquence
     nbrSaut: 0,
     //interval temporaire pour les saut
     sautTempo: 0,
     //interval pour les sauts
     tempsSaut: 0,
     //pour vérifier que l'indice n'a pas été révélé
     indice: false,
     //nbr de temps que l'indice sera afficher avant de disparaitre A TOUT JAMAIS
     tIndice: null,
     timer: 0,
     musique: null,
     sonPiece: null,
     sonMort: null,
     mobile:false,
     

 };
 window.addEventListener("load", function () {
     var leJeu = new Phaser.Game(960, 640);

     //Ajout des états du jeu, et sélection de l'état au démarrage
     leJeu.state.add("Demarrage", JeuOmbre.Demarrage);
     leJeu.state.add("IntroJeuMobile", JeuOmbre.IntroJeuMobile);
     leJeu.state.add("ChargementMedias", JeuOmbre.ChargementMedias);

     leJeu.state.add("IntroJeu", JeuOmbre.IntroJeu);
     leJeu.state.add("ChargerNiveau", JeuOmbre.ChargerNiveau);
     leJeu.state.add("JeuLvl", JeuOmbre.JeuLvl);
     leJeu.state.add("FinJeu", JeuOmbre.FinJeu);

     //Vérification d'un meilleur score antérieur enregistré
     JeuOmbre.meilleurScore = localStorage.getItem(JeuOmbre.NOM_LOCAL_STORAGE) == null ? 0 : localStorage.getItem(JeuOmbre.NOM_LOCAL_STORAGE);

     //Définir l'écran (state) au démarrage
     leJeu.state.start("Demarrage");

 }, false);