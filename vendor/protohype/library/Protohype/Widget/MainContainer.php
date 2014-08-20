<?php
/**
 * Debe establecer:
 *  - Title Page
 *  - Background del sitio
 *  - Sitio Full Width o con container
 */

namespace Protohype\Widget;

class MainContainer extends Base{

    protected $_template = 'main';

    public function setTitle( $title ){
        $this->_attribs->{Attribs::TITLE} = $title;
    }

    public function getTitle( ){
        return $this->_attribs->{Attribs::TITLE};
    }

    public function setBackground( $background ){
        $this->_attribs->{Attribs::BACKGROUND} = $background;
    }

    public function render(){
        $titleHelper = $this->_viewManager->get('headTitle');
        $titleHelper( $this->getTitle() );
        $headStyle = $this->_viewManager->get('headStyle');
        $headStyle()->captureStart();
        echo "body { background-color:". $this->_attribs->{Attribs::BACKGROUND}. "; }";
        $headStyle()->captureEnd();
        return parent::render();
    }
}