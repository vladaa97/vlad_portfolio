function toggle() {
    var sec = document.querySelector('#particles-js');
    var nav = document.querySelector('#navigation');
    sec.classList.toggle('active');
    nav.classList.toggle('active');
}
/* load pages - content*/
$('.nav_link').click(function (event) {
    event.preventDefault();
    let link_href = $(this).attr('href');
    let urlPush;
    if(link_href != ''){
        urlPush = '?page='+link_href;
        window.history.pushState('', '', urlPush);
    }
    load_content(link_href, render_content);
});
function load_content(page, callbackFunction){
    var ajaxUrl = location.protocol.concat("//").concat(window.location.hostname).concat("/pages/"+page+".html");
    $.ajax({
        url: ajaxUrl,
        success: function(content){
            Object.keys(window);
            var res = ['a', 'x'].map(prop => delete window[prop]);
            callbackFunction(content);
        },
        error: function (content) {
            callbackFunction(0);
        }
    });
}
function render_content(content) {
    if(content){
        load_page_animation();
        $($('.content')[0]).replaceWith(content);
        $('.active').removeClass('active');
    }else{
        load_content('404', load_404);
    }
}
function load_404(content){
    load_page_animation();
    $($('.content')[0]).replaceWith(content);
    $('.active').removeClass('active');
}
function loadPage(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    if(vars['page']){
        load_content(vars['page'], render_content);
    }else{
        load_content('home', render_content);
    }
}
function load_page_animation(){
    /*animation before load page here!*/
}
window.addEventListener('load', (event) => {
    loadPage();
});
window.onpopstate = function(){
    loadPage();
};
