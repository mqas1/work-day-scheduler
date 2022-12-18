$(function () {
    
    // Declaring JQeury variables to use in the click event.
    var saveButtonEl = $('.saveBtn');
    var messageEl = $('#message');

    // Click event to store user inputted text in local storage.
    saveButtonEl.on('click', function(event) {
        event.preventDefault();
        var inputText = $(this).siblings('textarea').val();
        var inputTimeKey = $(this).parent().attr('id');
    
        localStorage.setItem(inputTimeKey, inputText);
        messageEl.html("Appointment added to <code>localStorage</code> ✅");

        setTimeout(function() {
            messageEl.html("");
        }, 3500);
    })

    // Array containing all the id selectors for the individual time blocks.   
    var hourX = [$('#hour-09'), $('#hour-10'), $('#hour-11'), $('#hour-12'), $('#hour-13'), $('#hour-14'), $('#hour-15'), $('#hour-16'), $('#hour-17')];
    // Using dayjs to get the current hour
    var currentHour = dayjs().format('HH');

    // Iterating over the above array to colour code the time blocks
    // according to conditions checked against the current hour
    // to assign them as past, present, or future with CSS.
    for (var i = 0; i < hourX.length; i++) {
        var scheduleTime = hourX[i].attr('id').split('-')[1];

        if (scheduleTime < currentHour) {
            hourX[i].removeClass('present future').addClass('past');
        } else if (scheduleTime === currentHour) {
            hourX[i].removeClass('past future').addClass('present');
        } else {
            hourX[i].removeClass('past present').addClass('future');
        }
    }
    
    // function to display the text upon refresh by assigning the key from local storage 
    // to the relevant time block.
    function init(){
        for (var i = 0; i < hourX.length; i++) {
            var blockKey = hourX[i].attr('id').split('#')[0];
            hourX[i].find('textarea').val(localStorage.getItem(blockKey));
        }  
    }

    init ();

    // using dayjs and the advanced format extension to display the current
    // date on the header.
    var currentDayEl = $('#currentDay');
    dayjs.extend(window.dayjs_plugin_advancedFormat);
    
    function displayCurrentDay() {
        var currentDay = dayjs().format('dddd, MMMM Do');
        currentDayEl.text(currentDay);
    }

    displayCurrentDay();

});