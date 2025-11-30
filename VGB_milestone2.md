XAVIER UNIVERSITY – ATENEO DE CAGAYAN
COLLEGE OF COMPUTER STUDIES
DEPARTMENT OF INFORMATION TECHNOLOGY
Milestone II - Requirements Analysis, Specifications, and design
Submitted by:
Project VAUYL
Alamo, Don Martin Raphael
Langcao, Jerome Llyod
Uy, Earl Allen
Uyguangco, Kent Andrei
Velasco, Percy Bray
Submitted on
October 15, 2025
Milestone II - Requirements Analysis, Specifications, and Design for
Video Game Bulletin (VGB)
This report addresses Milestone II for the Video Game Bulletin (VGB) project,
focusing on requirements analysis, specifications, and the conceptual and logical data
model design.

Description of the Database Application
The Video Game Bulletin (VGB) is a proposed web-based platform designed to be a
streamlined, centralized hub for video game enthusiasts to track upcoming and newly
released games and consoles. The platform's core is a database that provides accurate,
timely release information, solving the challenge of fragmented digital information.

● Major Functions and Basic Operations Supported
The VGB system's functionalities are divided into three major application
areas: User-Facing Information and Discovery, Interactive User Features, and
Administrative Content Management.
○ User-Facing Information and Discovery: This area focuses
on displaying game release information and providing search
capabilities.
■ Basic Operations (Use Cases): Users can check releases for
games (viewing the real-time release calendar or list), search games
(finding games by title or simple keywords), and view game details
(seeing description, specs, and platform information).
■ User Groups: Guest User, Registered User, and Administrator.
○ Interactive User Features: This area enables community
engagement and personalized content tracking.
■ Basic Operations (Use Cases): Users can create an account
(registering to access interactive features), favorite games (adding a
game to a personal list), and comment on games (posting a
comment).
■ User Groups: Registered User and Administrator (Guest Users can
perform the Creating an account operation).
○ Administrative Content Management: This area focuses on
maintaining the accuracy and consistency of the game
information database.
■ Basic Operations (Use Cases): The Administrator is responsible for
monitoring databases (checking database status and consistency),
adding game information (inputting new game data), updating game
information (modifying existing game data), and removing game
information (deleting game data).
■ User Groups: Administrator only.
Description of Requirements
● Data Requirements
The database must store and manage all information necessary to support
the VGB's functions, including data about the games themselves, user interactions,
and system management.
○ Game
Stores core game details including Game_ID (Primary Key), Title,
Description, Release Date, and Status (e.g., Upcoming, Released).
○ Platform
Stores platform information including Platform_ID (Primary Key),
Name (e.g., PC, PS5, Xbox Series X), and Specs.
○ User
Stores user account data including User_ID (Primary Key), Username,
Password (Hashed), Email, Registration Date, and User_Type (Guest,
Registered, Admin).
○ Comment
Stores user comments including Comment_ID (Primary Key), Text,
Date/Time Posted, associated User_ID, and associated Game_ID.
○ Game-Platform Relationship
Stores the specific Date a Game was released on a particular
Platform.
○ Favorite
Stores tracking data including the Date Added, associated User_ID,
and associated Game_ID.
● Transaction Requirements
Transaction requirements describe the specific actions and processes that
modify or retrieve data from the system, driven by the use cases.
○ Search Games (Guest/Registered/Admin)
Retrieve a list of Games matching a keyword in the Title or
Description.
○ Check Releases (Guest/Registered/Admin)
Retrieve a list of Games ordered by Release Date.
○ View Game Details (Guest/Registered/Admin)
Retrieve a single Game's details, including its Description and
associated Platforms and Specs.
○ Create Account (Guest User)
Insert a new record into the User entity with a Username, Password,
and Email.
○ Favoriting on Games (Registered/Admin)
Insert a record into the Favorite relationship entity, linking a User to a
Game.
○ Commenting on Games (Registered/Admin)
Insert a record into the Comment entity, linking a User and their
Comment Text to a Game.
○ Add Game Infos (Administrator)
Insert a new record into the Game entity and new records into the
Platform entity and Game-Platform relationship as needed.
○ Update Games Info (Administrator)
Update records in the Game, Platform, or Game-Platform entities to
ensure accuracy.
○ Remove Games Info (Administrator)
Delete records from the Game, and related records from Comment
and Favorite entities.
○ Monitor Databases (Administrator)
Retrieve information on database status and consistency.
● Output Requirements
Output requirements focus on the information delivered to the users through
the web application's interface.
○ Release Calendar/List
Provides the Game Title, Status, and Release Date (in a real-time
display) to all users.
○ Search Results
Presents a list of Game Titles matching the search criteria, possibly
with a snippet of the description, to all users.
○ Game Detail Page
Displays the Game Title, Description, Specs and Platform information,
Release Date, User Comments, and a mechanism (button/status) for
Favoriting, to all users.
○ User's Favorite List
Shows a list of Game Titles the Registered User has favorited,
potentially including their Release Date, to Registered Users and
Administrators.
○ Administrative Log/Report
Provides database consistency and status updates (for monitoring) to
the Administrator.
Conceptual Data Model: Entity-Relationship Diagram (ERD)
This section details the conceptual data model for the VGB system. It uses the four
core entities and resolves the two Many-to-Many (M:N) relationships by defining
associative entities, ensuring all cardinality and participation constraints are met.

● Entity-Relationship Diagram (ERD)
The following diagram illustrates the conceptual data model for the VGB
application.
Figure 1.1: ER Diagram of the Video Game Bulletin (VGB)
Logical Data Model: Relational Mapping
The conceptual ERD is mapped into a logical data model consisting of a set of six
relations (tables), including primary keys (PK) and foreign keys (FK).
Figure 1.2: Relational Mapping of Video Game Bulletin (VGB)

Data Dictionary
Figure 1.3: Data Dictionary of Video Game Bulletin (VGB)
