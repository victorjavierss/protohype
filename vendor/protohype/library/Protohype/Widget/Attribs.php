<?php

namespace Protohype\Widget;

class Attribs {

    const COLUMNS = 'columns';
    const TITLE   = 'title';
    const BACKGROUND   = 'background';
    const HAS_WRAPPER   = 'has_wrapper';
    const HTML_TAG   = 'html_tag';


    const TAG_DIV     = 'div';
    const TAG_HEADER  = 'header';
    const TAG_FOOTER  = 'footer';
    const TAG_SECTION = 'section';
    const TAG_NAV     = 'nav';


    private static $_defaults = array(
        self::COLUMNS => 4,
        self::TITLE   => 'Untitled Document',
        self::BACKGROUND => '#FFF',
        self::HAS_WRAPPER   => TRUE,
        self::HTML_TAG   => self::TAG_DIV,
    );

    private $_attribs = array();

    public function __construct( array $attrs ){
        $this->_attribs = $attrs;
    }

    public function __set($attr, $value){
        $this->_attribs[$attr] = $value;
    }

    public function __get($attr){
        return isset($this->_attribs[$attr]) ? $this->_attribs[$attr] : self::getDefault( $attr );
    }

    private function _getDefault($attr){
        return isset(self::$_defaults[$attr]) ? self::$_defaults[$attr] : FALSE;
    }

    public static function getDefault( $attr ){
        return isset(self::$_defaults[$attr]) ? self::$_defaults[$attr] : FALSE;
    }
}