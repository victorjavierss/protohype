<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/12/14
 * Time: 12:25 PM
 */

namespace Auth\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class AuthController extends AbstractActionController {

    public function indexAction(){
        return new ViewModel();
    }

    public function recoverPasswordAction(){
        return new ViewModel();
    }
} 