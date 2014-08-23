var WidgetContainer = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetContainer.prototype.guid = 0;
WidgetContainer.prototype.target = '';
WidgetContainer.prototype.container = null;
WidgetContainer.prototype.widgets = null;

WidgetContainer.prototype.layout = "<div id='@GUID@' class='main-container show-grid clearfix'>"
                                    +"<div class='container-config'>"
                                    +"<div class='opener'><i class='fa fa-cogs'></i></div>"
                                    +"<div class='properties-config'></div>"
                                    +"</div>";

WidgetContainer.prototype.attribs = {
    container_background : "#f8f8f8",
    site_background : "#f8f8f8",
    hasWrapper : false
};

WidgetContainer.prototype.init = function(){
    WidgetContainer.prototype.widgets = new WidgetList();
    var contentToAppend = this.layout.replace('@GUID@', this.guid );
    $(this.target).append( contentToAppend );

    this.container = $('#'+this.guid);

    var plugin = this;

    $('.opener', this.container).on('click', function(evt){
        $('#'+plugin.guid+' > .container-config .properties-config').toggle();
    });

    new BackgroundSelector( this, 'site_background', 'Site Background' );
    new BackgroundSelector( this, 'container_background','Container Background', '#'+this.guid );
    new ContainerWrapper( this );
}

WidgetContainer.prototype.add = function( widget ){

    if (typeof registeredWidgets[ widget ] != 'undefined' && registeredWidgets[ widget ]){
        this.widgets.add( new window[ widget ] ( this.container) );
    }
};