var WidgetAddWidget = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetAddWidget.prototype.guid = 0;
WidgetAddWidget.prototype.target = '';
WidgetAddWidget.prototype.widgets = null;

WidgetAddWidget.prototype.layout =    "<div id='@GUID@' class='col-md-3 height-1'>"
                                    + "<div class='add-widget'> <i class='fa fa-plus-circle'></i></div>"
                                    + "<div class='available-widgets'></div>"
                                    +"</div>";

WidgetAddWidget.prototype.attribs = {};

WidgetAddWidget.prototype.init = function(){
    var contentToAppend = this.layout.replace('@GUID@', this.guid );
    $(this.target.container).append( contentToAppend );
    this.container = $('#'+this.guid);

    var plugin = this;
    $.each(registeredWidgets, function(widget){
        var widgetP = window[widget].prototype;
        var button = $('<button type="button" class="btn btn-default" data-type="'+widget+'"  '
                        +'title="'+widgetP.description+'">'
                        +'<i class="fa '+widgetP.icon+'"></button>');

        $(button).on('click', function(evt){
            plugin.target.add( $(evt.target).data('type') );
        });

        $(plugin.container).append(button);

    } );

    var plugin = this;
}