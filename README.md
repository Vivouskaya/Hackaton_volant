# Hackaton : Scruter le vent

`api` `mailer` `geocode`

## Direction

1. Forker ce projet
2. Choisir ses armes
3. Réaliser une application qui remplis les fonctionalités ci-dessous

> Consignes:
>   * Commite régulièrement et souvent
>   * Les fonctionalités sont classées par ordre de priorité. Il faut les réaliser dans l'ordre.
>   * Demande de l'aide sur slack quand tu es bloqué en donnant toujours une description du problème que tu rencontres

## Contexte

Bob à reçu une voile de traction à Noël. C'est une voile de 4 m² qui vole bien
pour des vents compris entre 8km/h et 30km/h.

![Trajectoire de la voile](http://fromparis.com/images/galleries/powerkite/bagatelle_s_1500.jpg)
![Trajectoire de Bob](https://c2.staticflickr.com/4/3346/3504398524_58dbfc9bd9.jpg)

Afin de pratiquer son nouveau loisir,
Bob veut connaître à l'avance quels sont les jours où les conditions météo 
seront propices pour faire voler sa voile.

Bob a identifié plusieurs `Spot` suffisamment dégagés pour faire voler sa
voile en toute sécurité.

## Fonctionalités

#### 1. Afficher les coordonnées GPS du `Spot`
Scénario:
  Bob est sur la page d'accueil `/`
  Et il saisie l'`adresse` d'un `Spot`
  Quand il valide
  Alors la `latitude` et la `longitude` du `Spot` s'affichent
  Et l'`adresse` du `Spot` s'affiche

> Indice:
> On dit qu'on `géocode` une adresse quand on la converti en coordonées GPS (latitude et longitude)

#### 2. Afficher la vitesse du vent actuel
Scénario:
  Bob est sur la page d'acceuil `/`
  Et il saisie l'`adresse` d'un `Spot`
  Quand il valide
  Alors la vitesse actuelle du vent sur le `Spot` s'affiche en `km/h`

> Indice:
> La vitesse du vent se trouve dans `currently` > `windSpeed` parmis les données renvoyées par l'API de Forecast.io

#### 3. Afficher les jours ou le vent souffle
Scénario:
  Bob est sur la page d'acceuil `/`
  Et il saisie l'`adresse` d'un `Spot`
  Quand il valide
  Alors la vitesse du vent s'affiche pour chaque jour de la semaine
  Et la valeur est `verte` si la vitesse est comprise entre 8km/h et 30km/h
  Et la valeur est `rouge` dans les autres cas
  
> Indice:
> Utiliser les données météo dans `daily`

#### 4. Sauvegarder la liste de ses `Spot`
Pour éviter de saisire l'adresse de ses `Spot` à chaque visite,
Bob veut que l'application garde la liste de ses `Spot` en mémoire

Scénario:
  Bob est sur la page d'accueil `/`
  Et il saisie son `email` et `mot de passe`
  Quand il valide
  Alors la liste de ses `Spot` s'affiche
  Et il peut cliquer sur chaque `Spot` de la liste
  Et il peut ajouter un nouveau `Spot`

#### 5. Affiner les critères météo
Bob a un emploi du temps très chargé.
Afin de mieux planifier ses sorties,
Bob veut des prévisions plus précises:

  * toutes les heures sur les 48h à venir
  * qui prennent en compte la vitesse du vent (même min et max que dans \#3)
  * qui prennent en compte la pluie (Bob préfère coder quand il pleut)
  * qui prennent en compte la nuit (Bob préfère dormir la nuit)

Scénario:
  Bob est sur la page d'index de ses `Spot`
  Quand il clique sur un `Spot` de sa liste
  Alors les plages horraire où il peut faire du kite s'affichent
  Et la vitesse du vent est indiquée pour chaque plage horraire
  Et les heures où il ne peut pas sortir ne s'affichent pas

#### 6. Envoyer un bulletin quotidien
Scénario:
  Bob a un compte utilisateur sur l'application
  Tous les matins
  Quand il y a une plage horraire de vol dans les prochaines 48h sur un de ses `Spot`
  Alors Bob reçoit un email avec la liste des plages horraire de vol sur ses `Spot`
  Et la vitesse du vent est affichée pour chaque plage horraire de vol.

## Ressources

  * [API météo de Forecast.io](https://developer.forecast.io/)
  * [Editeur/formateur de document JSON](http://jsoneditoronline.org/)
  * [LOL](http://devdocs.io/)

#### Php
  * [Librairie geocoder](http://geocoder-php.org/Geocoder/)

#### Ruby
  * [gem geocoder](https://github.com/alexreisner/geocoder) sur github

#### Meteor
  * [geocoder package](https://atmospherejs.com/aldeed/geocoder) sur atmosphere

#### Cerf volant
  * [Cours théorique de voile de traction](http://www.voiledetraction.com/cours-de-powerkite/)

#### Bande son
  * [The Wind of Change, Scorpions](https://www.youtube.com/watch?v=n4RjJKxsamQ)