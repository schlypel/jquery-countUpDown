/*
 * jquery-countUpDown plugin
 *
 * Copyright (c) 2013 schlypel <schlypel@web.de>
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */
jQuery.fn.myCounter = function(userOptions)
{
	var wo = this;
	wo.myOptions = {
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
	};
	$.extend(wo.myOptions, userOptions);//merge options with defaults

	/* Styles, will be put into head on loading */
	var styles = '<style class="myCounterStyles" type="text/css">/*  MYCOUNTER STYLES */\
      '+wo.selector+' .myCounter{\
      	height: '+wo.myOptions.digitHeight+'px;\
      	overflow: hidden;\
      	clear: none;\
      }\
      '+wo.selector+' div.myCounter.myCounterDigit{\
      	width:'+wo.myOptions.digitWidth+'px;\
      	height:'+wo.myOptions.digitHeight+'px;\
      	overflow: hidden;\
      	float:left;\
      	background-image:url('+wo.myOptions.digitImg+');\
      	background-position:0 0;\
      }\
      '+wo.selector+' div.myCounter.myCounterDivider{\
      	background-position:-'+wo.myOptions.dividerStyle*wo.myOptions.digitWidth+'px '+wo.myOptions.digitHeight+'px;\
      	width:28px;\
      }\
      </style>';

    /* the html elements to be used */
    var container = $('<div class="myCounter myCounterContainer"></div>');
	var s0 = $('<div class="myCounter myCounterDigit s0"></div>');
	var s1 = $('<div class="myCounter myCounterDigit s1"></div>');
	var m0 = $('<div class="myCounter myCounterDigit m0"></div>');
	var m1 = $('<div class="myCounter myCounterDigit m1"></div>');
	var h0 = $('<div class="myCounter myCounterDigit h0"></div>');
	var h1 = $('<div class="myCounter myCounterDigit h1"></div>');
	var d0 = $('<div class="myCounter myCounterDigit d0"></div>');
	var d1 = $('<div class="myCounter myCounterDigit d1"></div>');
	var d2 = $('<div class="myCounter myCounterDigit d2"></div>');
	var d3 = $('<div class="myCounter myCounterDigit d3"></div>');
	var divider = '<div class="myCounter myCounterDigit myCounterDivider"></div>';
	container.prepend(h1,h0,divider,m1,m0,divider,s1,s0);
	var daysArray = {0:d0,1:d1,2:d2,3:d3};
	if(wo.myOptions.daysDigits != 0){container.prepend(divider);}
	for (i=0;i<wo.myOptions.daysDigits;i++){
		container.prepend(daysArray[i]);
	}
	var digitsList = {d3:d3,d2:d2,d1:d1,d0:d0,h1:h1,h0:h0,m1:m1,m0:m0,s1:s1,s0:s0};


	//this object will allways contain the state
	wo.state = {v:{d3:0,d2:0,d1:0,d0:0,h1:0,h0:0,m1:0,m0:0,s1:0,s0:0},a:{d3:0,d2:0,d1:0,d0:0,h1:0,h0:0,m1:0,m0:0,s1:0,s0:0},
		s0maxed : function(){return (wo.state.v.s0 > 8);},
		s1maxed : function(){return (wo.state.v.s1 > 4);},
		m0maxed : function(){return (wo.state.v.m0 > 8);},
		m1maxed : function(){return (wo.state.v.m1 > 4);},
		h0maxed : function(){return ((wo.state.v.h0 > 8) || (wo.state.v.h1 > 1 && wo.state.v.h0 > 2) );},
		h1maxed : function(){return (wo.state.v.h1 > 1);},
		d0maxed : function(){return (wo.state.v.d0 > 8);},
		d1maxed : function(){return (wo.state.v.d1 > 8);},
		d2maxed : function(){return (wo.state.v.d2 > 8);},
		d3maxed : function(){return (wo.state.v.d3 > 8);},
		inc : function(){
		//console.log(wo.state);
			if (!wo.state.s0maxed()){
				wo.state.v.s0 = ++wo.state.v.s0;
			}else{
				wo.state.v.s0 = 0;
				if (!wo.state.s1maxed()){
					wo.state.v.s1 = ++wo.state.v.s1;
				}else{
					wo.state.v.s1 = 0;
					if (!wo.state.m0maxed()){
						wo.state.v.m0 = ++wo.state.v.m0;
					}else{
						wo.state.v.m0 = 0;
						if (!wo.state.m1maxed()){
							wo.state.v.m1 = ++wo.state.v.m1;
						}else{
							wo.state.v.m1 = 0;
							if (!wo.state.h0maxed()){
								wo.state.v.h0 = ++wo.state.v.h0;
							}else{
								wo.state.v.h0 = 0;
								if (!wo.state.h1maxed()){
									wo.state.v.h1 = ++wo.state.v.h1;
								}else{
									wo.state.v.h1 = 0;
									if (!wo.state.d0maxed()){
										wo.state.v.d0 = ++wo.state.v.d0;
									}else{
										wo.state.v.d0 = 0;
										if (!wo.state.d1maxed()){
											wo.state.v.d1 = ++wo.state.v.d1;
										}else{
											wo.state.v.d1 = 0;
											if (!wo.state.d2maxed()){
												wo.state.v.d2 = ++wo.state.v.d2;
											}else{
												wo.state.v.d2 = 0;
												if (!wo.state.d3maxed()){
													wo.state.v.d3 = ++wo.state.v.d3;
												}else{
													wo.state.v.d3 = 0; //OVERFLOW
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		dec : function(){
		//console.log(wo.state);
			if (wo.state.v.s0 > 0){
				wo.state.v.s0 = --wo.state.v.s0;
			}else{
				wo.state.v.s0 = 9;
				if (wo.state.v.s1 > 0){
					wo.state.v.s1 = --wo.state.v.s1;
				}else{
					wo.state.v.s1 = 5;
					if (wo.state.v.m0 > 0){
						wo.state.v.m0 = --wo.state.v.m0;
					}else{
						wo.state.v.m0 = 9;
						if (wo.state.v.m1 > 0){
							wo.state.v.m1 = --wo.state.v.m1;
						}else{
							wo.state.v.m1 = 5;
							if (wo.state.v.h0 > 0){
								wo.state.v.h0 = --wo.state.v.h0;
							}else{
								wo.state.v.h0 = 3;
								if (wo.state.v.h1 > 0){
									wo.state.v.h0 = 9;
									wo.state.v.h1 = --wo.state.v.h1;
								}else{
									wo.state.v.h1 = 2;
									if (wo.state.v.d0 > 0){
										wo.state.v.d0 = --wo.state.v.d0;
									}else{
										wo.state.v.d0 = 9;
										if (wo.state.v.d1 > 0){
											wo.state.v.d1 = --wo.state.v.d1;
										}else{
											wo.state.v.d1 = 9;
											if (wo.state.v.d2 > 0){
												wo.state.v.d2 = --wo.state.v.d2;
											}else{
												wo.state.v.d2 = 9;
												if (wo.state.v.d3 > 0){
													wo.state.v.d3 = --wo.state.v.d3;
												}else{
													wo.state.v.d3 = 9; //OVERFLOW
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	/* adjusting digits background to reflect number*/
	wo.setDigit = function(digit,opts){
		var start = wo.state.a[digit];
		var target = wo.state.v[digit];
		if (start-target != 0){
			var stepLength = 75;
			if(opts.animate && opts.counterDelay > 5*stepLength){
				var t5 = setTimeout(function(){digitsList[digit].css('background-position','0 -'+target*opts.digitHeight+'px');},4*stepLength);
				var t4 = setTimeout(function(){digitsList[digit].css('background-position','+'+opts.digitWidth+'px -'+target*opts.digitHeight+'px');},3*stepLength);
				var t3 = setTimeout(function(){digitsList[digit].css('background-position','+'+2*opts.digitWidth+'px -'+target*opts.digitHeight+'px');},2*stepLength);
				var t2 = setTimeout(function(){digitsList[digit].css('background-position','-'+2*opts.digitWidth+'px -'+start*opts.digitHeight+'px');},1*stepLength);
				var t1 = setTimeout(function(){digitsList[digit].css('background-position','-'+opts.digitWidth+'px -'+start*opts.digitHeight+'px');},0*stepLength);
			}else{
				digitsList[digit].css('background-position','0 -'+target*opts.digitHeight+'px');
			}
		}
	}

	/* setting all digits */
	wo.setState = function(newState,opts){
		wo.setDigit('s0',opts);
		wo.setDigit('s1',opts);
		wo.setDigit('m0',opts);
		wo.setDigit('m1',opts);
		wo.setDigit('h0',opts);
		wo.setDigit('h1',opts);
		wo.setDigit('d0',opts);
		wo.setDigit('d1',opts);
		wo.setDigit('d2',opts);
		wo.setDigit('d3',opts);
	}

	/* read options, set initial state of digits */
	function initialize(opts){
		if (opts.initState){
			wo.state.v.d3=opts.initState[0];
			wo.state.v.d2=opts.initState[1];
			wo.state.v.d1=opts.initState[2];
			wo.state.v.d0=opts.initState[3];
			wo.state.v.h1=opts.initState[5];
			wo.state.v.h0=opts.initState[6];
			wo.state.v.m1=opts.initState[8];
			wo.state.v.m0=opts.initState[9];
			wo.state.v.s1=opts.initState[11];
			wo.state.v.s0=opts.initState[12];
		}else{
			if(!opts.counterTop && !opts.counterBottom){
				wo.html('the counter needs to have either initState or at least one of counterTop/counterBottom to be set');
			}else{
				var now = new Date();
				var ctop = (opts.counterTop)?Date.parse(opts.counterTop):now.getTime();
				var cbottom = (opts.counterBottom)?Date.parse(opts.counterBottom):now.getTime();
				var difference = Math.floor((ctop-cbottom)/1000);
				if (difference < 0){difference = difference *(-1);}
				var days = Math.floor((difference)/(60*60*24));
				difference = difference - (days*60*60*24);
				hours = Math.floor((difference)/(60*60));
				difference = difference - (hours*60*60);
				minutes = Math.floor((difference)/(60));
				difference = difference - (minutes*60);
				var seconds = difference;
				wo.state.v.s0 = ( seconds%10);
				wo.state.v.s1=( Math.floor(seconds/10));
				wo.state.v.m0=( minutes%10);
				wo.state.v.m1=( Math.floor(minutes/10));
				wo.state.v.h0=( hours%10);
				wo.state.v.h1=( Math.floor(hours/10));
				wo.state.v.d0=( days%10);
				wo.state.v.d1=( Math.floor(days/10)%10);
				wo.state.v.d2=( Math.floor(days/100)%10);
				wo.state.v.d3=( Math.floor(days/1000)%10);
			}
		}
		wo.setState(wo.state,opts);
	}

	/* function to do the step to next number */
	function step(){
		//create a copy of all values, so we can tell where we come from for animation
		wo.state.a.d3 = wo.state.v.d3;
		wo.state.a.d2 = wo.state.v.d2;
		wo.state.a.d1 = wo.state.v.d1;
		wo.state.a.d0 = wo.state.v.d0;
		wo.state.a.h1 = wo.state.v.h1;
		wo.state.a.h0 = wo.state.v.h0;
		wo.state.a.m1 = wo.state.v.m1;
		wo.state.a.m0 = wo.state.v.m0;
		wo.state.a.s1 = wo.state.v.s1;
		wo.state.a.s0 = wo.state.v.s0;
		if (wo.myOptions.counterDirection == 'up'){
			wo.state.inc();
		}else{
			wo.state.dec();
		}
		wo.setState(wo.state, wo.myOptions);
	}

	$('head').append(styles);//add the styles to sites head
	wo.append(container);//print out the code into defined DOM element
	initialize(wo.myOptions);//set up initial state in DOM element
	interval = setInterval(function(){step()}, wo.myOptions.counterDelay);
};
