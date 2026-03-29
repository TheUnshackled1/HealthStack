$(function(){
	
	/* Morris Area Chart */
	
	window.mA = Morris.Area({
	    element: 'morrisArea',
	    data: [
	        { y: '2013', a: 60},
	        { y: '2014', a: 100},
	        { y: '2015', a: 240},
	        { y: '2016', a: 120},
	        { y: '2017', a: 80},
	        { y: '2018', a: 100},
	        { y: '2019', a: 300},
	    ],
	    xkey: 'y',
	    ykeys: ['a'],
	    labels: ['Revenue'],
	    lineColors: ['#1b5a90'],
	    lineWidth: 2,
		
     	fillOpacity: 0.5,
	    gridTextSize: 10,
	    hideHover: 'auto',
	    resize: true,
		redraw: true
	});
	
	/* Morris Line Chart */
	
	window.mL = Morris.Line({
	    element: 'morrisLine',
	    data: [
	        { y: '2015', a: 100, b: 30},
	        { y: '2016', a: 20,  b: 60},
	        { y: '2017', a: 90,  b: 120},
	        { y: '2018', a: 50,  b: 80},
	        { y: '2019', a: 120,  b: 150},
	    ],
	    xkey: 'y',
	    ykeys: ['a', 'b'],
	    labels: ['Doctors', 'Patients'],
	    lineColors: ['#1b5a90','#ff9d00'],
	    lineWidth: 1,
	    gridTextSize: 10,
	    hideHover: 'auto',
	    resize: true,
		redraw: true
	});

	/* Morris Bar Chart - Appointments */
	if (typeof sat !== 'undefined' && document.getElementById('barChart_2')) {
		window.mB = Morris.Bar({
			element: 'barChart_2',
			data: [
				{ day: sat, appointments: parseInt(sat_count) || 0 },
				{ day: sun, appointments: parseInt(sun_count) || 0 },
				{ day: mon, appointments: parseInt(mon_count) || 0 },
				{ day: tues, appointments: parseInt(tues_count) || 0 },
				{ day: wed, appointments: parseInt(wed_count) || 0 },
				{ day: thurs, appointments: parseInt(thurs_count) || 0 },
				{ day: fri, appointments: parseInt(fri_count) || 0 }
			],
			xkey: 'day',
			ykeys: ['appointments'],
			labels: ['Appointments'],
			barColors: ['#1b5a90'],
			gridTextSize: 10,
			hideHover: 'auto',
			resize: true,
			redraw: true
		});
	}

	$(window).on("resize", function(){
		mA.redraw();
		mL.redraw();
		if (window.mB) mB.redraw();
	});

});