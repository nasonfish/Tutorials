// This will actually happen, not bound to an event.
if(document.height > ("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight)){// - $('.footer').height();
    simpleDOM('#bottom').css('position', 'relative').css('bottom', '0');
} else {
    simpleDOM('#bottom').css('position', 'absolute').css('bottom', '0');
}

simpleDOM('.showall').bind('click', function(){
    simpleDOM('#' + simpleDOM(this).attr('for') + '-dot').hide();
    simpleDOM('#' + simpleDOM(this).attr('for') + '-truncated').hide();
    simpleDOM('#' + simpleDOM(this).attr('for')).show();
    simpleDOM(this).hide();
});

simpleDOM('.markdown-test').bind('click', function(){
    var elem = simpleDOM(this);
    var old = simpleDOM('#md-preview');
    var displayNew = function(){
        /*$.post('/ajax_markdown.php', {text: $('#text').val()})
            .done(function(data){
                elem.after('<div id="md-preview" style="display: none;">' + data + '</div>');
                $('#md-preview').slideDown("slow");
                old.remove();
                Rainbow.color();
                resize();
            }); Sadly, this will not work with simpleDOM... yet */
    };
    old.each(function(){old.hide()});//old.slideIn(0/*, displayNew*/);
    displayNew();
});

simpleDOM('.categories-item').bind('click', function(){
    var category = simpleDOM(this).attr('data-for');
    //simpleDOM('.categories-right').slideUp("slow", function(){
        //simpleDOM(this).empty();
        /*$.post('/ajax_category.php', {category: category})
        .done(function(data){
            var right = $('.categories-right');
            right.html(data);
            right.slideDown();
            Rainbow.color();
            resize();
        });*/
    //});
});


var reattach = function(){
    simpleDOM('.add-tag').bind('click', function(){
        var remove = simpleDOM(this).attr('data-tag');
        simpleDOM(this).remove();
        var data = simpleDOM('#tags-data');
        var oldtags = data.html();
        var tags = oldtags.split(',');
        for(var i = 0; i < tags.length; i++){
            if(tags[i] == remove){
                tags.splice(i, i == 0 ? 1 : i);
            }
        }
        data.html(tags.join(','));
    });
};

reattach();

simpleDOM('#tags').bind('keydown', function(event){
    while(simpleDOM(this).val().indexOf(',') != -1){
        simpleDOM(this).val(simpleDOM(this).val().replace(',',''));
    }
    if(event.keyCode == 188){
        event.preventDefault();
        if(simpleDOM(this).val() == ""){
            return;
        }
        var tag = simpleDOM(this).val();
        var data = simpleDOM('#tags-data');
        var oldtags = data.html();
        for(var i = 0; i < oldtags.split(',').length; i++){
            if(oldtags.split(',')[i] == tag){
                // do something
                return;
            }
        }
        simpleDOM('#tutorial-tags').append('<li class="add-tag" data-tag="'+tag+'"><a>'+tag+' <span>X</span></a></li>');
        reattach();
        simpleDOM(this).val('');
        var tags = oldtags.split(',');
        tags.push(tag);
        data.html(tags.join(','));
    }
});

simpleDOM('#category-filter').bind('keyup', function(event){
    var filter = simpleDOM(this).val();
    $('.categories-item').each(function(elem){
        if(simpleDOM(elem).attr('data-for').indexOf(filter) == -1){
            simpleDOM(elem).css('display', 'none');
        } else {
            simpleDOM(elem).css('display', 'block');
        }
    });
});

simpleDOM('#submit-tutorial').bind('click', function(event){
    simpleDOM('#form-errors').remove();
    // Places: title, description, text, category
    var errors = [];
    if(simpleDOM('#title').val() == ""){
        errors.push('Title field is blank.');
    }
    if(simpleDOM('#description').val() == ""){
        errors.push('Description field is blank.');
    }
    if(simpleDOM('#text').val() == ""){
        errors.push('Tutorial is blank. There\'s got to be something the user has to do!');
    }
    if(simpleDOM('#category').val() == ""){
        errors.push('Category field is blank.');
    }
    if(errors.length != 0){
        event.preventDefault();
        var error = "";
        for(var i = 0; i < errors.length; i++){
            error += "<li>" + errors[i] + "</li>";
        }
        simpleDOM(this).after('<div class="alert alert-error" id="form-errors"><ul>'+error+'</ul></alert>');
    } else {
        simpleDOM('#tags').val(simpleDOM('#tags-data').html());
    }
});

simpleDOM('.show-toggle').bind('click', function(){
    var target = simpleDOM('#' + simpleDOM(this).attr('for'));
    if(target.hasClass('displayed')){
        target.hide();
        target.removeClass('displayed');
    } else {
        target.show();
        target.addClass('displayed');
    }//.slideIn(0);
});

simpleDOM('.link').bind('click', function(){
    window.location.href = simpleDOM(this).attr('data-href');
});
