# alarm.github.io
Its an Alarm clock application built using HTML, CSS and Vanilla JS which have a clock to display real time and set and delete alarm features.

Forntend is built using only HTML and CSS.

# Features

1.CLOCK

- We are using Date() method converting it into 12 hr format and updating it every 1s to get real time.
- Using 24 hr format to get AM/PM (hrs greater than equal to 12 are PM).
- Using 24 hr format to update day/night icon (greater than 6(morning) and less than 18(evening) is day else night).

2. SET ALARM

- We are accepting time in 12 hr format with AM/PM with an optional alarm name field.
- On creating an alarm it will be added to alarm list with a delete option.
- A window alert will be displayed when there will be alarm time.
- Without alarm name - default alert will show (' Alarm Ring! ').
- If name provided then - alert wil be (' Alarm for {name}! ').

3. DELETE

- By clicking on delete icon of a particular alarm will remove that from the list and also preventing it from creating alert.

# NOTIFICATION

There are some notifications to provide good user experience.

Trigger by:-
- On submitting wrong input.
- On successfull creation of an alarm.
- On deleting a particular Alarm.

# LOCAL STORAGE

We are using window local storage to store all the alarm's, updating list whenever an alarm will be deleted and all the alarms will be displayed and trigger even after we  reload or close the browser unless we delete that particular alarm.

*For detailed explanation of how a particular feature is working and its logic please folow the comments provided in the source code of respective (HTML, CSS, JS) files.

THANK YOU!
