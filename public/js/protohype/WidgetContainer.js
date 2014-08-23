var WidgetContainer = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetContainer.prototype.guid = 0;
WidgetContainer.prototype.description = 'Container';
WidgetContainer.prototype.icon = 'fa-square-o';
WidgetContainer.prototype.target = '';
WidgetContainer.prototype.container = null;
WidgetContainer.prototype.widgets = null;

WidgetContainer.prototype.layout = "<div id='@GUID@' class='height-1 col-md-6 widget-type-container'>"
                                    +"<div class='container-config'>"
                                    +"<div class='opener'><i class='fa fa-cogs'></i></div>"
                                    +"<div class='properties-config'></div>"
                                    +"</div><div class='content clearfix'></div>";

WidgetContainer.prototype.attribs = {};

WidgetContainer.prototype.init = function(){
    this.widgets = new WidgetList();
    var contentToAppend = this.layout.replace('@GUID@', this.guid );



    $( contentToAppend ).insertBefore( $( this.target.selector + '> .content > .widget-add' ) );

    this.container = $('#'+this.guid);

    var plugin = this;

    $('.opener', this.container).on('click', function(evt){
        $('#'+plugin.guid+' > .container-config .properties-config').toggle();
    });

    WidgetContainer.prototype.attribs[0] = new BackgroundSelector( this, '#'+this.guid );;
    WidgetContainer.prototype.attribs[0] = new ContainerWrapper( this );

    new WidgetAddWidget( this );
};

WidgetContainer.prototype.add = function( widget ){
    if (typeof registeredWidgets[ widget ] != 'undefined' && registeredWidgets[ widget ]){
        this.widgets.add( new window[ widget ] ( this.container) );
    }
};