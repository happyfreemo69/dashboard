/*------------------------------------------------------
    Author : www.webthemez.com
    License: Commons Attribution 3.0
    http://creativecommons.org/licenses/by/3.0/
---------------------------------------------------------  */

(function ($) {
    "use strict";

    var json = {
        users_nb:16000,
        users_withPersonalApp:200,
        users_withProApp:120,
        ios_install:12,
        ios_uninstall:5,
        android_install:5,
        android_uninstall:2,
        syndic_scores:[
            {name:'TI',score:'122',nbIssues:23, nbOffers:22, nbTopics:5},
            {name:'MG',score:'213',nbIssues:10, nbOffers:5,  nbTopics:3}
        ],
        user_talkative:[
            {name:'bobmoran',score:'55',nbComments:23},
            {name:'priscilla',score:'108',nbComments:15}
        ],
        /*user_angry:[
            {name:'angryman',score:'22',nbIssues:21},
            {name:'angrybird',score:'100',nbIssues:10}
        ],
        user_social:[
            {name:'kim',score:'22',nbIssues:21},
            {name:'elisha',score:'100',nbIssues:10},
            {name:'elishaB',score:'88',nbIssues:8}
        ]*/
    };
    var mainApp = {

        initFunction: function () {
            /*MENU 
            ------------------------------------*/
            $('#main-menu').metisMenu();
			
            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });
            /* CITYLITY USER STAT
            -----------------------------------------*/

            dash.getUserCounts().then(x=>$('#nbUsers').text(x.items[0].count));
            dash.getTertiaryCount().then(x=>$('#nbUsersPro').text(x.items[0].count));
            dash.getResidentialCount().then(x=>$('#nbUsersPersonal').text(x.items[0].count));
            dash.getTertiaryResidentialCount().then(x=>$('#nbUsersBoth').text(x.items[0].count));

            /* MORRIS BAR CHART
			-----------------------------------------*/
            Morris.Bar({
                element: 'morris-bar-chart',
                data: [{
                    y: 'may17',
                    a: 100,
                    b: 90,
                    c: 22,
                    d: 10
                }, {
                    y: 'jun17',
                    a: 75,
                    b: 65,
                    c: 13,
                    d: 10
                }, {
                    y: 'jul17',
                    a: 50,
                    b: 40,
                    c: 22,
                    d: 10
                }, {
                    y: 'aug17',
                    a: 75,
                    b: 65,
                    c: 22,
                    d: 10
                }],
                xkey: 'y',
                ykeys: ['a', 'b', 'c', 'd'],
                labels: ['new android', 'new ios', 'quit android', 'quit ios'],
                hideHover: 'auto',
                resize: true
            });

            /* MORRIS DONUT CHART
			----------------------------------------*/
            Morris.Donut({
                element: 'morris-donut-chart',
                data: [{
                    label: "Download Sales",
                    value: 12
                }, {
                    label: "In-Store Sales",
                    value: 30
                }, {
                    label: "Mail-Order Sales",
                    value: 20
                }],
                resize: true
            });

            /* MORRIS AREA CHART
			----------------------------------------*/

            Morris.Area({
                element: 'morris-area-chart',
                data: [{
                    period: '2010 Q1',
                    iphone: 2666,
                    ipad: null,
                    itouch: 2647
                }, {
                    period: '2010 Q2',
                    iphone: 2778,
                    ipad: 2294,
                    itouch: 2441
                }, {
                    period: '2010 Q3',
                    iphone: 4912,
                    ipad: 1969,
                    itouch: 2501
                }, {
                    period: '2010 Q4',
                    iphone: 3767,
                    ipad: 3597,
                    itouch: 5689
                }, {
                    period: '2011 Q1',
                    iphone: 6810,
                    ipad: 1914,
                    itouch: 2293
                }, {
                    period: '2011 Q2',
                    iphone: 5670,
                    ipad: 4293,
                    itouch: 1881
                }, {
                    period: '2011 Q3',
                    iphone: 4820,
                    ipad: 3795,
                    itouch: 1588
                }, {
                    period: '2011 Q4',
                    iphone: 15073,
                    ipad: 5967,
                    itouch: 5175
                }, {
                    period: '2012 Q1',
                    iphone: 10687,
                    ipad: 4460,
                    itouch: 2028
                }, {
                    period: '2012 Q2',
                    iphone: 8432,
                    ipad: 5713,
                    itouch: 1791
                }],
                xkey: 'period',
                ykeys: ['iphone', 'ipad', 'itouch'],
                labels: ['iPhone', 'iPad', 'iPod Touch'],
                pointSize: 2,
                hideHover: 'auto',
                resize: true
            });

            /* MORRIS LINE CHART
			----------------------------------------*/
            Morris.Line({
                element: 'morris-line-chart',
                data: [{
                    y: '2006',
                    a: 100,
                    b: 90
                }, {
                    y: '2007',
                    a: 75,
                    b: 65
                }, {
                    y: '2008',
                    a: 50,
                    b: 40
                }, {
                    y: '2009',
                    a: 75,
                    b: 65
                }, {
                    y: '2010',
                    a: 50,
                    b: 40
                }, {
                    y: '2011',
                    a: 75,
                    b: 65
                }, {
                    y: '2012',
                    a: 100,
                    b: 90
                }],
                xkey: 'y',
                ykeys: ['a', 'b'],
                labels: ['Series A', 'Series B'],
                hideHover: 'auto',
                resize: true
            });
           
     
        },

        initialization: function () {
            mainApp.initFunction();

        }

    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.initFunction();
    });

}(jQuery));
