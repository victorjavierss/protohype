var WidgetEmpty = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetEmpty.prototype.guid = 0;
WidgetEmpty.prototype.description = 'Empty Widget';
WidgetEmpty.prototype.icon = 'fa-th';
WidgetEmpty.prototype.target = '';
WidgetEmpty.prototype.container = null;
WidgetEmpty.prototype.widgets = null;

WidgetEmpty.prototype.layout = "<div id='@GUID@' class='col-md-3 height-1'>"
                                    +"<div class='container-config'>"
                                    +"<div class='opener'><i class='fa fa-cogs'></i></div>"
                                    +"<div class='properties-config'></div>"
                                    +"</div>";

WidgetEmpty.prototype.attribs = {};

WidgetEmpty.prototype.init = function(){
    WidgetEmpty.prototype.widgets = new WidgetList();
    var contentToAppend = this.layout.replace('@GUID@', this.guid );
    $(this.target).append( contentToAppend );

    this.container = $('#'+this.guid);

    var plugin = this;

    $('.opener', this.container).on('click', function(evt){
        $('.properties-config', plugin.container).toggle();
    });

    new BackgroundSelector( this, 'container_background','Background', '#'+this.guid );

}