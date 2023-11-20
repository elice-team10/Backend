var request = require('request');

var url = 'http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccToClAreaPd';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=서비스키'; /* Service Key*/
queryParams += '&' + encodeURIComponent('PRDT_CL_CD_01') + '=' + encodeURIComponent('PRH000'); /* */
queryParams += '&' + encodeURIComponent('PRDT_CL_CD_02') + '=' + encodeURIComponent('PRH200'); /* */
queryParams += '&' + encodeURIComponent('FD_COL_CD') + '=' + encodeURIComponent('CL1002'); /* */
queryParams += '&' + encodeURIComponent('START_YMD') + '=' + encodeURIComponent('20180302'); /* */
queryParams += '&' + encodeURIComponent('END_YMD') + '=' + encodeURIComponent('20180802'); /* */
queryParams += '&' + encodeURIComponent('N_FD_LCT_CD') + '=' + encodeURIComponent('LCA000'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});
