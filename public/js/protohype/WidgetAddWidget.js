var WidgetAddWidget = function( target, widgets ){
    this.guid = guid();
    this.target = target;
    this.registeredWidgets = widgets;
    this.init();
}

WidgetAddWidget.prototype.guid = 0;
WidgetAddWidget.prototype.target = '';
WidgetAddWidget.prototype.widgets = null;
WidgetAddWidget.prototype.registeredWidgets = {};
WidgetAddWidget.prototype.layout =    "<div id='@GUID@' class='col-md-2 col-sm-2 widget-add'><div class='height-1 content'>"
                                    + "<div class='add-widget'> <div class='outer-circle'><div class='inner-circle'><span>+</span></div></div> </div>"
                                    + "<div class='available-widgets'></div>"
                                    + "</div></div>";

WidgetAddWidget.prototype.attribs = {};

WidgetAddWidget.prototype.init = function(){
    var contentToAppend = this.layout.replace('@GUID@', this.guid );
    var widget = this;

    $('.content', this.target.container).append( contentToAppend );

    this.container = $('#'+this.guid);

    $('.add-widget', this.container).on('click', function(evt){
       $('.overlay').css('display','block');
       $(this.parentNode.parentNode).addClass('clicked');
       $(this.parentNode.parentNode).removeClass('col-md-2').addClass('col-md-4');
        $('.content',this.parentNode.parentNode).removeClass('height-1').addClass('height-2');
    });

    var plugin = this;

    $.each(this.registeredWidgets, function(index,widget){

        var widgetP = window[widget].prototype;
        var button = $('<button type="button" class="btn btn-default" data-type="'+widget+'"  '
            +'title="'+widgetP.description+'">'
            +'<i class="fa '+widgetP.icon+'"  data-type="' + widget + '" ></i> '+widgetP.description+'</button>');

        $(button).on('click', function(evt){
            console.log(  evt.target, $(evt.target).data('type'), plugin.target);

            plugin.target.add( $(evt.target).data('type') );
        });


        $('.available-widgets', plugin.container).append(button);

    } );

    var plugin = this;
}