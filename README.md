# NCSSM Schedule Maker

This is a web app for checking the validity of an NCSSM schedules according to meeting patterns.
It can also be used for seeing possible schedules that one could get with a certain set of classes.

The web app can be accessed at [ncssm-schedule-maker.netlify.app](https://ncssm-schedule-maker.netlify.app).

The class and timetable data is for the 2022-2023 school year.

## Known issues

- M block classes are currently not able to be scheduled.
- Depending on the number of users, my google sheets API key could get rate limited.
- There's currently no loading animation for the classes, it just takes a few seconds to load them due to the relative slow speed of the google sheets API we're working with.
- In the possible schedules tab, all classes meeting during a lab block are currently assumed to be labs. This is not always the case in actuality.

These issues are being worked on and presumably will be resolved soon.

Feel free to let me know if you have any issues or feedback.
