# Cakemix

![Cakemix](banner.png)

![Version](https://img.shields.io/github/v/tag/wonder-wonder/cakemix-front)
[![License](https://img.shields.io/github/license/wonder-wonder/cakemix-server)](LICENSE)

Cakemix is opensource document management system for all creative team.  
You can make a small team, folder and document on the Cakemix, also write a document with markdown, and edit with multiple users in realtime.  

# Features

- [x] Opensource(MIT)
- [x] Write document with markdown
- [x] Edit document with multiple users in realtime
- [x] Make document folder
- [x] Make small team
- [x] Security
- [x] Support PWA
- [x] Supprot Mobile-Friendly Design

# How to use

This repository is front side of Cakemix, you need server side ([here](https://github.com/wonder-wonder/cakemix-server)) to use Cakemix.

# For developer

## Environment

You need to make `config` directory in root of repository, and you also need to make `.env.dev` `.env.prod` file in the directory.

```
.
|-- config
    |- .env.dev
    |- .env.prod
```

after that, write these env in the env file.  
**Example of env dir and file are located at root (config.example)**

```
WS_SCHEME=ws or wss
HTTP_SCHEME=http or https
DOMAIN=DOMAIN or localhost(:PORT)
BASE_PATH=/v1 (see server's API path)
```

## Installation

All step is following Nuxt.js step.  
First of all, you need to install dependencies.

```bash
# install dependencies
npm install
```

If you build for development, you can use below command.

```bash
# serve with hot reload
npm run dev
```

If you build for production, you can use below command.  Static files are generated in the dist directory.

```bash
# generate static project
$ npm run generate
```

## Cakemix Release Policy
### Branches
- main
  - latest stable version
- release/vx.x.x
  - bata version (release candidate)
- develop
  - alpha version (version of developing phase)
- feat/xxx
  - branch for implementation a feature or fixing a bug 
- hotfix/xxx
  - branch for fixing a bug that existing main branch and it needs to fix as soon as possible

```
feat/xxx        x     x
              /   \ /   \
develop   ---x-----x-----x-------x---x----- (PR required)
                    \           /    |
release/x            x--x--x   /     |
                            \ /      |
main      -------------------x-------x----- (PR required)
                              \     /
hotfix/x                         x
```

### Versioning (Major.Minor.Patch)
#### Major
- will increment when breaking changes occurred
#### Minor
- will increment when new features are added
#### Patch
- will increment when bugs are fixed

# License

**Released under the [MIT license](LICENSE)**