$(function () {

    //PROMJENA POINTERA PRI HOVERANJU
    $(
        '#kontaktLink, #menuKontaktLink, .btnForm')
        .hover(function () {
            $(this).css('cursor', 'pointer');
        })

    $('#menuKontaktLink').hover(function () {
        $(this).css('cursor', 'pointer');
    })

    //PRITISAK KONTAKT IKONE
    $('#kontaktLink, #menuKontaktLink').click(function () {
        $('.modalForm').css('display', 'flex');
        $('.modalForm').fadeTo(250, 1);
        $('body').css('height', '100%');
        $('body').css('overflow', 'hidden')
    })

    //PRITISAK GUMBA ODUSTANI
    $('#btnCancel').click(function () {
        $('.modalForm').fadeTo(250, 0, function () {
            $('.modalForm').css('display', 'none');            
        });
        $('body').removeAttr('style');
    })

})