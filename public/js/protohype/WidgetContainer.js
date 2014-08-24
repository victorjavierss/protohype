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
                                    +"<div class='opener'><i class='fa fa-cog'></i></div>"
                                    +"<div class='delete'><i class='fa fa-trash-o'></i></div>"
                                    +"<div class='properties-config bubble'></div>"
                                    +"</div>"
                                    +"<div class='content clearfix'></div>"
                                    +"</div>";

WidgetContainer.prototype.attribs = {};

WidgetContainer.prototype.init = function(){
    this.widgets = new WidgetList();
    var contentToAppend = this.layout.replace('@GUID@', this.guid );

    $( contentToAppend ).insertBefore( $( this.target.selector + '> .content > .widget-add' ) );

    this.container = $('#'+this.guid);

    var plugin = this;

    $('.opener', this.container).on('click', function(evt){
        $('#'+plugin.guid+' > .container-config .properties-config, .arrow-up').toggle();
    });

    WidgetContainer.prototype.attribs['background'] = new BackgroundSelector( this, '#'+this.guid );;
    WidgetContainer.prototype.attribs['wrapper'] = new ContainerWrapper( this );
    WidgetContainer.prototype.attribs['column'] = new ColumnCount( this, 3, 12 );
    WidgetContainer.prototype.attribs['column'].value = 6;


    $('.delete', this.container).on('click', function(evt){
        $(plugin).addClass('deleting');
        bootbox.confirm(protohypeMessages.confirmDelete, function(resp){
            $(plugin.container).removeClass('deleting');
            if(resp){
                console.log(plugin.target);
               // $(plugin.container).remove();
            }
        });

    });

    new WidgetAddWidget( this, {Web:{widgets:['WidgetEmpty'], open:true}, Video:{widgets:['WidgetEmpty']},Slider:{widgets:['WidgetEmpty']},Forms:{widgets:['WidgetEmpty']} }  );
};

WidgetContainer.prototype.add = function( widget ){
    if ( typeof window[ widget ] == 'function' ){
        this.widgets.add( new window[ widget ] ( this) );
    }
};