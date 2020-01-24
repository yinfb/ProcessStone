function getDayOfYear() {
    var now = new Date()
    var start = new Date(now.getFullYear(), 0, 0).getTime()
    var diff = now.getTime() - start
    var oneDay = 1000 * 60 * 60 * 24
    var day = Math.floor(diff / oneDay)
    return day
}
function fetchjson() {
   fetch('data.json').then(fdata=>fdata.json())
   .then(data=>LoadPage(data))
   .catch(e=>console.log("Error ",e))
}


function LoadPage(json){
    document.getElementById("title").innerText=json.config.title;
    document.getElementById("descr").innerText=json.config.descr;
    json.contents.forEach(box => {
        makebox(box)
    });
}
function makebox(boxinfo){
    const box='<div class="box"><span class="boxheadtext">'+boxinfo.boxheadText+'</span>'
    const barbox='<div class="barbox">'
    res=''
    console.log(boxinfo)
    if(boxinfo.type==="re"){
        res=box+'<h2 class="boxtext"><span>'+boxinfo.boxmain+'</span></h2>'+'<p class="right boxtext">'+ boxinfo.boxafter+'</p></div>';
    }

    if(boxinfo.type==="bar"){
        res=barbox+box+'<h2 class="boxtext"><span>'+boxinfo.boxmain+'</span></h2>'+'</div>'
        res+='<div class="progressbar flex-r">'
        boxinfo.boxbars.forEach(element => {
            color = '#'+ Math.random().toString(16).substr(-6);
            res+='<span class="colorbar" style="width:'+element+'%;background-color:'+color+';"></span>';
        });
        res+='</div></div>'
    }

    if(boxinfo.type==="table"){
        thisyearcd=''
        bar=''
        Year=new Date().getFullYear()
        if(boxinfo.tableheadyear===Year){
            days=getDayOfYear()
            FullYearDays=(new Date(Year, 2, 0).getDate()==29 ? 366 : 365)
            bar+=barbox+'<div class="progressbar flex-r">'
            color = '#'+ Math.random().toString(16).substr(-6);
            bar+='<span class="colorbar" style="width:'+days/FullYearDays*100+'%;background-color:'+color+';"></span></div>'
            thisyearcd='   —— '+days+'  of  '+FullYearDays;
        }
        res=bar+'<div class="box"><span class="boxheadtext">'+boxinfo.tableheadyear
        res+=' ——'+boxinfo.yeardescr+thisyearcd
        res+='</span>'+'<table class="boxtable" cellpadding="8"><tbody class="">';
        boxinfo.table.forEach(tr => {
            res+='<tr class="rowstyle"><td><span>'+tr[0]+'</span></td><td>'+tr[1]+'</td><td><span>'+tr[2]+'</span></td></tr>'
        });
        res+='</tbody></table></div></div>'
    }
    console.log(boxinfo.type)
    document.getElementById("container").innerHTML+=res;
}
fetchjson()