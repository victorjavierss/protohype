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

    public function __construct(){
        parent::__construct();
        $this->_attribs[ 'has_wrapper' ] = true;
    }

    public function setHasWrapper( $has ){
        $this->_attribs[ 'has_wrapper' ] = $has;
    }
}