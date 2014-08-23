var guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
})();

var registeredWidgets = { 'Basic': ['WidgetContainer','WidgetEmpty'] };


var BackgroundSelector = function( widget, selector){
    this.widget = widget;
    this.guid = guid();

    if( label ){
        this.label = label
    }
    this.target = selector ? selector : widget.target;
    this.init();
}

BackgroundSelector.prototype.guid = null;
BackgroundSelector.prototype.widget = null;
BackgroundSelector.prototype.target = null;
BackgroundSelector.prototype.value = null;
BackgroundSelector.prototype.label = 'Background';
BackgroundSelector.prototype.palette = ["#F8F8F8","#7bd148", "#5484ed", "#a4bdfc","#46d6db","#7ae7bf","#51b749",
                                        "#fbd75b","#ffb878","#ff887c"];

BackgroundSelector.prototype.init = function() {
    var widget = this.widget;
    var property = this;
    var select = $('<select id="'+widget.guid+'-colorpicker-picker-'+this.guid+'"></select>');

    $.each(this.palette, function(index, value) {
        var option = $('<option></option>');
        option.attr('value', value);
        option.text(value);
        select.append(option);
    });

    var propertyDiv= $("<div class='widget-property'></div>");
    propertyDiv.append( this.label+': ' );
    propertyDiv.append(select);
    $('.properties-config', widget.container).append(propertyDiv);
    $('select#'+widget.guid+'-colorpicker-picker-'+this.guid).simplecolorpicker({picker:true});
    $('select#'+widget.guid+'-colorpicker-picker-'+this.guid).on('change', function(evt) {
        var selector = ( property.target == 'body' ) ? property.target :  property.target + '> .content';
        $(selector).css('background-color', $(evt.target).val() );
        property.value = $(evt.target).val();
    });
};

var ContainerWrapper = function( widget ){
    this.widget = widget;
    this.init();
}

ContainerWrapper.prototype.widget = null;
ContainerWrapper.prototype.label = 'Is Container?';
ContainerWrapper.prototype.init = function() {
    var widget = this.widget;
    var property = this;
    var propertyDiv= $("<div class='widget-property'></div>");
    propertyDiv.append( this.label );
    propertyDiv.append( $("<input type='checkbox' id='"+widget.guid+"-has-wrapper' />") );
    $('.properties-config', widget.container).append(propertyDiv);

    $('#'+widget.guid+'-has-wrapper').on('click', function(evt){
        property.value = this.checked;
        if( this.checked ){
            $(widget.container).addClass('container');
        }else{
            $(widget.container).removeClass('container');
        }
    });
};

var ColumnCount = function( widget, min, max ){
    this.widget = widget;
    this.init();
    this.min = min ? min : 2;
    this.max = max ? max : 12;
};

ColumnCount.prototype.widget = null;
ColumnCount.prototype.value = null;
ColumnCount.prototype.min = null;
ColumnCount.prototype.max = null;
ColumnCount.prototype.label = '# Columns';

ColumnCount.prototype.init = function() {
    var widget = this.widget;
    var property = this;
    var propertyDiv = $("<div class='widget-property'></div>");
    propertyDiv.append( this.label );
    propertyDiv.append( $("<input type='range' id='"+widget.guid+"-column-count' min='2' max='12' value='3' />") );
    $('.properties-config', widget.container).append(propertyDiv);
    $('#'+widget.guid+'-column-count').on('change', function(evt){
        $(widget.container).removeClass('col-md-' + property.columns );
        property.columns = $(this).val();
        $(widget.container).addClass('col-md-' + widget.attribs.columns );
    });
};