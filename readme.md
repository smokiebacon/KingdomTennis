## Kingdom Tennis

A React Native mobile application that keeps a record of personal tennis/pickeball practices, rallies, and matches. Users are able to create an account, CRUD practice sessions,scores, duration, teammates, opponents, and court locations. A nice bar chart also displays daily/weekly/monthly/yearly/history of all sessions. Ads will be diplayed, and can be removed via payment.

## Technology Used

React-Native

Expo

Supabase

## Getting Started

Install and start the application by:

Forking this repository Cloning this repository Run npm install Run node Once the application has started, user should create an account.

## User Stories

When was the last time I played tennis/pickleball with X person? How many hours did I play today/this week/this month/this year? This app is for tennis enthusiastics, much like a budget app, but instead of recording transactions, this app records tennis sessions and duration.

## CRUD Actions

User Profile As a user, user should be able to: Choose a date, add a session, either Practice, Rally, Match, or their own custom session type. In these sessions, users can add teammates or players. Users can add duration and court location. If a match is selected, then user can input the match score.

## User Interface and User Experience

We are essentially copying the Budget App named "Spendee"'s User Interface.
[Spendee](https://www.spendee.com/)
[Spendee Screenshot Images](https://imgur.com/a/CAYidxB)

[Current Application development images](https://imgur.com/a/ScmZzcX/)

## Unsolved Problems:

Bar Chart: implementing daily/weekly/monthly/yearly/history views is hard, as the entire app's state needs to change.

Implementing Datepicker: keep having object/string problems.

On tennis session creation, SegmentGroupButtons, or ButtonGroups, are not <Text> components; keep getting errors.

```
 <Picker
        itemStyle={{
          color: "#008b8b",
        }}
        selectedValue={inputValues.session}
        onValueChange={inputChange.bind(this, "session")}
      >
        <Picker.Item label="Singles" value="Singles" />
        <Picker.Item label="Doubles" value="Doubles" />
        <Picker.Item label="Rally" value="Rally" />
        <Picker.Item label="Practice" value="Practice" />
      </Picker>

```

Dates: stuck on how to best make the state of Dates coherent with the rest of the form submission.

```const [inputValues, setInputValues] = useState({
    notes: defaultValues ? defaultValues.notes : "",
    duration: defaultValues ? defaultValues.duration.toString() : "",
    date: defaultValues ? defaultValues.date : new Date(),
    court: defaultValues ? defaultValues.court : "",
    teammate: defaultValues ? defaultValues.teammate : "",
    opponent: defaultValues ? defaultValues.opponent : "",
    opponent2: defaultValues ? defaultValues.opponent2 : "",
    session: defaultValues ? defaultValues.session : "Rally",
  })


    const onDateChange = (event, selectedDate) => {
    setDate(selectedDate)
    setShowPicker(false)
  }


  function inputChange(inputIdentifier, enteredValue) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      }
    })
  }
   {showPicker ? (
        <DateTimePicker
          value={date} //needs to be an Object
          testID="dateTimePicker"
          mode={mode}
          onChange={onDateChange}
        />
      ) : null}

```

## Minimum Viable Product

[ ] User can select a date via DatePicker, and change it.

[ ] User can CRUD category of session types (Rally, Practice, Match, or Custom)

[ ] If category is Match, then input fields should add Teammate, Opponent 1, Opponent 2, and Match Scores.

[ ] if category is Practice/Rally, then only input field on Opponent 1. Optional to add Teammate and Opponent 2.

[ ] User can add duration, in minutes and hours.

[ ] User can CRUD tennis court locations. Also favorite location.

[ ] User can add teammates/opponent names. Can favorite 3 names, such that 2v2 can be auto-filled sometimes.

[ ] User should be able to search via input field.

[ ] User can view daily/weekly/monthly/yearly/all history graphs.

[ ] User can see total duration played.

[ ] user can CRUD notes.

[ ] Light/Dark mode.

[ ] Loading state is skeletons and not spinning circles (as it is now).

## Future Development:

[ ] Freemium Model: App will be free, but with ads. Pay to remove ads.

[ ] Tennis/Pickleball court location finder. Lights? How many courts? Type of court: grass/indoor/clay/hard?

[ ] Entourage Feature: When adding teammates or opponents, if user and players are in an Entourage, also post the created Session onto their history. For example, I select a singles Match and win 6-0, 6-0 and input Sophia Name as my opponent. In Sophia's record, also add the match result.

[ ] Invite players to use the application feature. If friend accepts, then in current user's history, all instances of the friend's name become
a real account. The newly created invited friend's account should also populate with all of the previous match histories.

[ ] View other player's profile. See their entire play history.

[ ] Social profiles: add friends to create entourage.

[ ] 1 on 1 chat.
