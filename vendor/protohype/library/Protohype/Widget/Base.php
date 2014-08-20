<?php
namespace Protohype\Widget;

use Zend\View\Model\ViewModel;
use Zend\View\Renderer\PhpRenderer;
use Zend\View\Resolver;

abstract class Base  {

    const MAX_COLUMNS = 12;
    const MIN_COLUMNS = 2;

    protected $_template = '';

    protected $_containerItems = array();
    protected $_attribs = array();

    protected $_viewManager   = null;

    public function __construct(  $viewHelperManager ){
        $this->_viewManager = $viewHelperManager;
        $this->_attribs = new Attribs( array() );
    }

    public function addContainer( Base $container ){
        $this->addWidget ( $container );
    }

    public function addWidget( Base $widget ){
        $this->_containerItems[] = $widget;
    }

    public function setAttribs( $attribs ){
        $this->_attribs = new Attribs($attribs);
    }

    public function render(){

        $resolver = new Resolver\AggregateResolver();

        $renderer = new PhpRenderer();
        $renderer->setResolver($resolver);

        $map = new Resolver\TemplateMapResolver( array(
            'protohype/'.$this->_template => __DIR__ . '/view/'.$this->_template.'.phtml',
        ) );

        $resolver->attach( $map );

        $innerContent = '';

        foreach( $this->_containerItems as $widget ){
            $innerContent .= $widget->render();
        }

        $viewModel = new ViewModel( array(
            'attribs' => $this->getAttribs(),
            'content' => $innerContent,
        ) );

        $viewModel->setTemplate( 'protohype/'.$this->_template );

        return $renderer->render($viewModel);
    }

    public function setColumns( $columns ){
        if(  $columns >= self::MIN_COLUMNS && $columns <= self::MAX_COLUMNS ){
            $this->_attribs->{Attribs::COLUMNS} = $columns;
        }else{
            throw new \Exception('Columns Out of Bounds');
        }
    }

    public function getColumns( ){
        return $this->_attribs->{Attribs::COLUMNS};
    }

    public function getAttribs(){
        return $this->_attribs;
    }

    public function __toString(){
        return $this->render();
    }
}