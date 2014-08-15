<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/12/14
 * Time: 12:25 PM
 */

namespace Auth\Controller;

use Auth\Form\AuthForm;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Adapter\DbTable\CredentialTreatmentAdapter as AuthAdapter;

class AuthController extends AbstractActionController {

    public function indexAction(){

        $auth = new AuthenticationService();
        if ( $auth->hasIdentity() ) {
            return $this->redirect()->toRoute('home');
        }else{

            $form = new AuthForm();

            $request = $this->getRequest();

            if ($request->isPost()) {

                $form->setData( $request->getPost() );

                if ( $form->isValid() ) {

                    $dbAdapter = $this->getServiceLocator()->get('Zend\Db\Adapter\Adapter');

                    $authAdapter = new AuthAdapter( $dbAdapter );

                    $authAdapter->setTableName('user')
                                ->setIdentityColumn('username')
                                ->setCredentialColumn('password')
                                ->setCredentialTreatment(' SHA1(?) '); // AND active = '1'

                    $authAdapter->setIdentity( $request->getPost('username') )
                                ->setCredential( $request->getPost('password') );

                    $result = $auth->authenticate( $authAdapter );

                    if( $result->isValid() ){

                        $storage = $auth->getStorage();
                        $storage->write($authAdapter->getResultRowObject(null, array( 'password' ) ) );
                        return $this->redirect()->toRoute('home');

                    }else{
                        foreach ($result->getMessages() as $message) {
                            echo "$message\n";
                        }
                    }
                }
            }
        }

        return array('form' => $form);
    }

    public function recoverPasswordAction(){
        return new ViewModel();
    }

    public function logoutAction(){
        $auth = new AuthenticationService();
        $auth->clearIdentity();
        return $this->redirect()->toRoute('auth');
    }
} 