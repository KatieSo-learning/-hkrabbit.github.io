"use strict"

$(document).ready(function(){

// function serious consider
 $('p').hover(function(){
   $('.Applicants').toggleClass('serious-js');
 });

// function tables
/*
 * @license jQuery Basictable | MIT | Jerry Low | https://www.github.com/jerrylow/basictable
 */
!function(t){t.fn.basictable=function(e){const a=function(e,a){const i=[];if(a.tableWrap&&e.wrap('<div class="bt-wrapper"></div>'),a.header){let a="";a=e.find("thead tr th").length?"thead th":e.find("tbody tr th").length?"tbody tr th":e.find("th").length?"tr:first th":"tr:first td",t.each(e.find(a),(function(){const e=t(this),a=parseInt(e.attr("colspan"),10)||1,n=e.closest("tr").index();i[n]||(i[n]=[]);for(let t=0;t<a;t++)i[n].push(e)}))}t.each(e.find("tbody tr"),(function(){n(t(this),i,a)})),t.each(e.find("tfoot tr"),(function(){n(t(this),i,a)}))},n=function(e,a,n){e.children().each((function(){const e=t(this);if(""!==e.html()&&"&nbsp;"!==e.html()||n.showEmptyCells){const t=e.index();let i="";for(let e=0;e<a.length;e++){0!==e&&(i+=": ");i+=a[e][t].text()}e.attr("data-th",i),n.contentWrap&&!e.children().hasClass("bt-content")&&e.wrapInner('<span class="bt-content" />')}else e.addClass("bt-hide")}))},i=function(e,a){a.forceResponsive?null!==a.breakpoint&&t(window).width()<=a.breakpoint||null!==a.containerBreakpoint&&e.parent().width()<=a.containerBreakpoint?o(e,a):r(e,a):e.removeClass("bt").outerWidth()>e.parent().width()?o(e,a):r(e,a)},o=function(t,e){t.addClass("bt"),e.header||t.addClass("bt--no-header"),e.tableWrap&&t.parent(".bt-wrapper").addClass("active")},r=function(t,e){t.removeClass("bt bt--no-header"),e.tableWrap&&t.parent(".bt-wrapper").removeClass("active")},s=function(e,a){e.removeClass("bt bt--no-header"),e.find("td").removeAttr("data-th"),a.tableWrap&&e.unwrap(),a.contentWrap&&function(e){t.each(e.find("td"),(function(){const e=t(this),a=e.children(".bt-content").html();e.html(a)}))}(e),e.removeData("basictable")};this.each((function(){const n=t(this);if(0===n.length||n.data("basictable")){if(n.data("basictable")){const t=n.data("basictable");"destroy"===e?s(n,t):"restart"===e?(s(n,t),n.data("basictable",t),a(n,t),i(n,t)):"start"===e?o(n,t):"stop"===e?r(n,t):i(n,t)}return!1}const c=t.extend({},t.fn.basictable.defaults,e),l={breakpoint:c.breakpoint,containerBreakpoint:c.containerBreakpoint,contentWrap:c.contentWrap,forceResponsive:c.forceResponsive,noResize:c.noResize,tableWrap:c.tableWrap,showEmptyCells:c.showEmptyCells,header:c.header};null===l.breakpoint&&null===l.containerBreakpoint&&(l.breakpoint=568),n.data("basictable",l),a(n,n.data("basictable")),l.noResize||(i(n,n.data("basictable")),t(window).bind("resize.basictable",(function(){!function(t){t.data("basictable")&&i(t,t.data("basictable"))}(n)})))}))},t.fn.basictable.defaults={breakpoint:null,containerBreakpoint:null,contentWrap:!0,forceResponsive:!0,noResize:!1,tableWrap:!1,showEmptyCells:!1,header:!0}}(jQuery);
});
