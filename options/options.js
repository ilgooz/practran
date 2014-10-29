$('input').keyup(update);

chrome.storage.local.get(['from', 'to'], function(data){
    $('.from').val(data.from || 'en');
    $('.to').val(data.to || 'tr');
    update();
});

function update(){
    chrome.storage.local.set({
        from: $('.from').val(), 
        to: $('.to').val()
    });
}