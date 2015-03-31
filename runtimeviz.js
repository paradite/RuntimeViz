/**
 * Created by paradite on 15/2/15.
 * Modified from Highcharts Base line demo
 * http://www.highcharts.com/demo/line-basic
 */
$(function () {
    //initialize values of n for the x-axis
    var max_display_number = 10000000000000;
    var number_of_n_values = 15;
    var n_factor = 2;
    var n_values = [];
    var n_value = 1;
    while(n_values.length < number_of_n_values){
        n_values.push(n_value);
        n_values.push(n_value + n_value/2);
        n_value*= n_factor;
    }

    var lg = function (n) {
        return Math.log(n)/Math.log(2);
    }

    var run_time_n = function (n) {
        return [n, n];
    }

    var run_time_n_square = function (n) {
        return [n, n*n];
    }

    var run_time_lg_n = function (n) {
        return [n, lg(n)];
    }

    var run_time_square_root_n = function (n) {
        return [n, Math.sqrt(n)];
    }

    var run_time_n_lg_n = function (n) {
        return [n, lg(n)*n];
    }

    var run_time_n_pow_lg_n = function (n) {
        return [n, Math.pow(n, lg(n))];
    }

    var run_time_n_pow_n = function (n) {
        return [n, Math.pow(n, n)];
    }

    var run_time_2_pow_n = function (n) {
        var result = Math.pow(2, n);

        if (result == Number.POSITIVE_INFINITY || result == Number.NEGATIVE_INFINITY)
        {
            return [n, Number.MAX_VALUE];
        }else{
            return [n, result];
        }
    }

    //Added on 1 Apr 2015
    var run_time_10_pow_lg_n = function (n) {
        var result = Math.pow(10, lg(n));

        if (result == Number.POSITIVE_INFINITY || result == Number.NEGATIVE_INFINITY)
        {
            return [n, Number.MAX_VALUE];
        }else{
            return [n, result];
        }
    }

    //Added on 1 Apr 2015
    var run_time_2_pow_lg_n = function (n) {
        var result = Math.pow(2, lg(n));

        if (result == Number.POSITIVE_INFINITY || result == Number.NEGATIVE_INFINITY)
        {
            return [n, Number.MAX_VALUE];
        }else{
            return [n, result];
        }
    }

    var calculate = function (f, values){
        var result = [];
        var n;
        for(n in values){
            var caculated_values = f(values[n]);
            if(caculated_values[1] < max_display_number){
                result.push(caculated_values);

            }else{
                //Limit the max of subsequent running time to the max of this running time
                //So that the graph looks less confusing
                var previous_caculated_values = f(values[n - 1]);
                max_display_number = previous_caculated_values[1];
                break;
            }
        }

        return result;
    }

    $('#container').highcharts({
        credits: {
            text: 'compiled by paradite',
            href: 'https://github.com/paradite',
            position: {
                align: 'right',
                x: -100,
                verticalAlign: 'top',
                y: 25
            },
            style: {
                cursor: 'pointer',
                color: '#909090',
                fontSize: '12px'

            }
        },
        chart: {
            type: 'spline'
        },
        title: {
            text: 'RuntimeViz',
            x: -20, //center
            useHTML: true
        },
        subtitle: {
            text: 'Visulize order of growth for different running time',
            x: -20
        },
        xAxis: {
            type: 'logarithmic',
            min: 2,
            title: {
                text: 'n'
            },
            tickPixelInterval: 100
        },
        yAxis: {
            type: 'logarithmic',
            min: 1,
            title: {
                text: 'Running time'
            }
        },
        tooltip: {
            formatter: function () {
                return 'n = <b>' + this.x + ', ' + this.series.name +
                    '</b> = <b>' + this.y + '</b>';
            },
            snap: 5,
            hideDelay: 200
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            itemHoverStyle: {
                color: '#FF0000'
            }
        },
        series: [{
            name: 'n^n',
            data: calculate(run_time_n_pow_n, n_values),
            visible: false
        }, {
            name: '2^n',
            data: calculate(run_time_2_pow_n, n_values)
        }, {
            name: 'n^lg(n)',
            data: calculate(run_time_n_pow_lg_n, n_values)
        }, {
            name: '10^lg(n)',
            data: calculate(run_time_10_pow_lg_n, n_values),
            visible: false
        }, {
            name: 'n^2',
            data: calculate(run_time_n_square, n_values)
        }, {
            name: 'nlg(n)',
            data: calculate(run_time_n_lg_n, n_values)
        }, {
            name: 'n',
            data: calculate(run_time_n, n_values),
        }, {
            name: '2^lg(n)',
            data: calculate(run_time_2_pow_lg_n, n_values),
            visible: false
        }, {
            name: 'sqrt(n)',
            data: calculate(run_time_square_root_n, n_values)
        }, {
            name: 'lg(n)',
            data: calculate(run_time_lg_n, n_values)
        }],
        plotOptions: {
            series: {
                stickyTracking: false,
                allowPointSelect: true
            }
        }
    });

    var chart = $('#container').highcharts();
});