var WidgetMainContainer = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetMainContainer.prototype.guid = 0;
WidgetMainContainer.prototype.target = '';
WidgetMainContainer.prototype.container = null;
WidgetMainContainer.prototype.widgets = null;

WidgetMainContainer.prototype.layout = "<div id='@GUID@' class='container-fluid'>"
                                     + "<div class='content clearfix'></div>";

WidgetMainContainer.prototype.attribs = {
    container_background : "#f8f8f8",
    site_background : "#f8f8f8",
    hasWrapper : false
};

WidgetMainContainer.prototype.init = function(){
    this.widgets = new WidgetList();
    var contentToAppend = this.layout.replace('@GUID@', this.guid );
    $('.content', this.target).append( contentToAppend );
    this.container = $('#'+this.guid);
}

WidgetMainContainer.prototype.add = function( widget ){
    if (typeof window[ widget ] != 'undefined' ){
        this.widgets.add( new window[ widget ] ( this.container) );
    }
};