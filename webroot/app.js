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
        simpleAJAX('/ajax_markdown.php', "POST", {text: simpleDOM('#text').val()}, function(data){
                elem.after('<div id="md-preview">' + data + '</div>');
                old.remove();
                Rainbow.color();
            });
    };
    old.each(function(){old.hide()});//old.slideIn(0/*, displayNew*/);
    displayNew();
});

simpleDOM('.categories-item').bind('click', function(){
    var category = simpleDOM(this).attr('data-for');
    simpleDOM('.category-sample').hide();
    simpleDOM('.category-sample-' + category.replace(/[^A-Za-z0-9]/g, "-")).show();
    Rainbow.color();
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
    simpleDOM('.categories-item').each(function(elem){
        if(simpleDOM(elem).attr('data-for').indexOf(filter) == -1){
            simpleDOM(elem).hide();
        } else {
            simpleDOM(elem).show();
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
    var target = simpleDOM('#' + simpleDOM(this).attr('data-for'));
    if(target.hasClass('displayed')){
        target.hide();
        target.removeClass('displayed');
    } else {
        target.show();
        target.addClass('displayed');
    }//.slideIn(0);
});

simpleDOM('#title-tag-search').bind('keyup', function(event){
    elem = simpleDOM(this);
    if(!elem.hasClass('loaded')){
        simpleAJAX('/all_tutorials.php', 'GET', {}, function(data){
            elem.addClass('loaded');
            elem.addAttr('data-info', data); // Turn the data into json and put it under data-info
        });
    }
    simpleDOM('.search-complete').remove();
    var q = elem.val();
    if(q === "") return;
    var info = eval('(' + elem.attr('data-info') + ')');
    var res = {};
    for (var name in info){
        var t = true;
        q.split(' ').forEach(function(word){
                if(name.toLowerCase().indexOf(word.toLowerCase()) === -1){
                    t = false;
                }
            }
        );
        if(t){
            res[name] = info[name];
        }
    }
    var pos = elem.get(0).getBoundingClientRect();
    var loop = 0;
    for(name in res){
        var div = document.createElement('div');
        simpleDOM(div).addClass('search-complete')
            .html('<a href="/_r/'+res[name]+'/" style="width: 100%; height: 100%;">' + name + '</a>')
            .css('position', 'absolute').css('top', (pos.bottom + loop * 50) + "px")
            .css('left', '' + (pos.left) + "px").css('height', '50px')
            .css('border', 'ridge')
            .css('width', '206px')
            .css('z-index', 100);
        loop += 1;
        simpleDOM('#title-search').get(0).appendChild(div);
    }
});
