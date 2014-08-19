<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/12/14
 * Time: 12:25 PM
 */

namespace Demo\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Helper\ViewModel;
use Protohype\Widget\Container as WidgetContainer;
use Protohype\Widget\Html as WidgetHtml;

class DemoController extends AbstractActionController {

    public function indexAction(){

        $wc = new WidgetContainer();

        $wc->addWidget( new WidgetContainer() );
        $wc->setHasWrapper( TRUE );
        $wc->setColumns(12);

        $render = $wc->render();

        $this->layout('layout/clean');


        return array('final_result'=>$render);

    }
} 