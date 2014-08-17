<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/17/14
 * Time: 3:03 PM
 */

namespace Protohype;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Authentication\AuthenticationService;
use Zend\Mvc\MvcEvent;


class ProtohypeActionController extends AbstractActionController{

    public function onDispatch(MvcEvent $e)
    {

        $auth = new AuthenticationService();

        $this->layout()->hasIdentity = $auth->hasIdentity();

        if ( !$auth->hasIdentity() ) {
            return $this->redirect()->toRoute('auth');
        }else{
            $this->layout()->identity    = $auth->getIdentity();
        }


        return parent::onDispatch($e);
    }
} 