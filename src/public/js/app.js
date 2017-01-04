/**
 * Created by Ian on 2015/8/3.
 */

// 默认的汇率，更新时间2015.8.01
var defaultInfo = {
    version:"20150813",
    spanInfo:"Aug 13, 2015",
    exrates:{"AED":"2.8082000000","AFN":"39.6036271610","ALL":"73.7917343586","AMD":"287.1421214887","ANG":"1.3725000000","AOA":"67.8089914277","ARS":"7.0671000000","AUD":"1.0367000000","AWG":"1.3709610000","AZN":"0.5513280648","BAM":"1.3626267610","BBD":"1.5318000000","BDT":"54.6897184876","BGN":"1.3626267610","BHD":"0.2879784000","BIF":"1086.6383579391","BMD":"0.7659000000","BND":"1.0594000000","BOB":"4.8598949718","BRL":"2.6483000000","BSD":"0.7646000000","BTN":"48.8520000000","BWP":"6.0735257397","BYR":"6280.5965289993","BZD":"1.5318000000","CAD":"1.0000000000","CDF":"646.5177142152","CHF":"0.7479000000","CLP":"523.5602000000","CNY":"4.8876000000","COP":"2277.9043000000","CRC":"354.8507977939","CUC":"0.7659000000","CUP":"20.2963500000","CVE":"76.8216255000","CZK":"18.6012000000","DJF":"136.1165139000","DKK":"5.1361000000","DOP":"29.7145752253","DZD":"56.5547025227","EGP":"4.9153943176","ERN":"11.4885000000","ETB":"13.2479794534","EUR":"0.6883000000","FJD":"1.6207000000","FKP":"0.4927000000","GBP":"0.4894000000","GEL":"1.1671500493","GHS":"3.1348000000","GIP":"0.4927000000","GMD":"24.4436878348","GNF":"4800.1206708866","GTQ":"5.9844000000","GYD":"143.8277704569","HKD":"5.9304000000","HNL":"16.6528000000","HRK":"5.1921000000","HTG":"31.1803133437","HUF":"213.7666000000","IDR":"10526.3158000000","ILS":"2.8910000000","INR":"49.7265000000","IQD":"814.8635128266","IRR":"17437.2709679150","ISK":"101.2146000000","JMD":"89.6057000000","JOD":"0.5430231000","JPY":"95.0570000000","KES":"61.5754054098","KGS":"34.0935114268","KHR":"2856.8629609287","KMF":"342.7537920850","KPW":"92.6271941171","KRW":"901.7133000000","KWD":"0.2001843508","KYD":"0.6382499974","KZT":"107.2452396361","LAK":"5498.5110485685","LBP":"1154.5942500000","LKR":"102.4066000000","LRD":"53.9793710639","LSL":"9.7087000000","LTL":"2.4346140000","LVL":"0.3705763579","LYD":"0.8910991940","MAD":"7.4683000000","MDL":"8.9433537508","MGA":"1531.8044376517","MKD":"32.5006599426","MMK":"961.5385000000","MNT":"1102.7967925500","MOP":"6.1283256000","MRO":"213.4558842723","MUR":"21.6617679338","MVR":"10.7747747843","MWK":"232.0937127177","MXN":"12.5141000000","MYR":"3.1201000000","MZN":"21.0290970008","NAD":"9.7087000000","NGN":"113.5293428902","NIO":"17.3928402135","NOK":"6.2933000000","NPR":"78.1632000000","NZD":"1.1682000000","OMR":"0.2944863120","PAB":"0.7646000000","PEN":"2.4777000000","PGK":"1.7357213266","PHP":"35.2858000000","PKR":"77.8816000000","PLN":"2.8818000000","PYG":"3112.1656932611","QAR":"2.7878760000","RON":"3.0469000000","RSD":"82.6446000000","RUB":"49.4071000000","RWF":"454.3520675363","SAR":"2.8721250000","SBD":"5.0201166747","SCR":"8.4592954463","SDG":"3.0945828362","SEK":"6.5147000000","SGD":"1.0742000000","SHP":"0.4927000000","SLL":"3035.5047882933","SOS":"926.0306340413","SRD":"2.3209371272","SSP":"2.1451085569","STD":"17069.1500000000","SYP":"77.8530226741","SZL":"9.7087000000","THB":"26.9614000000","TJS":"3.3525585145","TMT":"2.0044457008","TND":"1.4990000000","TOP":"1.2248569860","TRY":"2.1683000000","TTD":"4.8614000000","TWD":"24.5942000000","BTC":"0.0010986596","TZS":"1137.2591923171","UAH":"9.6816501236","UGX":"1812.0892449011","USD":"0.7646000000","UYU":"15.3709739103","UZS":"1487.7628973778","VEF":"4.8170000000","VND":"16949.1525000000","VUV":"69.2061252468","WST":"1.6475137032","XAF":"451.4673000000","XCD":"2.0568000000","XOF":"457.0052419000","XPF":"82.1693000000","YER":"151.2503826927","ZAR":"9.7847000000","ZMW":"3.8119634029"}
};

// 查询本地存储中的最新版本
var autoUseNewestInfo = function(){
    window.exrates = defaultInfo.exrates;
    $('div .updated span').html(defaultInfo.spanInfo);

    var ls = window.localStorage;
    if(ls){
        var dataStr = ls.getItem("CurrencyInfo");
        if(dataStr){
            var d = JSON.parse(dataStr);
            try{
                var save_version = parseInt(d.version);
                var default_version = parseInt(defaultInfo.version);
                if(save_version > default_version){
                    window.exrates = d.exrates;
                    $('div .updated span').html(d.spanInfo);
                }
            }catch(e){
                console.error(e)
            }
        }
    }
};

// 存储最新的版本到本地储存
var saveNewestInfo = function(key, item){
    var ls = window.localStorage;
    if(ls){
        ls.setItem(key, item);
    }
};

// 设置默认的加载方式
window.onRemoteFrameLoad = function(){
    // 从远端请求最新的汇率数据
    try {
        console.log('begin load iframe....');

        //获取iframe中的对象
        var iframeWindow = $('#job_ad')[0].contentWindow;  // iframe中的windows对象
        var remoteUpdateInfo= $('#job_ad').contents().find('div .updated span').html(); // iframe中的元素的查找方式

        //系统的更新数据使用网络的
        $('div .updated span').html(remoteUpdateInfo);

        //系统数据使用网络的
        window.exrates = iframeWindow.exrates;

        //存储最新的版本数据
        var itemObj = {
            version: $.getFormatDateStr((new Date()), "yyyyMMdd"),
            spanInfo: remoteUpdateInfo,
            exrates:window.exrates
        };
        saveNewestInfo("CurrencyInfo", JSON.stringify(itemObj));

        console.log('end load iframe....');
    } catch (e) {
        setTimeout(function () {
            onRemoteFrameLoad();
        }, 15000);
    }
};


// 配置
$('#refreshBtn').on('click',function(){
    try{
        onRemoteFrameLoad();
        console.log('click refreshBtn');
    }catch(e){

    }
});

// 默认处理方式
autoUseNewestInfo();
