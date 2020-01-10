[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<p align="center">
  <img src="./images/WedEditor.png" alt="WedEditor">
</p>
<br />
<div>
  <div>
    Wed Editor is a web-based editor that assists users in editing XML documents according to a schema,
     for example TEI-XML documents.
    <br />
    This is a modified version by <a href="https://github.com/DataScouting">DataScouting</a>, 
    based on <a href="https://github.com/mangalam-research/wed">Wed</a>
    by <a href="https://github.com/mangalam-research">Mangalam Research Center for Buddhist Languages</a>
  </div>
</div>


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [License](#license)
* [Acknowledgements](#acknowledgements)


<!-- ABOUT THE PROJECT -->
## About The Project
Wed is a schema-aware editor for XML documents. It runs in a web browser.


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.


### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Linux-based Operating System (for example, Ubuntu)
* Text Editor (for example, nano)
* Git
* Docker
* Docker Compose


### Installation
1. Open a terminal
2. Clone the Wed Editor
```sh
git clone https://github.com/datascouting/wed.git
```
3. Open the Wed Editor project
```sh
cd wed-editor
``` 
4. Edit the `docker-compose-development.yml` file
    - Change the build args (SERVER_USER_UID, SERVER_USER_GID, SERVER_USER_PASSWORD)
        - Find your UID and GID, using the following command
        ```sh
            id
        ```
    - Change the host port (8080) (Optional)
5. Make the DoComUtil (Docker Compose Util) executable
```sh
chmod +x ./DoComUtil
``` 
6. Build a development docker image
```sh
./DoComUtil build dev
``` 
7. Start a development docker container
```sh
./DoComUtil start dev
``` 
8. Trigger a building and deployment on development server
```sh
./DoComUtil deploy dev
``` 
9. Open on the browser the url [http://localhost:8080](http://localhost:8080)
    - Replace the 8080 with your own port


<!-- LICENSE -->
## License

Distributed under the Mozilla Public License Version 2.0. See `LICENSE` for more information.


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Wed](https://github.com/mangalam-research/wed)
* [Mangalam Research](https://github.com/mangalam-research)
* [Louis-Dominique Dubeau](https://github.com/lddubeau)
* [BrowserStack](https://www.browserstack.com/)
* [Sauce Labs](https://saucelabs.com/)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/datascouting/wed.svg?style=flat-square
[contributors-url]: https://github.com/datascouting/wed/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/datascouting/wed.svg?style=flat-square
[forks-url]: https://github.com/datascouting/wed/network/members
[stars-shield]: https://img.shields.io/github/stars/datascouting/wed.svg?style=flat-square
[stars-url]: https://github.com/datascouting/wed/stargazers
[issues-shield]: https://img.shields.io/github/issues/datascouting/wed.svg?style=flat-square
[issues-url]: https://github.com/datascouting/wed/issues
[license-shield]: https://img.shields.io/github/license/datascouting/wed?style=flat-square
[license-url]: https://github.com/datascouting/wed/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/company/datascouting
