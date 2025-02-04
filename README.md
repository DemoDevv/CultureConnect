## Import des données CSV

L'import des données requiert qu'un service `mongodb` soit lancé sur le port `27017`.

Se placer dans le dossier `services/CultureAPI`, puis lancer les commandes suivantes:

Import des oeuvres:

```shell
node .\lib\importArtworks.mjs
```

Import des musées:

```shell
node .\lib\importMuseums.mjs
```

Se placer dans le dossier `services/ratp`, puis la commande suivante:

Import des arrêts d'Île-de-France:

```shell
node .\lib\importStops.mjs
```

## Lancement des tests de l'applications

L'application possède des jeux de tests pour chaque microservice. Il est possible de lancer chaque test de microservice avec ces commandes, à la racine du projet:

```shell
npm run test-users
npm run test-cultureapi
npm run test-ratp
```

## Lancement de toute l'application

Afin de lancer l'ensemble de l'applicaion (client en react + micro-services), on peut lancer une commande à la racine du projet:

```shell
npm run all
```

Il faudra évidemment avoir installé les dépendances en utilisant

```shell
npm i
```

... sur tous les services, le client, ainsi que la racine du projet.

Les services sont configurés pour n'autoriser les requêtes venant seulement de `localhost:5175`, grâce aux **CORS**.

## Scripts

Pour utiliser les scripts, il faut d'abord ce rendre dans le dossier scripts:

`cd scripts`

Ensuite, il faut donner les droits d'exécution aux scripts:

`chmod +x *.sh`

Enfin, il suffit d'exécuter le script setup.sh:

`./setup.sh`

![image](https://github.com/DemoDevv/CultureConnect/assets/73246070/29dd22a5-a799-4ff0-8c78-7c7938cf1b09)

C'est faux, ce n'est pas une application de l'État pour ceux qui n'auraient pas compris. 😉
