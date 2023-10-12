# sf-radical-related-list

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

## Overview


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![image](https://github.com/effordDev/sf-radical-related-list/assets/129213219/7c1a5a7f-6383-4163-8222-1315a246d92f)


This project started because of a need to see a set list of records, open and easily edit fields on those records, but be able to show Formula's to display an impage, rich text, html.  Further the component needed to be definable on the page as to which object the related records are being shown any filters and what colunms to display.  We also need to be able to add an "add new" or delete row.  Set a sort order to any field we wanted. 



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Vue][Vue.js]][Vue-url]
* [![Angular][Angular.io]][Angular-url]
* [![Svelte][Svelte.dev]][Svelte-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


Drop the componenet on a lighthing page layout.
Enter Header and Sub Header
Enter in the API of the child object from which the records will be displayed
Enter int he API of the field on the child object that contains the ID of the parent record
![image](https://github.com/effordDev/sf-radical-related-list/assets/129213219/c77d6f95-93f2-445a-bb5a-6553da92e431)

Enter in the fields that you want to display, these become the headers.  You must enter the API of the fields seperated by a comma, in the order you want them to display.
Enter and filter as in a where clause you may want to filter the records by.  This would be good if you have 2 unique sets or record on the same related object. For example a set of scorring records for user 1, and a set for user 2, where you could include a field for User 1 and a field for user 2, then enter where User_Field='User 1' to show only those records.  This also alows for multiple users of a single related object and multiple uses of the Radical related list.
![image](https://github.com/effordDev/sf-radical-related-list/assets/129213219/b86f109c-9c10-4a7a-8c23-ef6ffc884cc1)

Enter any field you like to sort by and weather that's ASC (Ascending), of DESC (Desending)

then start defining the Object from which to pull the records:


### Prerequisites

- An active Salesforce org.
- A related list of records you want this component to display
- Useing SF lightning


<!-- USAGE EXAMPLES -->
## Usage

This component can be used for specific checklists, scoring, easy to inline edit related records in a single screen.

![image](https://github.com/effordDev/sf-radical-related-list/assets/129213219/10a30d98-802e-4be7-8e53-562f48fbde6d)

It could be configured for conduction scoring on say an application:
![image](https://github.com/effordDev/sf-radical-related-list/assets/129213219/0c188061-5bec-488a-9100-135b8dcb74f9)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

