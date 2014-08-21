var WidgetContainer = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetContainer.prototype.guid = 0;
WidgetContainer.prototype.target = '';
WidgetContainer.prototype.container = null;
WidgetContainer.prototype.widgets = {};

WidgetContainer.prototype.layout = "<div id='@GUID@' class='main-container'>"
                                    +"<div class='container-config'>"
                                    +"<div class='opener'><i class='fa fa-cogs'></i></div>"
                                    +"<div class='properties-config'></div>"
                                    +"</div>";

WidgetContainer.prototype.attribs = {
    background : "#f8f8f8",
    hasWrapper : false
};

WidgetContainer.prototype.init = function(){
    var contentToAppend = this.layout.replace('@GUID@', this.guid );
    $(this.target).append( contentToAppend );

    this.container = $('#'+this.guid);

    this.setBackground( this.attribs.background );
    this.setHasWrapper( this.attribs.hasWrapper );

    var plugin = this;

    $('.opener', this.container).on('click', function(event){
        $('.properties-config', plugin.container).toggle();
    });

    var backgroundProperty = new backgroundSelector( this );

}

WidgetContainer.prototype.setHasWrapper = function( hasWrapper ){
    this.attribs.hasWrapper = hasWrapper;
    if(hasWrapper){
        $('#'+this.guid).addClass('container');
    }else{
        $('#'+this.guid).removeClass('container');
    }
}

WidgetContainer.prototype.setBackground = function( background ){
    this.attribs.background = background;
    $(this.target).css('background', background );
}