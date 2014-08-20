<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/14/14
 * Time: 9:13 PM
 */

namespace Protohype\Widget;

use Protohype\Widget\Base as WidgetBase;

class Image extends WidgetBase{

    const STYLE_ROUNDED   = 'img-rounded';
    const STYLE_CIRCLE    = 'img-circle';
    const STYLE_THUMBNAIL = 'img-thumbnail';

    protected $_template = 'image';

    public function setSource( $source ){
        $this->_attribs->source = $source;
    }

    public function setStyle( $style ){
        $this->_attribs->image_style = $style;
    }
}