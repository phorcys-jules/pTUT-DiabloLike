# pTUT-DiabloLike
## Présentation du projet
DiabloLike est réalisé dans le cadre d'un projet tutoré de LP Ciasie de l'IUT Nancy-Charlemagne promotion 2021-2022.
Le but de ce projet est de réalisé un jeu de type Hack'n'slash type Diablo. Nous avons choisi de garder l'aspect principal du jeu qui est de combattre des donjons ou des monstres afin d’acquérir de l’expérience pour évoluer notre personnage et avancer dans le jeu.


## Auteurs
- FRANCOIS Jules
- MANGENOT Alex
- UNSER Kévin
- WILT Lilian

## Tuteur : 
- LEROUX Alexandre

## Lancer le projet :
le serveur se lance avec :
    - npm run build
    - puis npm run serve
## Contribuer au projet :
Pour contribuer qu projet, il est nécéssaire d'installer quelques outils : 
- TypeScript : 
    - npm install typescript --save-dev
    - Convertir un fichier ts : 
            - npx tsc .\front\ts\User.ts --outDir .\front\js\
            - ou npx tsc {--watch} pour compiler back ou front (rèf tsconfig.json)
            - ou npm run build / npm run dev pour tout compiler
