var WidgetVideo = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetVideo.prototype.guid = 0;
WidgetVideo.prototype.description = 'Backlot';
WidgetVideo.prototype.icon = 'fa-play-circle-o';
WidgetVideo.prototype.target = '';
WidgetVideo.prototype.container = null;
WidgetVideo.prototype.widgets = null;

WidgetVideo.prototype.layout = "<div id='@GUID@' class='widget widget-type-video-backlot'>"
                                    +"<div class='container-config'>"
                                    +"<div class='opener'><i class='fa fa-cog'></i></div>"
                                    +"<div class='delete'><i class='fa fa-trash-o'></i></div>"
                                    +"<div class='properties-config bubble'></div>"
                                    +"</div>"
                                    +"<div class='content'>"
                                    +"<div id='@GUID@-player' class='videoDiv'></div>"
                                    +"</div>"
                                    +"</div>";

WidgetVideo.prototype.attribs = {};

WidgetVideo.prototype.init = function(){
    this.widgets = new WidgetList();

    var contentToAppend = this.layout.replace(/\@GUID\@/g, this.guid );
    $( contentToAppend ).insertBefore( $( this.target.container.selector + '> .content > .widget-add' ) );

    this.container = $('#'+this.guid);
    var plugin = this;
    
    plugin.getVideos();
    
    $('.opener', this.container).on('click', function(evt){
        $('.properties-config', plugin.container).toggle();
            
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

    $('.properties-config.bubble .thumb_image').on('click', function(evt){

    });
    
    this.attribs['columnCount'] = new ColumnCount( this, 10 );

}

WidgetVideo.prototype.getVideos = function(){
    var plugin = this;
    $.get("php/functions.php",{ "path":"assets", "method": 'GET'}, function(data){
        plugin.addVideosToList(data);
    },'json' ).error(function(data){
        console.log("e " + data);
    });
}

WidgetVideo.prototype.addVideosToList = function( data ){
    var plugin = this; 
    console.log(typeof data);
    $.each(data.items, function(i, video) {                

        var videoDiv = $('<div class="video_list_item">' +
            '<img src="' + (video.preview_image_url==null?'http://heicard.com.vn/Content/images/DefaultThumbnail.gif':video.preview_image_url) + '" alt="image" class="thumb_image"/>' + 
            '<div class="video_title">'+ video.name + '</div>' +
            '</div>');

        $(videoDiv).on('click', function(){
            plugin.generatePlayer( video.embed_code );
            $('.opener',widgetAdd.container).trigger('click');
            $('.i.fa.fa-cog',widgetAdd.container).trigger('click');
            
        });

       $(".properties-config.bubble", plugin.container).append(videoDiv);
        }); 
}

WidgetVideo.prototype.generatePlayer = function(ec){
    var plugin = this;
    OO.Player.create(plugin.guid+'-player', ec); 
}