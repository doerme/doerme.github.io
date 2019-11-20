var printHighcharts=function(){
    $.ajax({
        url:'http://pingan.weixinlm.com/index.php?m=Excel&a=get_zoushi',
        data:{
            'code':$('.input_name').val(),
            'password':$('.input_pwd').val(),
            'from':pageex_zhiji_mapper(LS.get('pageex')),
            'code':LS.get('code')
        },
        dataType:'JSONP'
    }).then(function(jdata){
        if(jdata.err!=0){
            $('.tisblock').show();
            $('.tisblock.main').html('数据获取失败');
            setTimeout(function(){
                $('.tisblock').fadeOut(200);
            },1000);
            return;
        }else{
        	$('#container_1').highcharts({
                chart: {
                    type: 'line',
                    backgroundColor: 'rgba(0,0,0,0.2)'
                },
                legend : {
        		    itemStyle : {
        		        'fontSize' : '22px',
        		        'color' : '#FFF'
        		    },
        		    symbolHeight : 30,
        		    symbolWidth : 40,
        		    symbolPadding : 10
        		},
                title: {
                    text: '保费',
                    style : {
        				'fontSize' : '40px',
        		        'color' : '#FFF'
        			}
                },
                xAxis: {
                	labels: {
                        style: {
                            color: '#FFF',//颜色
                            fontSize:'20px'  //字体
                        }
                    },
                    categories: jdata.data.bf_series.categories
                },
                yAxis: {
                	gridLineWidth : 0,
                	showEmpty:false,
                	title : false,
                	labels: {
                        style: {
                            color: '#FFF',//颜色
                            fontSize:'20px'  //字体
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+this.x +': '+ this.y +'元';
                    },
                    style:{
                        fontSize:'26px',
                        padding:'18px'
                    }
                },
                series: jdata.data.bf_series.data,
                colors:[
                	'#ffcc00','#ed561b'
                ],
                exporting:{
                    enabled:false
                },
                credits: {
                    enabled: false
                }
            });

        	$('#container_2').highcharts({
                chart: {
                    type: 'line',
                    backgroundColor: 'rgba(0,0,0,0.2)'
                },
                legend : {
        		    itemStyle : {
        		        'fontSize' : '22px',
        		        'color' : '#FFF'
        		    },
        		    symbolHeight : 30,
        		    symbolWidth : 40,
        		    symbolPadding : 10
        		},
                title: {
                    text: '件数',
                    style : {
        				'fontSize' : '40px',
        		        'color' : '#FFF'
        			}
                },
                xAxis: {
                	labels: {
                        style: {
                            color: '#FFF',//颜色
                            fontSize:'20px'  //字体
                        }
                    },
                    categories: jdata.data.js_series.categories
                },
                yAxis: {
                	gridLineWidth : 0,
                	showEmpty:false,
                	title : false,
                	labels: {
                        style: {
                            color: '#FFF',//颜色
                            fontSize:'20px'  //字体
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+this.x +': '+ this.y +'件';
                    },
                    style:{
                        fontSize:'26px',
                        padding:'18px'
                    }
                },
                series: jdata.data.js_series.data,
                colors:[
                	'#ffcc00','#ed561b'
                ],
                exporting:{
                    enabled:false
                },
                credits: {
                    enabled: false
                }
            });
        	$('#container_3').highcharts({
                chart: {
                    type: 'line',
                    backgroundColor: 'rgba(0,0,0,0.2)'
                },
                legend : {
        		    itemStyle : {
        		        'fontSize' : '22px',
        		        'color' : '#FFF'
        		    },
        		    symbolHeight : 30,
        		    symbolWidth : 40,
        		    symbolPadding : 10
        		},
                title: {
                    text: jdata.data.team_bf_series.data[0].name+'保费',
                    style : {
        				'fontSize' : '40px',
        		        'color' : '#FFF'
        			}
                },
                xAxis: {
                	labels: {
                        style: {
                            color: '#FFF',//颜色
                            fontSize:'20px'  //字体
                        }
                    },
                    categories: jdata.data.team_bf_series.categories
                },
                yAxis: {
                	gridLineWidth : 0,
                	showEmpty:false,
                	title : false,
                	labels: {
                        style: {
                            color: '#FFF',//颜色
                            fontSize:'20px'  //字体
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+this.x +': '+ this.y +'万';
                    },
                    style:{
                        fontSize:'26px',
                        padding:'18px'
                    }
                },
                series: jdata.data.team_bf_series.data,
                colors:[
                	'#ffcc00','#ed561b'
                ],
                exporting:{
                    enabled:false
                },
                credits: {
                    enabled: false
                }
            });

        	$('#container_4').highcharts({
                chart: {
                    type: 'line',
                    backgroundColor: 'rgba(0,0,0,0.2)'
                },
                legend : {
        		    itemStyle : {
        		        'fontSize' : '22px',
        		        'color' : '#FFF'
        		    },
        		    symbolHeight : 30,
        		    symbolWidth : 40,
        		    symbolPadding : 10
        		},
                title: {
                    text: jdata.data.team_js_series.data[0].name+'活动率',
                    style : {
        				'fontSize' : '40px',
        		        'color' : '#FFF'
        			}
                },
                xAxis: {
                	labels: {
                        style: {
                            color: '#FFF',//颜色
                            fontSize:'20px'  //字体
                        }
                    },
                    categories: jdata.data.team_js_series.categories
                },
                yAxis: {
                	gridLineWidth : 0,
                	showEmpty:false,
                	title : false,
                	labels: {
                        style: {
                            color: '#FFF',//颜色
                            fontSize:'20px'  //字体
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+this.x +': '+ this.y +'%';
                    },
                    style:{
                        fontSize:'26px',
                        padding:'18px'
                    }
                },
                series: jdata.data.team_js_series.data,
                colors:[
                	'#ffcc00','#ed561b'
                ],
                exporting:{
                    enabled:false
                },
                credits: {
                    enabled: false
                }
            });
        }
    });
}