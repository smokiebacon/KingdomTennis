Kingdom Tennis
A React Native mobile application that keeps a record of personal tennis/pickeball practices, rallies, and matches. Users are able to create an account, CRUD practice sessions,scores, duration, teammates, opponents, and court locations. A nice bar chart also displays daily/weekly/monthly/yearly/history of all sessions. Ads will be diplayed, and can be removed via payment.

Technology Used
React-Native
Expo
Supabase

Getting Started
Install and start the application by:

Forking this repository Cloning this repository Run npm install Run node Once the application has started, user should create an account.

User Stories
When was the last time I played tennis/pickleball with X person? How many hours did I play today/this week/this month/this year? This app is for tennis enthusiastics, much like a budget app, but instead of recording transactions, this app records tennis sessions and duration.

CRUD Actions
User Profile As a user, user should be able to: Choose a date, add a session, either Practice, Rally, Match, or their own custom session type. In these sessions, users can add teammates or players. Users can add duration and court location. If a match is selected, then user can input the match score.

Wireframe
We are essentially copying the Budget App named "Spendee"'s User Interface.

Unsolved Problems:
Bar Chart: implementing daily/weekly/monthly/yearly/history views is hard, as the entire app's state needs to change.
Implementing Datepicker: keep having object/string problems.
On tennis session creation, SegmentGroupButtons, or ButtonGroups, are not <Text> components; keep getting errors.
Dates: stuck on how to best make the state of Dates coherent with the rest of the form submission.
