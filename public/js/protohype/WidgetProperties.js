var guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
})();

var registeredWidgets = {'WidgetEmpty':true};

var BackgroundSelector = function( widget, attrib, label, selector){
    this.widget = widget;
    this.attrib = attrib;
    this.guid = guid();

    if( label ){
        this.label = label
    }
    this.target = selector ? selector: widget.target;
    this.init();
}

BackgroundSelector.prototype.guid = null;
BackgroundSelector.prototype.widget = null;
BackgroundSelector.prototype.target = null;
BackgroundSelector.prototype.attrib = null;
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
    $('select#'+widget.guid+'-colorpicker-picker-'+this.guid).simplecolorpicker();
    $('select#'+widget.guid+'-colorpicker-picker-'+this.guid).on('change', function(evt) {
        $(property.target).css('background-color', $(evt.target).val() );
        widget.attribs[property.attrib] = $(evt.target).val();
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
    var propertyDiv= $("<div class='widget-property'></div>");
    propertyDiv.append( this.label );
    propertyDiv.append( $("<input type='checkbox' id='"+widget.guid+"-has-wrapper'></div>") );
    $('.properties-config', widget.container).append(propertyDiv);

    $('#'+widget.guid+'-has-wrapper').on('click', function(evt){

        widget.attribs.hasWrapper = this.checked;
        if( this.checked ){
            $(widget.container).addClass('container');
        }else{
            $(widget.container).removeClass('container');
        }
    });

}