<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/12/14
 * Time: 6:01 PM
 */

namespace Auth\Form;
use Zend\Form\Form;

class AuthForm extends Form{

    public function __construct($name = null){
        parent::__construct('auth');

        $this->setAttribute('method', 'post');

        $this->add(array(
            'name' => 'username',
            'attributes' => array(
                'type'  => 'text',
            ),
            'options' => array(
                'label' => 'Username',
            ),
        ));

        $this->add(array(
            'name' => 'password',
            'attributes' => array(
                'type'  => 'password',
            ),
            'options' => array(
                'label' => 'Password',
            ),
        ));

        $this->add(array(
            'name' => 'submit',
            'attributes' => array(
                'type'  => 'submit',
                'value' => 'Go',
                'id' => 'submit-button',
            ),
        ));
    }

} 