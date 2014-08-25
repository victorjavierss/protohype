var WidgetHTML = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetHTML.prototype.guid = 0;
WidgetHTML.prototype.description = 'HTML';
WidgetHTML.prototype.icon = 'fa-pencil-square-o';
WidgetHTML.prototype.target = '';
WidgetHTML.prototype.container = null;
WidgetHTML.prototype.widgets = null;

WidgetHTML.prototype.layout = "<div id='@GUID@' class='widget col-md-4 widget-type-html'>"
                                    +"<div class='container-config'>"
                                    +"<div class='opener'><i class='fa fa-cog'></i></div>"
                                    +"<div class='editor'><i class='fa fa-pencil'></i></div>"
                                    +"<div class='delete'><i class='fa fa-trash-o'></i></div>"
                                    +"<div class='properties-config bubble'></div>"
                                    +"</div>"
                                    +"<div class='content height-1'>"
                                    +"<textarea name='@GUID@-editor' id='@GUID@-editor'></textarea>"
                                    +"</div>"
                                    +"</div>";

WidgetHTML.prototype.attribs = {};

WidgetHTML.prototype.init = function(){
    this.widgets = new WidgetList();

    var contentToAppend = this.layout.replace(/\@GUID\@/g, this.guid );
    $( contentToAppend ).insertBefore( $( this.target.container.selector + '> .content > .widget-add' ) );

    this.container = $('#'+this.guid);
    var plugin = this;
    $('.opener', this.container).on('click', function(evt){
        $('.properties-config, .arrow-up', plugin.container).toggle();
    });

    $('.editor', this.container).on('click',function(evt){
        var editorInstance = CKEDITOR.instances[plugin.guid + '-editor'];
        editorInstance.setReadOnly(!editorInstance.readOnly);

        var visibility = $('#' + plugin.guid + ' .cke_bottom').css('visibility');
        visibility = visibility==='hidden' ? 'visible':'hidden';
        $('#' + plugin.guid + ' .cke_bottom').css('visibility',visibility);

        if( editorInstance.readOnly ){
            plugin.attribs['value'] = editorInstance.getData();
        }
    });

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
    
    this.attribs['columnCount'] = new ColumnCount( this, 4 );

    /* CKEDITOR config */
    CKEDITOR.replace(this.guid+'-editor',{
            uiColor: '#ffffff',
            readOnly:true,
            height: '116px',
            removePlugins:'elementspath',
            resize_enabled: false,
            toolbarLocation: 'bottom',
            colorButton_colors: '00923E,F8C100,28166F'
        });

    CKEDITOR.config.toolbar = [
        { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },
        { name: 'insert', items: [ 'Image', 'Link'] },
        { name: 'colors'}
    ];
}