var WidgetContainer = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetContainer.prototype.guid = 0;
WidgetContainer.prototype.description = 'Container';
WidgetContainer.prototype.icon = 'fa-inbox';
WidgetContainer.prototype.target = '';
WidgetContainer.prototype.container = null;
WidgetContainer.prototype.widgets = null;

WidgetContainer.prototype.layout = "<div id='@GUID@' class='height-1 widget widget-type-container'>"
                                    +"<div class='container-config'>"
                                    +"<div class='opener'><i class='fa fa-cog'></i></div>"
                                    +"<div class='addWidget'><i class='fa fa-plus-circle'></i></div>"
                                    +"<div class='delete'><i class='fa fa-trash-o'></i></div>"
                                    +"<div class='properties-config bubble'></div>"
                                    +"</div>"
                                    +"<div class='content clearfix'></div>"
                                    +"</div>";

WidgetContainer.prototype.attribs = {};

WidgetContainer.prototype.init = function(){
    this.widgets = new WidgetList();
    var contentToAppend = this.layout.replace('@GUID@', this.guid );

    $( contentToAppend ).insertBefore( $( this.target.container.selector + '> .content > .widget-add' ) );

    this.container = $('#'+this.guid);

    var plugin = this;

    $('.opener', this.container).on('click', function(evt){
        $('#'+plugin.guid+' > .container-config .properties-config').toggle();

        console.log('#'+plugin.guid+' > .container-config .properties-config');
    });

    WidgetContainer.prototype.attribs['background'] = new BackgroundSelector( this, '#'+this.guid );;
    WidgetContainer.prototype.attribs['wrapper'] = new ContainerWrapper( this );
    WidgetContainer.prototype.attribs['column'] = new ColumnCount( this, 6, 3, 12 );
    WidgetContainer.prototype.attribs['column'].value = 6;


    $('.delete', this.container).on('click', function(evt){
        $(plugin.container).addClass('deleting');
        bootbox.confirm(protohypeMessages.confirmDelete, function(resp){
            $(plugin.container).removeClass('deleting');
            if(resp){
                $(plugin.container).remove();
                plugin.target.remove(plugin);
            }
        });
    });

    var widgetAdd = new WidgetAddWidget( this, {Web:{widgets:['WidgetHTML','WidgetMenu','WidgetSlider','WidgetMedia','WidgetSocialNetworks'], open:true},
                                Video:{widgets:['WidgetVideo','WidgetVideoFeed','WidgetVideoEmbed','WidgetVideoUpload']},
                                Monetization:{widgets:['WidgetMonetizationVideoAds','WidgetMonetizationBanners','WidgetMonetizationPromotions']},
                                Forms:{widgets:['WidgetFormContact','WidgetFormSearch','WidgetFormNewsletter']}
                        });

    $( '.addWidget', this.container ).on('click', function(){
        $('.add-widget',widgetAdd.container).trigger('click');
    });
};

WidgetContainer.prototype.add = function( widget ){
    if ( typeof window[ widget ] == 'function' ){
        this.widgets.add( new window[ widget ] ( this) );
    }
};

WidgetContainer.prototype.remove = function( widget ){
    if ( typeof widget  == 'object' ){
        this.widgets.remove( widget );
    }
};