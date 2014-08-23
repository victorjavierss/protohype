var WidgetHTML = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetHTML.prototype.guid = 0;
WidgetHTML.prototype.target = '';
WidgetHTML.prototype.container = null;
WidgetHTML.prototype.widgets = null;

WidgetHTML.prototype.layout = "<div id='@GUID@' class='main-container show-grid clearfix'>"
                                    +"<div class='container-config'>"
                                    +"<div class='opener'><i class='fa fa-cogs'></i></div>"
                                    +"<div class='properties-config'></div>"
                                    +"</div>";

WidgetHTML.prototype.attribs = {
    container_background : "#f8f8f8",
    hasWrapper : false
};

WidgetHTML.prototype.init = function(){
    WidgetHTML.prototype.widgets = new WidgetList();
    var contentToAppend = this.layout.replace('@GUID@', this.guid );
    $(this.target).append( contentToAppend );

    this.container = $('#'+this.guid);

    var plugin = this;

    $('.opener', this.container).on('click', function(evt){
        $('#'+plugin.guid+' > .container-config .properties-config').toggle();
    });

    new BackgroundSelector( this, 'container_background','Container Background', '#'+this.guid );
    new ContainerWrapper( this );
}

WidgetHTML.prototype.add = function( widget ){
    
};