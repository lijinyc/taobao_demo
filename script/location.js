var cName = "ipLocation";
var currentLocation = "北京";
var currentProvinceId = 1;

//根据省份ID获取名称
function getNameById(provinceId) {
    var iplocation = getProvice();
    for (var o in iplocation) {
        if (iplocation[o] && iplocation[o].id == provinceId) {
            return iplocation[o].name;
        }
    }
    return "北京";
}

var provinceHtml = '<div class="content"><div data-widget="tabs" class="m JD-stock" id="JD-stock">'
    + '<div class="mt">'
    + '    <ul class="tab">'
    + '        <li data-index="0" data-widget="tab-item" class="curr"><a  class="hover" id="one_1"><em>请选择</em><i></i></a></li>'
    + '        <li data-index="1" data-widget="tab-item" style=""><a  class="" id="one_2"><em>请选择</em><i></i></a></li>'
    + '        <li data-index="2" data-widget="tab-item" style=""><a  class="" id="one_3"><em>请选择</em><i></i></a></li>'
    + '        <li data-index="3" data-widget="tab-item" style=""><a  class="" id="one_4"><em>请选择</em><i></i></a></li>'
    + '    </ul>'
    + '    <div class="stock-line"></div>'
    + '</div>'
    + '<div class="mc" data-area="0" data-widget="tab-content" id="stock_province_item">'
    + '</div>'
    + '<div class="mc" data-area="1" data-widget="tab-content" id="stock_city_item"></div>'
    + '<div class="mc" data-area="2" data-widget="tab-content" id="stock_area_item"></div>'
    + '<div class="mc" data-area="3" data-widget="tab-content" id="stock_town_item"></div>'
    + '</div></div>';

function getProvice() {
    var pros = [];
    for (var i = 0; i < provinces.length; i++) {
        pros[pros.length] = {};
        pros[i].id = provinces[i].id;
        pros[i].name = provinces[i].provinceName;
    }
    return pros;
}
function getCity(province) {
    var cits = [];
    for (var i = 0; i < citys.length; i++) {
        if (citys[i].provinceId == province) {
            cits[cits.length] = {id: citys[i].id, name: citys[i].name};
        }
    }
    return cits;
}
function getArea(city) {
    var ares = [];
    for (var i = 0; i < areas.length; i++) {
        if (areas[i].cityId == city) {
            ares[ares.length] = {id: areas[i].id, name: areas[i].areaName};
        }
    }
    return ares;
}


function getAreaList(result) {
    var html = ["<ul class='area-list'>"];
    var longhtml = [];
    var longerhtml = [];
    if (result && result.length > 0) {
        for (var i = 0, j = result.length; i < j; i++) {
            result[i].name = result[i].name.replace(" ", "");
            if (result[i].name.length > 12) {
                longerhtml.push("<li class='longer-area'><a data-value='" + result[i].id + "'>" + result[i].name + "</a></li>");
            }
            else if (result[i].name.length > 5) {
                longhtml.push("<li class=''><a data-value='" + result[i].id + "'>" + result[i].name + "</a></li>");
            }
            else {
                html.push("<li><a data-value='" + result[i].id + "'>" + result[i].name + "</a></li>");
            }
        }
    }
    else {
        html.push("<li><a  data-value='" + currentAreaInfo.currentFid + "'> </a></li>");
    }
    html.push(longhtml.join(""));
    html.push(longerhtml.join(""));
    html.push("</ul>");
    return html.join("");
}
function cleanKuohao(str) {
    if (str && str.indexOf("(") > 0) {
        str = str.substring(0, str.indexOf("("));
    }
    if (str && str.indexOf("（") > 0) {
        str = str.substring(0, str.indexOf("（"));
    }
    return str;
}

function chooseProvince(provinceId) {
    provinceContainer.hide();
    currentAreaInfo.currentLevel = 1;
    currentAreaInfo.currentProvinceId = provinceId;
    currentAreaInfo.currentProvinceName = getNameById(provinceId);
    currSelect();
    if (!page_load) {
        currentAreaInfo.currentCityId = 0;
        currentAreaInfo.currentCityName = "";
        currentAreaInfo.currentAreaId = 0;
        currentAreaInfo.currentAreaName = "";
        currentAreaInfo.currentTownId = 0;
        currentAreaInfo.currentTownName = "";
    }
    areaTabContainer.eq(0).removeClass("curr").find("em").html(currentAreaInfo.currentProvinceName);
    areaTabContainer.eq(1).addClass("curr").show().find("em").html("请选择");
    areaTabContainer.eq(2).hide();
    areaTabContainer.eq(3).hide();
    cityContainer.show();
    areaContainer.hide();
    townaContainer.hide();
    var currCitys = getCity(provinceId);
    if (currCitys) {
        cityContainer.html(getAreaList(currCitys));
        cityContainer.find("a").click(function () {
            if (page_load) {
                page_load = false;
            }
            $("#store-selector").unbind("mouseout");
            chooseCity($(this).attr("data-value"), $(this).html());
            //获得当前点击的市，然后存放到input(通过input传值给后台)
            // var one_2=$(this).text();      
            // $("#city").attr("value",one_2);
        });
        if (page_load) { //初始化加载
            if (currentAreaInfo.currentCityId && new Number(currentAreaInfo.currentCityId) > 0) {
                chooseCity(currentAreaInfo.currentCityId, cityContainer.find("a[data-value='" + currentAreaInfo.currentCityId + "']").html());
            }
            else {
                chooseCity(cityContainer.find("a").eq(0).attr("data-value"), cityContainer.find("a").eq(0).html());
            }
        }
    }
}
function chooseCity(cityId, cityName) {
    provinceContainer.hide();
    cityContainer.hide();
    currentAreaInfo.currentLevel = 2;
    currentAreaInfo.currentCityId = cityId;
    currentAreaInfo.currentCityName = cityName;
    currSelect();
    if (!page_load) {
        currentAreaInfo.currentAreaId = 0;
        currentAreaInfo.currentAreaName = "";
        currentAreaInfo.currentTownId = 0;
        currentAreaInfo.currentTownName = "";
    }
    areaTabContainer.eq(1).removeClass("curr").find("em").html(cityName);
    areaTabContainer.eq(2).addClass("curr").show().find("em").html("请选择");
    areaTabContainer.eq(3).hide();
    areaContainer.show().html("<div class='iloading'>正在加载中，请稍候...</div>");
    townaContainer.hide();
    var currAreas = getArea(cityId);
    if (currAreas) {
        areaContainer.html(getAreaList(currAreas));
        areaContainer.find("a").click(function () { 
            if (page_load) {
                page_load = false;
            }
            $("#store-selector").unbind("mouseout");
            chooseArea($(this).attr("data-value"), $(this).html());  
            $('.content,.close').attr('style','visibility:hidden');
             //获取当前点击的区，然后将值放入到input(通过input传值给后台)
            // var one_3=$(this).text();
            // $("#area").attr("value",one_3);          
        });
    }
}
function chooseArea(areaId, areaName) {
    provinceContainer.hide();
    cityContainer.hide();
    //areaContainer.hide();
    currentAreaInfo.currentLevel = 3;
    currentAreaInfo.currentAreaId = areaId;
    currentAreaInfo.currentAreaName = areaName;
    currSelect();
    if (!page_load) {
        currentAreaInfo.currentTownId = 0;
        currentAreaInfo.currentTownName = "";
    }
    //areaTabContainer.eq(2).removeClass("curr").find("em").html(areaName);
    //areaTabContainer.eq(3).addClass("curr").show().find("em").html("请选择");
    //townaContainer.show().html("<div class='iloading'>正在加载中，请稍候...</div>");

}
$("#store-selector i").after(provinceHtml);
var areaTabContainer = $("#JD-stock .tab li");
var provinceContainer = $("#stock_province_item");
var cityContainer = $("#stock_city_item");
var areaContainer = $("#stock_area_item");
var townaContainer = $("#stock_town_item");
var currentDom = provinceContainer;
//当前地域信息
var currentAreaInfo;
//初始化当前地域信息
function CurrentAreaInfoInit() {
    currentAreaInfo = {
        "currentLevel": 1,
        "currentProvinceId": 1,
        "currentProvinceName": "北京",
        "currentCityId": 0,
        "currentCityName": "",
        "currentAreaId": 0,
        "currentAreaName": "",
        "currentTownId": 0,
        "currentTownName": ""
    };
}
var page_load = true;
(function () {
    $(".close").click(function () {    
        $('#store-selector').removeClass('hover');
        return false;
    });
    $("#store-selector").unbind("click").bind("click", function () {
        $('#store-selector').addClass('hover');
        $("#store-selector .content,#JD-stock").show();
    }).find("dl").remove();
    CurrentAreaInfoInit();
    provinceContainer.html(getAreaList(getProvice()));
    areaTabContainer.eq(0).find("a").click(function () {
        areaTabContainer.removeClass("curr");
        areaTabContainer.eq(0).addClass("curr").show();
        provinceContainer.show();
        cityContainer.hide();
        areaContainer.hide();
        townaContainer.hide();
        areaTabContainer.eq(1).hide();
        areaTabContainer.eq(2).hide();
        areaTabContainer.eq(3).hide();
    });
    areaTabContainer.eq(1).find("a").click(function () {
        areaTabContainer.removeClass("curr");
        areaTabContainer.eq(1).addClass("curr").show();
        provinceContainer.hide();
        cityContainer.show();
        areaContainer.hide();
        townaContainer.hide();
        areaTabContainer.eq(2).hide();
        areaTabContainer.eq(3).hide();
    });
    areaTabContainer.eq(2).find("a").click(function () {
        areaTabContainer.removeClass("curr");
        areaTabContainer.eq(2).addClass("curr").show();
        provinceContainer.hide();
        cityContainer.hide();
        areaContainer.show();
        townaContainer.hide();
        areaTabContainer.eq(3).hide();
    });
    provinceContainer.find("a").click(function () {
        if (page_load) {
            page_load = false;
        }
        $("#store-selector").unbind("mouseout");
        chooseProvince($(this).attr("data-value"));
        //获取当前点击省，将值放入到input(通过input传值给后台)
        /*var one_1=$(this).text();
        $("#province").attr("value",one_1);*/
    }).end();

    cityContainer.hide();
    areaContainer.hide();
    townaContainer.hide();
    areaTabContainer.eq(1).hide();
    areaTabContainer.eq(2).hide();
    areaTabContainer.eq(3).hide();
})();

function currSelect() {
    var currText = '';
    if (currentAreaInfo.currentLevel > 0) {
        currText += currentAreaInfo.currentProvinceName;        
    }
    if (currentAreaInfo.currentLevel > 1) {
        currText += '-' + currentAreaInfo.currentCityName;
    }
    if (currentAreaInfo.currentLevel > 2) {
        currText += '-' + currentAreaInfo.currentAreaName;
    }
    if (currentAreaInfo.currentLevel > 3) {
        currText += '-' + currentAreaInfo.currentTownName;
    } 
     $('#choice,.one4DivThreeTwo i').click(function(){        
        $('.content,.close').attr('style','visibility:show');
     });
    $('#choice').text(currText);
}
