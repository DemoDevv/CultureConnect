## Import des données CSV

L'import des données requiert qu'un service `mongodb` soit lancé sur le port `27017`.

Se placer dans le dossier `services/`, puis lancer les commandes suivantes:

Import des oeuvres:

```shell
node .\lib\importArtworks.mjs
```

Import des musées:

```shell
node .\lib\importMuseums.mjs
```

## Scripts

Pour utiliser les scripts, il faut d'abord ce rendre dans le dossier scripts:

`cd scripts`

Ensuite, il faut donner les droits d'exécution aux scripts:

`chmod +x *.sh`

Enfin, il suffit d'exécuter le script setup.sh:

`./setup.sh`
