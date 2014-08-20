<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/19/14
 * Time: 5:34 PM
 */

namespace Protohype\Widget\Social;

use Protohype\Widget\Base as WidgetBase;

class Buttons extends WidgetBase{

    protected $_template = 'social/buttons';

    public function __construct( $viewService ){
        parent::__construct($viewService);
        $this->setAttribs(array());
    }

    public function setTwitterAccount( $account ){
        $this->_attribs->twitterAccount = $account;
    }

    public function enableTwitter( $enabled ){
        $this->_attribs->twitterEnabled = $enabled;
    }

    public function setFacebookAccount( $account ){
        $this->_attribs->facebookAccount = $account;
    }

    public function enableFacebook( $enabled ){
        $this->_attribs->facebookEnabled = $enabled;
    }

    public function setFacebookAttribs( $attribs ){
        $this->_attribs->fbAttribs = array_merge(array(
                    'show_posts'  => false,
                    'show_faces'  => false,
                    'show_header' => false,
                    'show_border' => false,
                ), $attribs ) ;
    }

} 