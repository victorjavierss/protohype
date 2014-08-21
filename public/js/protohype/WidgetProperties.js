var guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
})();


var backgroundSelector = function( widget ){
    this.widget = widget;
    this.init();
}

backgroundSelector.prototype.widget = null;
backgroundSelector.prototype.palette = ["#F8F8F8","#7bd148", "#5484ed", "#a4bdfc","#46d6db","#7ae7bf","#51b749",
                                        "#fbd75b","#ffb878","#ff887c"];


backgroundSelector.prototype.init = function() {
    var widget = this.widget;
    var select = $('<select id="'+widget.guid+'-colorpicker-picker"></select>');
    $.each(this.palette, function(index, value) {
        var option = $('<option></option>');
        option.attr('value', value);
        option.text(value);
        select.append(option);
    });

    var propertyDiv= $("<div class='widget-property'></div>");
    propertyDiv.append( 'Background:' );
    propertyDiv.append(select);
    $('.properties-config', widget.container).append(propertyDiv);
    $('select#'+widget.guid+'-colorpicker-picker').simplecolorpicker();
    $('select#'+widget.guid+'-colorpicker-picker').on('change', function(evt) {
        $(widget.target).css('background-color', $(evt.target).val() );
    });
}