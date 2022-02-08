// Variables.
let clock = document.getElementById('clock');
let statusIcon = document.getElementById('statusIcon');
let notification = document.querySelector('.notification');
let displayAlarmList = document.querySelector('.alarms-list');
let spinner = document.querySelector('.spinner');

// Taking inputs.
let hour = document.getElementById('hour');
let minute = document.getElementById('minute');
let second = document.getElementById('second');
let dnStatus = document.getElementById('status');
let reason = document.querySelector('.alarm-name');
let setBtn = document.getElementById('set');

// list which will contain alarms.
const alarmList = [];

// This function will check and add if 0 required infront of a single digit number.
const zeroChecker = (zeroNeeder) => {
    return `${zeroNeeder < 10 ? ` 0${zeroNeeder}` : zeroNeeder}`;
};

// This function Compare current time and alarm time set by user to create Alert.
const buzzer = (curTime) =>{

    // fetchList is the alarm list we are getting from local storage.
    let fetchList = JSON.parse(window.localStorage.getItem('alarms'));

    if(fetchList){
       fetchList.map((element) => {

            if(curTime === element.alarmTime){

                var name = element.alarmName;

                // setTimeout is used as it was not showing current time before 1s of alert display in browser except firefox.
                if (!name) {

                    setTimeout(()=>{ window.alert("Alarm Ring!"); },0000);
                    return;
                }
                setTimeout(()=>{ window.alert(` Alarm for ${name}!`); },0000);
            }
        })
    };
};

// CLOCK
const time = () =>{

    let date = new Date();

    // converting 24 hour format to 12 hour format
    var formatedHour;

    if(date.getHours() === 0){
        formatedHour = 12;
    }
    else if(date.getHours() > 0 && date.getHours() <= 12){
        formatedHour = date.getHours();
    }
    else if(date.getHours() > 12){
        formatedHour = date.getHours() - 12;
    }

    // checking ,adding and getting final time from date methods
    let hours = zeroChecker(formatedHour);
    let minutes = zeroChecker(date.getMinutes());
    let seconds = zeroChecker(date.getSeconds());

    // checking day/night status from 24 hour format if greater than 12 then 'PM'
     let status = `${date.getHours() >= 12 ? 'PM' : 'AM'}`;

    // Changing day/night logo i.e accrding to 24 hour format greater than 6(morning) to 18(evening)
    //  is day else night
    if (date.getHours() >= 6 && date.getHours() < 18) {
        statusIcon.classList = 'bi bi-brightness-high-fill statusIcon yellow';
    }
    else {
        statusIcon.classList = 'bi bi-moon-stars-fill statusIcon light-black';
    }
    
    // concating all to get current time and passing it to html file.
    let currentTime = `${hours} : ${minutes} : ${seconds} ${status}`;
    
    clock.textContent = currentTime;

    buzzer(currentTime); 
};

// since time will be updated after every 1s so for initial 1s time will be undefined 
// so loading will be displayed.
setTimeout(()=>{
    spinner.classList.add('none');
},1000);

// set interval function will update time every 1000ms/1s.
setInterval(time, 1000);

// SET ALARM

// on calling this function will display a notification for 2 seconds.
const notify = (message, backColor) => {

    notification.innerHTML = message;
    notification.classList.add(backColor);
    
    setTimeout(() => {
        notification.classList.remove(backColor);
        notification.innerHTML = "";
    }, 2000);
};

// This function will perform one more input test to get desired range of values before creating alarm.
const inputTest = (variable, min, max) => {

    if(variable >= min && variable <= max){
        return true;
    };
    return false;
};

// This function will clean input fields for another input.
// on parameter '..arguments' so it can take any length of parameters.
const cleanInput = (...arguments) => {

    arguments.map((element) => {
        element.value = "";
    });
};

// ALARM LIST

// This function will only take a list and create a div for every list element .
const renderList = (list) => {
    // before rendering clear previous list
    displayAlarmList.innerHTML = "";

    list.map((element) => {

        let newAlarm = document.createElement('div');

        newAlarm.id = element.id;
        newAlarm.classList.add('alarm', 'flex', 'between');

        newAlarm.innerHTML = `
            <p class="list-time">${zeroChecker(element.setHour)} : ${zeroChecker(element.setMinute)} : ${zeroChecker(element.setSecond)} ${element.setStatus}</p>
            <p class="list-name"> ${element.alarmName} </p>
            <i class="bi bi-trash pointer" function="delete"></i> 
        `;

        // insertion of new alarm at 0th position of list.
        displayAlarmList.insertBefore(newAlarm, displayAlarmList.childNodes[0]);
    });
};

// This function will take alarm list from local storage and pass it to the renderlist function
//  which will display list.
const fetchingLocalData = () =>{

    // converting json string to object
    finalList = JSON.parse(window.localStorage.getItem('alarms'));
    // if object is null then return else render that data
    if(finalList === null){
        return;
    };

    renderList(finalList);
};

// on loading window if there's prevoius data/ alarms then it will be loaded.
window.addEventListener('load', fetchingLocalData());

// ADD ALARM
const addAlarm = (event) => {

    // providing unique id to every alarm 
    let id = Date.now().toString();

    // converting required input to number
    let setHour = parseInt(hour.value);
    let setMinute = parseInt(minute.value);
    let setSecond = parseInt(second.value);

    let setStatus = dnStatus.value;
    let alarmName = reason.value;

    let alarmTime = `${zeroChecker(setHour)} : ${zeroChecker(setMinute)} : ${zeroChecker(setSecond)} ${setStatus}`

    // if the values are within range or valid then only store them in alarm list.
    if (inputTest(setHour, 1, 12) === false || inputTest(setMinute, 0, 59) === false || inputTest(setSecond, 0, 59) === false) {

        notify('Enter a valid time!', 'bg-yellow');
        return false;
    }

    // prevent form from submitting and reloading.
    event.preventDefault();

    // creating alarm object
    let alarm = { id, setHour, setMinute, setSecond, setStatus, alarmName, alarmTime };

    // Adding alarm into list
    alarmList.push(alarm);

    // Notifying user
    notify('Alarm Added Successfully!', 'bg-green');

    // cleaning inputs field
    cleanInput(hour, minute, second, reason);

    // Initially if localStorage empty then create a local storage with key alarms and value alarmlist
    if(!localStorage.getItem("alarms")){
        window.localStorage.setItem('alarms', JSON.stringify(alarmList));
    }
    // If storage not empty then create new list for new alarms set by user and push them in storage 
    // concating with old data with same key name 'alarms'
    else{
        newList = JSON.parse(window.localStorage.getItem('alarms'));
        newList.push(alarm);
        window.localStorage.setItem('alarms', JSON.stringify(newList));
    }

    fetchingLocalData();
};

// Adding Alarm into ALarm list on clicking 'Set Alarm' button.
setBtn.addEventListener('click', addAlarm);

// DELETE ALARM
displayAlarmList.addEventListener('click', (event)=>{

    // getting attribute name
    let current = event.target.getAttribute('function');

    // getting alarm ID 
    // parentNode will give details about parent element of current element
    let currentAlarmId = event.target.parentNode.id;

    if(current === 'delete'){

        deleteAlarm(currentAlarmId);
    };
});

// This DELETE function will fetch data from local storage filter the list by alarm we want to delete 
// and again store filtered data into local storage.
const deleteAlarm = (alarmId) =>{

    let fetchData = JSON.parse(window.localStorage.getItem('alarms'));

    let filteredData = fetchData.filter((element)=>{

        if(element.id !== alarmId){
            return element;
        };
    });

    window.localStorage.setItem('alarms', JSON.stringify(filteredData));
    fetchingLocalData();
    notify('Alarm Removed!', 'bg-yellow');
};

// END
