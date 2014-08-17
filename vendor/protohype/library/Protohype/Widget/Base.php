<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/14/14
 * Time: 9:10 PM
 */

namespace Protohype\Widget;

use Zend\View\Model\ViewModel;


abstract class Base {

    const MAX_COLUMNS = 12;
    const MIN_COLUMNS = 2;

    protected $_list = array();
    protected $_properties = array();

    public function add( Base $widget ){
        $this->_list[] = $widget;
    }

    public function render(){
        $view = new ViewModel(array(
            'message' => 'Hello world',
        ));

      //   var_dump($view->getTemplate());
        return 'empty';
    }

    public function setColumns( $columns ){
        if(  $columns >= self::MIN_COLUMNS && $columns <= self::MAX_COLUMNS ){
            $this->_properties[ 'columns' ] = $columns;
        }
    }

    public function __toString(){
        return $this->render();
    }

}