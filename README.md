jQuery-Plugin countUpDown
==================

A jQuery Plugin, that provides a grafical counter, counting up or down from given state/date.

This is my first jQuery plugin, advises for better practises and such are welcome.

Why?
In need of a nice looking counter for jQuery using website i realized, that there were some for counting down and some for counting up, but i wanted one to do both, to use Date() functions instead of algortithmical steppings and to be able to use the very same grafics and animations while counting up as down.

The one formerly used for counting down was the one from https://code.google.com/p/jquery-countdown/
First i tried to adjust this one, but it was easier to just rewrite one.

Usage: 
The possible options are well documented in the code, just have a look. Still i'll quote them here fyc.

    autoStart: true,//if false, start() method has to be called to start counting @TODO
    animate: false,//if true, digitImg has to have extra parts for the animated steps 
    counterDelay: 1000,//delay in miliseconds
    daysDigits: 2,//select how many digits of days to display, max is 4 (9999 days)
    digitWidth:53,//dimensions of each sprite in digitImg
    digitHeight:77,
    digitImg:'digits.png',//image containing sprites, left top is 0, downwards to 9, last row on bottom are the dividers.
    dividerStyle: 0,//check last row in digitImg, this number is the position of image in last row, starting with 0
    counterDirection: 'up', //up or down
    counterBottom: '2013-01-01 00:00:00',//if initState isn't set, either counterTop, counterBottom or both have to be set
    //counterTop:'2013-04-07 16:00:00', //max difference is 27 years (9999 days max)
    //initState: '0000:00:00:58' // Format: dddd:hh:mm:ss
    
Hope you find it usefull
