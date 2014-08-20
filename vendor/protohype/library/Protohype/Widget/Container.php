<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/14/14
 * Time: 9:13 PM
 */

namespace Protohype\Widget;

use Protohype\Widget\Base as WidgetBase;

class Container extends WidgetBase{

    protected $_template = 'container';


    public function setHasWrapper( $hasWrapper ){
        $this->_attribs->{Attribs::HAS_WRAPPER} = $hasWrapper;
    }

    public function setHtmlTag( $tag ){
        $this->_attribs->{Attribs::HTML_TAG} = $tag;
    }
}