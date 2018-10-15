//变量
var map, markers = [];

//参数常量
var mapparams = {
    init: {
        //初始地图中心, 先纬度再经度
        mapCenter: [37.8734242952, 112.5627103700],
        //初始缩放级别
        mapZoom: 7
    },
    //底图分类:GaoDe, Geoq, Google, TianDiTu
    baseMap: "Geoq",
    baseMapOpacity: 0.5,
    baseMapMinZoom: 0,
    baseMapMaxZoom: 18,
    ginfos:[
        {
            name: "行政分区",
            url: "addv.json",
            style: {
                color: "#000000",              //Stroke color
                weight: 1.2,                    //Stroke width in pixels
                fillColor: "#FFEF87",
                fillOpacity: 0.2,
            }
        }],
    points: {
        url: "data.json",
        chart: false
    }
};

//初始化地图对象
function initMap(divID) {
    map = L.map(divID, {
        center: mapparams.init.mapCenter,
        zoom: mapparams.init.mapZoom,
        zoomControl: false
    });

    L.control.zoom({
        zoomInTitle: '放大',
        zoomOutTitle: '缩小'
    }).addTo(map);

    var baseLayers;
    if(mapparams.baseMap === "GaoDe"){
        baseLayers = addGaoDeBaseMaps();
    }
    else if(mapparams.baseMap === "Geoq"){
        baseLayers = addGeoqBaseMaps();
    }
    else if(mapparams.baseMap === "Google"){
        baseLayers = addGoogleBaseMaps();
    }
    else if(mapparams.baseMap === "TianDiTu"){
        baseLayers = addTDTBaseMaps();
    }

    var overLayers = {};
    addMapLayers(function (index, name, glayer) {
        overLayers[name] = glayer;
        if(index == mapparams.ginfos.length){
            L.control.layers(baseLayers, overLayers).addTo(map);
        }
    });

    addMapPoints();
}

function addGaoDeBaseMaps() {
    var normalm = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });
    var imgm = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });
    var imga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });

    var normal = L.layerGroup([normalm]), image = L.layerGroup([imgm, imga]);
    map.addLayer(normal);

    var baseLayers = {
        "地图": normal,
        "影像": image,
    };
    return baseLayers;
}
function addGeoqBaseMaps(){
    var normalm1 = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });
    var normalm2 = L.tileLayer.chinaProvider('Geoq.Normal.Color', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });
    var normalm3 = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });
    var normalm4 = L.tileLayer.chinaProvider('Geoq.Normal.Gray', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });
    var normalm5 = L.tileLayer.chinaProvider('Geoq.Normal.Warm', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });
    var normalm6 = L.tileLayer.chinaProvider('Geoq.Normal.Cold', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });

    var normal = L.layerGroup([normalm1, normalm2, normalm3, normalm4, normalm5, normalm6]);
    map.addLayer(normalm1);

    var baseLayers = {
        "地图": normalm1,
        // "多彩": normalm2,
        "午夜蓝": normalm3,
        "灰色": normalm4,
        "暖色": normalm5,
        // "冷色": normalm6
    };
    return baseLayers;
}
function addGoogleBaseMaps(){
    var normalMap = L.tileLayer.chinaProvider('Google.Normal.Map', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });
    var satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });

    map.addLayer(normalMap);

    var baseLayers = {
        "地图": normalMap,
        "影像": satelliteMap,
    };
    return baseLayers;
}
function addTDTBaseMaps(){
    var normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });
    var normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });
    var imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });
    var imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
        maxZoom: mapparams.baseMapMaxZoom,
        minZoom: mapparams.baseMapMinZoom,
        opacity: mapparams.baseMapOpacity
    });

    var normal = L.layerGroup([normalm, normala]), image = L.layerGroup([imgm, imga]);
    map.addLayer(normal);

    var baseLayers = {
        "地图": normal,
        "影像": image,
    };
    return baseLayers;
}

function addMapLayers(callback) {
    var index = 0;
    $.each(mapparams.ginfos, function (i, item) {
        $.get(item.url, function (dataJson) {
            var glayer = L.geoJSON(dataJson.features, {
                style: item.style
            }).addTo(map);

            index++;
            callback(index, item.name, glayer);
        });
    });
}

var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});
var greenIcon = new LeafIcon({iconUrl: 'leaf-green.png'}),
    redIcon = new LeafIcon({iconUrl: 'leaf-red.png'}),
    orangeIcon = new LeafIcon({iconUrl: 'leaf-orange.png'});

function addMapPoints(){

    while (markers.length > 0){
        var marker = markers.shift();
        map.removeLayer(marker);
    }

    $.get(mapparams.points.url, function (item) {
        var datas = item.features;
        $.each(datas, function (i, data) {
            var dts = data.geometry.coordinates;

            var point;
            if(mapparams.points.chart) {
                var divID = "marker_" + data.properties.code;
                point = L.marker([dts[1], dts[0]], {
                    icon: L.divIcon({
                        className: 'leaflet-echart-icon',
                        iconSize: [160, 160],
                        html: '<div id="' + divID + '" style="width: 160px; height: 160px; position: relative; background-color: transparent;"></div>'
                    })
                }).addTo(map);

                setPointChart(divID, data);
            }
            else {
                point = L.marker([dts[1], dts[0]], {icon: greenIcon}).bindPopup(data.properties.name).addTo(map);
            }

            if(point) markers.push(point);
        });
    });
}
function setPointChart(divID, data){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(divID));
    // 指定图表的配置项和数据
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['20', '50'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: data.properties.value1,
                name: '直接访问'
            }, {
                value: data.properties.value2,
                name: '邮件营销'
            }, {
                value: data.properties.value3,
                name: '联盟广告'
            }, {
                value: data.properties.value4,
                name: '视频广告'
            }, {
                value: 20,
                name: '搜索引擎'
            }]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

//添加json文件作为辅助信息显示

//获取服务器端点数据信息并进行自定义绘制(marker点, 自定义仪表盘)

//主逻辑
initMap("mapid");
