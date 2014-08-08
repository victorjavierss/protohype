<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/7/14
 * Time: 10:53 PM
 */

namespace Demo\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class DemoController extends AbstractActionController{

    public function indexAction()
    {
        return new ViewModel();
    }

} 