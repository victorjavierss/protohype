var WidgetAddWidget = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetAddWidget.prototype.guid = 0;
WidgetAddWidget.prototype.target = '';
WidgetAddWidget.prototype.widgets = null;

WidgetAddWidget.prototype.layout =    "<div id='@GUID@' class='col-md-2 col-sm-2 widget-add'><div class='height-1 content'>"
                                    + "<div class='add-widget'> <div class='outer-circle'><div class='inner-circle'><span>+</span></div></div> </div>"
                                    + "<div class='available-widgets panel-group'></div>"
                                    + "</div></div>";

WidgetAddWidget.prototype.attribs = {};

WidgetAddWidget.prototype.init = function(){
    var contentToAppend = this.layout.replace('@GUID@', this.guid );
    var widget = this;

    $('.content', this.target.container).append( contentToAppend );

    this.container = $('#'+this.guid);

    $('.add-widget', this.container).on('click', function(evt){
        $('.overlay').css('display','block');
       $(this.parentNode.parentNode ).addClass('clicked');
    });


    var plugin = this;

    $.each(registeredWidgets, function(widgetCategory, widgets){
        var collapseGUID = guid();

        var panel =   '<div class="panel panel-default">'
                    + '<div class="panel-heading">'
                    + '<h5 class="panel-title">'
                    + '<a data-toggle="collapse" data-parent="#accordion" href="#'+collapseGUID+'">'+widgetCategory+'</a>'
                    +  '</h5></div><div id="'+collapseGUID+'" class="panel-collapse collapse">' +
                       ' <div class="panel-body"></div></div></div>';

        $('.available-widgets',plugin.container).append(panel);

        $.each(widgets, function(index, widget){
            if( typeof window[widget] != 'undefined' ){
                var widgetP = window[widget].prototype;
                var button = $('<button type="button" class="btn btn-default" data-type="'+widget+'"  '
                                +'title="'+widgetP.description+'">'
                                +'<i class="fa '+widgetP.icon+'" data-type="'+widget+'">'+widgetP.description+'</button>');

                $(button).on('click', function(evt){
                    console.log(plugin);
                    console.log(plugin.target);
                    plugin.target.add( $(evt.target).data('type') );
                });

                $('.available-widgets #'+collapseGUID+' .panel-body',plugin.container).append(button);
            }
        });

    });

    var plugin = this;
}