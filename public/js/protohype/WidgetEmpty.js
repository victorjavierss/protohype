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

WidgetEmpty.prototype.layout = "<div id='@GUID@' class='widget col-md-3'>"
                                    +"<div class='container-config'>"
                                    +"<div class='opener'><i class='fa fa-cog'></i></div>"
                                    +"<div class='delete'><i class='fa fa-trash-o'></i></div>"
                                    +"<div class='properties-config bubble'></div>"
                                    //+"<div class='properties-config'></div>"
                                    +"</div>"
                                    +"<div class='content height-1'></div>"
                                    +"</div>";

WidgetEmpty.prototype.attribs = {};

WidgetEmpty.prototype.init = function(){
    WidgetEmpty.prototype.widgets = new WidgetList();
    var contentToAppend = this.layout.replace('@GUID@', this.guid );

    $( contentToAppend ).insertBefore( $( '.widget-add', this.target) );

    this.container = $('#'+this.guid);

    var plugin = this;

    $('.opener', this.container).on('click', function(evt){
        $('.properties-config, .arrow-up', plugin.container).toggle();
    });

    new BackgroundSelector( this, 'container_background','Background', '#'+this.guid );
    new ColumnCount( this );

}