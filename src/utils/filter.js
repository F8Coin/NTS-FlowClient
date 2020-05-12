//  GMT  +8小时 时间转字符串
let GMTtoStr =  function GMTtoStr(date) {
                    // 根据GMT标识判断返回的时间类型
                    if(String(date).indexOf('GMT') >= 0){
                        var dateStr= date.replace('GMT','');
                        var dateSceconds= new Date(dateStr).getTime() + 1000*60*60*8
                        var dateGMT= new Date(dateSceconds);
                        var newDateStr = DateToStr(dateGMT);
                        return newDateStr;
                    }else {
                        // console.log('返回的是非GMT时间格式,直接使用')
                    }
                }

//  字符串 -8小时 转GMT
let StrtoGMT = function StrtoGMT(date) {
                    var dateSceconds= new Date(date).getTime() - 1000*60*60*8
                    // console.log(dateSceconds);
                    var dateGMT= new Date(dateSceconds);
                    var newDateGMT = DateToStr(dateGMT);
                    return newDateGMT + " GMT";
                }

//  根据传入的时间拼接成年月日
let DateToStr = function DateToStr(dateStr){
                    var date = new Date(dateStr)
                    var years, months,days,hours,minutes,seconds;
                    years= date.getFullYear();

                    if(date.getMonth() < 10) {
                        months= "0"+(date.getMonth()+1)
                    }else {
                        months= date.getMonth()+1
                    } 

                    if(date.getDate() < 10) {
                        days= "0"+date.getDate()
                    }else {
                        days= date.getDate()
                    } 

                    if(date.getHours() < 10) {
                        hours= "0"+date.getHours()
                    }else {
                        hours= date.getHours()
                    }

                    if(date.getMinutes() < 10) {
                        minutes= "0"+date.getMinutes()
                    }else {
                        minutes= date.getMinutes()
                    }

                    if(date.getSeconds() < 10) {
                        seconds= "0"+date.getSeconds()
                    }else {
                        seconds= date.getSeconds()
                    }

                    var strTime = years+"-"+months+"-"+days+" "+hours+":"+minutes+":"+seconds;
                    
                    return strTime 
                }

module.exports= {
    GMTtoStr,
    StrtoGMT,
    DateToStr
}                