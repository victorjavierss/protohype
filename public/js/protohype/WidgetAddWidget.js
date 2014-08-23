var WidgetAddWidget = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetAddWidget.prototype.guid = 0;
WidgetAddWidget.prototype.target = '';
WidgetAddWidget.prototype.widgets = null;

WidgetAddWidget.prototype.layout =    "<div id='@GUID@' class='col-md-2 widget-add'><div class='height-1 content'>"
                                    + "<div class='add-widget'> <div class='outer-circle'><div class='inner-circle'><span>+</span></div></div> </div>"
                                    + "<div class='available-widgets'></div>"
                                    +"</div></div>";

WidgetAddWidget.prototype.attribs = {};

WidgetAddWidget.prototype.init = function(){
    var contentToAppend = this.layout.replace('@GUID@', this.guid );
    $('.content',this.target.container).append( contentToAppend );
    this.container = $('#'+this.guid);

    var plugin = this;
    $.each(registeredWidgets, function(widget){
        var widgetP = window[widget].prototype;
        var button = $('<button type="button" class="btn btn-default" data-type="'+widget+'"  '
                        +'title="'+widgetP.description+'">'
                        +'<i class="fa '+widgetP.icon+'" data-type="'+widget+'"></button>');

        $(button).on('click', function(evt){
            plugin.target.add( $(evt.target).data('type') );
        });

        $('.available-widgets',plugin.container).append(button);

    } );

    var plugin = this;
}