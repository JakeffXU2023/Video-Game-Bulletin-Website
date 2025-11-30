XAVIER UNIVERSITY – ATENEO DE CAGAYAN
COLLEGE OF COMPUTER STUDIES
DEPARTMENT OF INFORMATION TECHNOLOGY
Milestone I - System Selection and Definition
Submitted by:
Project VAUYL
Alamo, Don Martin Raphael
Langcao, Jerome Llyod
Uy, Earl Allen
Uyguangco, Kent Andrei
Velasco, Percy Bray
Submitted on
September 7, 2025
Background of the Organization (Hypothetical)
● Brief Description
The Video Game Bulletin (VGB) is a hypothetical organization addressing the
challenge game enthusiasts face in tracking new releases amidst scattered and
overwhelming digital information. The platform aims to be a streamlined hub for
accurate and relevant release information.
● Logo
● Mission Statement
To provide a centralized, interactive, and easy-to-use platform for game
enthusiasts to stay updated on all upcoming and newly released games and
consoles.
● Vision Statement
To become the go-to resource for accurate and timely video game release
information, fostering a community of informed and connected gamers.
● Nature of Business
The VGB operates as a web-based information service, providing a general
searchable database of video game releases and related news
● Products and Services
The main product is a web application featuring a release calendar, general
search tools, and detailed game pages. Services include real-time database
updates, user account creation, and interactive features like commenting and
favoriting games.
● Functional Areas of the Organization
○ Departments
■ Information Technology (IT) and Development : Manages the
creation, maintenance, and updates of the web platform and its
database.
■ Content Management : Responsible for sourcing, verifying, and
inputting accurate data on game releases.
■ User Support/Community Management : Handles user inquiries
and moderates community interactions like comments.
○ Key Positions/People
■ Project Lead: This individual is responsible for the overall project
direction, coordination, and ensuring the project's objectives are met.
■ Front-End Developer: This individual is responsible for building the
user-facing side of the application, including setting up the front-end
framework, building core UI components, and creating a user-friendly
and visually appealing interface through wireframes and mockups.
■ Back-End Developer: This individual manages the back-end
development, including setting up the database and defining data
models.
■ Quality Assurance (QA) Tester: This position is responsible for
thoroughly testing the application to identify and fix bugs and to
refine the UI/UX based on feedback.
■ Content Manager: This role is responsible for gathering and
verifying game information to ensure the database is accurate and
up-to-date.
○ Organizational Chart
Proposed Database Application
● Brief Description
The Video Game Bulletin (VGB) is a proposed web-based platform with a
database at its core, designed to solve the problem of fragmented information for
game enthusiasts. The system will serve as a centralized hub for tracking and
discovering new game and console releases.
● Scope and Boundaries
The application's scope includes a release calendar, general search tools,
and game detail pages. It also features user interaction functionalities, such as
account creation, favoriting games, and a commenting system. The database's
boundaries are defined by the data it stores and manages, which includes
information on games, platforms, release dates, user profiles, and comments..
● Major Application Areas and User Groups
○ Major Application Areas
The system's main functionalities are divided into three areas:
■ User-Facing Information and Discovery: This includes the
display of a real-time release calendar, a general search system for
finding games, and a detailed view for individual game information.
■ Interactive User Features: This covers user account creation,
login, favoriting games, and the commenting system.
■ Administrative Content Management: This area includes tools
for managing, updating, and monitoring the game information
database (adding, updating, and removing game information).
○ User Groups
■ Guest Users (General Public): Individuals who browse the site to
check releases for games, search games, and view game details
(specs and platform, description) without needing an account. They
can also create an account to access interactive features.
■ Registered Users: Individuals with an account who can perform all
actions available to Guest Users, plus log in, favorite games, and
comment on games.
■ Administrator/Content Manager: The team that can perform all
Guest User and Registered User actions. At the same time, they are
responsible for managing the database, which includes monitoring
databases and ensuring the accuracy of game information by adding,
updating, and removing game information.
● Business Processes and Use Cases
○ Business Processes
■ Content Acquisition: Gathering and verifying raw information on
new games and consoles from various sources. This is the initial input
process that precedes all administrative data management tasks.
■ Data Management: This represents the core administrative task of
maintaining the database. It includes the continuous entering,
updating, removing, and monitoring of all game details to ensure
accuracy and consistency.
■ User Interaction: Handling all user-driven behaviors in the system.
This covers the essential behaviors of all user roles: Guest Users
(who can check releases, search for games, view detailed
information, and create an account); Registered Users (who
perform all Guest actions, plus log in, favorite games, and leave
comments); and Administrators (who perform all Guest and
Registered actions, in addition to managing the database content by
adding, updating, removing, and monitoring game information).
○ Use Cases
■ Search for a game: A user enters a game title or keyword to find its
release information. (Applies to Guest, Registered, and
Administrator).
■ Check releases for games: A user views the main calendar or list
of upcoming and newly released games. (Applies to Guest,
Registered, and Administrator).
■ View game details: A user clicks on a game to see its description,
specs and platform information, release date, and other system
requirements. (Applies to Guest, Registered, and Administrator).
■ Creating an account: A user registers for an account to gain access
to interactive features. (Applies to Guest, Registered, and
Administrator).
■ Favoriting on Games: A registered user adds a game to their
personal list for future reference. (Applies to Registered and
Administrator).
■ Commenting on Games: A registered user posts a comment on a
game. (Applies to Registered and Administrator).
■ Add Game Infos: An administrator adds new game information to
the database. (Applies only to Administrator).
■ Update Games Info: An administrator modifies existing game
information in the database. (Applies only to Administrator).
■ Remove Games Info: An administrator deletes game information
from the database. (Applies only to Administrator).
■ Monitor Databases: An administrator monitors the database for
status and consistency. (Applies only to Administrator).
● Functional and Non-Functional Requirements
○ Functional Requirements
■ The system must display a real-time release calendar.
■ Guest Users must be able to check releases for games (displaying a
real-time release calendar), perform a general search for games (e.g.,
by title or simple keywords), view detailed game information
(description, platforms, and specifications), and create an account.
■ The platform must provide detailed game information, including
description, platforms, and specifications.
■ Registered Users must be able to perform all actions available to
Guest Users and must be able to log in, favorite games, and leave
comments.
■ Administrators/Content Managers must be able to perform all actions
available to Guest Users and Registered Users, AND manage the
database by adding, updating, and removing game information and
utilizing tools to monitor the database for consistency.
○ Non-Functional Requirements
■ Data Consistency: The database must be updated in real time to
ensure the accuracy of release information.
■ Scalability: The system should be able to handle an increasing
number of users and data without performance degradation.
■ User-Friendliness: The platform should have a simple and
organized interface.
■ Performance: The application should load quickly and efficiently.
● Preliminary Methodology
The VGB project will follow an iterative development approach using a
full-stack JavaScript framework like Next.js or Gatsby. The project is broadly divided
into four key phases: Planning & Design, Core Development, Feature
Implementation & Integration, and Testing & Deployment.
○ Key Steps
■ Planning & Design (September 2025): This phase involves
project planning, requirement analysis, and finalizing the project
scope. UI/UX design, including wireframes and mockups, will also be
completed.
■ Core Development (October 2025): The front-end will be set up
with Next.js/Gatsby and React, and core UI components will be built.
Back-end development and Firebase database setup will also occur,
along with data model definition.
■ Feature Implementation & Integration (November 2025):
Core features like the release calendar and search functionality will be
implemented. All components, including user authentication and the
commenting system, will be integrated.
■ Testing & Deployment (December 2025): The entire application
will be thoroughly tested for bugs and refined based on feedback.
Final deployment to a live server and project documentation will be
completed.
