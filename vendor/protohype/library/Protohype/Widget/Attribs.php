<?php

namespace Protohype\Widget;

class Attribs {

    const COLUMNS = 'columns';

    private $_defaults = array(
        self::COLUMNS => 4
    );
    private $_attribs = array();

    public function __construct( array $attrs ){
        $this->_attribs = $attrs;
    }

    public function __get($attr){
        return isset($this->_attribs[$attr])?$this->_attribs[$attr] : $this->_getDefault( $attr );
    }

    private function _getDefault($attr){
        return isset($this->_defaults[$attr]) ?$this->_defaults[$attr] : FALSE;
    }
}