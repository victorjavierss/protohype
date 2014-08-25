var WidgetVideo = function( target ){
    this.guid = guid();
    this.target = target;
    this.init();
}

WidgetVideo.prototype.guid = 0;
WidgetVideo.prototype.description = 'HTML Widget';
WidgetVideo.prototype.icon = 'fa-pencil-square-o';
WidgetVideo.prototype.target = '';
WidgetVideo.prototype.container = null;
WidgetVideo.prototype.widgets = null;

WidgetVideo.prototype.layout = "<div id='@GUID@' class='widget col-md-4 widget-type-html'>"
                                    +"<div class='container-config'>"
                                    +"<div class='opener'><i class='fa fa-cog'></i></div>"
                                    +"<div class='delete'><i class='fa fa-trash-o'></i></div>"
                                    +"<div class='properties-config bubble'></div>"
                                    +"</div>"
                                    +"<div class='content height-1'>"
                                    +"<textarea name='@GUID@-editor' id='@GUID@-editor'></textarea>"
                                    +"</div>"
                                    +"</div>";

WidgetVideo.prototype.attribs = {};

WidgetVideo.prototype.init = function(){
    this.widgets = new WidgetList();

    var contentToAppend = this.layout.replace(/\@GUID\@/g, this.guid );
    $( contentToAppend ).insertBefore( $( this.target.container.selector + '> .content > .widget-add' ) );

    this.container = $('#'+this.guid);
    var plugin = this;
    $('.opener', this.container).on('click', function(evt){
        $('.properties-config', plugin.container).toggle();
    });
    
    this.attribs['columnCount'] = new ColumnCount( this, 4 );

}

WidgetVideo.prototype.getVideos = function(){
    $.ajax({
        type: "GET",
        data: {
            "path":"assets",
            "method": 'GET'
        },
        url: "../../php/functions.php",
        success: function (data) {
            addVideosToList(data);
        },
        error: function (data) {
            alert("e " + data);
        }
    });
}

WidgetVideo.prototype.addVideosToList = function(){
    var video_data = jQuery.parseJSON(data);        
    $.each(video_data.items, function(i,video) {                
       $(".content .height-1").append('<div class="video_list_item">' +
            '<img src="' + (video.preview_image_url==null?'http://heicard.com.vn/Content/images/DefaultThumbnail.gif':video.preview_image_url) + '" alt="image" class="thumb_image"/>' +                            
            '<div class="video_title">'+ video.name + '</div>' +
            '</div>');
        }); 
}