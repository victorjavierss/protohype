<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/12/14
 * Time: 12:25 PM
 */

namespace Demo\Controller;

use Protohype\Widget\Attribs;
use Zend\Mvc\Controller\AbstractActionController;
use Protohype\Widget\MainContainer;
use Protohype\Widget\Container as WidgetContainer;
use Protohype\Widget\Image as WidgetImg;
use Protohype\Widget\Social\Buttons as WidgetSocialButtons;

class DemoController extends AbstractActionController {

    public function indexAction(){

        $viewHelperManager = $this->getServiceLocator()->get('ViewHelperManager');
        $layout = $this->layout('layout/clean');

        $mainContainer = new MainContainer( $viewHelperManager);
        $header = new WidgetContainer( $viewHelperManager);
        $footer = new WidgetContainer( $viewHelperManager);

        $sidebar = new WidgetContainer( $viewHelperManager);
        $content = new WidgetContainer( $viewHelperManager);
        $mainContent = new WidgetContainer($layout, $viewHelperManager);

        $image = new WidgetImg(  $viewHelperManager );
        $image->setSource('https://cdn1.iconfinder.com/data/icons/picnic/Pic-Vay.png');

        $socialButtons = new WidgetSocialButtons( $viewHelperManager);
        $socialButtons->enableTwitter(true);
        $socialButtons->setTwitterAccount('ooyala_mexico');
        $socialButtons->setFacebookAccount('OoyalaMX');
        $socialButtons->enableFacebook(TRUE);
        $socialButtons->setFacebookAttribs(array('show_posts'=>true));


        $mainContainer->setTitle('Title From Main Container');
        $mainContainer->setBackground('#4f4e52');

        $mainContainer->addContainer( $header );
        $mainContainer->addContainer( $mainContent );
        $mainContainer->addContainer( $footer );

        $header->setColumns(12);
        $header->setHtmlTag( Attribs::TAG_HEADER );

        $mainContent->setColumns(12);
        $mainContent->addContainer($sidebar);
        $mainContent->addContainer($content);
        $mainContent->addContainer($sidebar);

        $sidebar->setColumns(3);
        $sidebar->setHasWrapper(FALSE);
        $content->setColumns(6);
        $content->setHasWrapper(FALSE);

        $footer->setColumns(12);

        $footer->setHtmlTag( Attribs::TAG_FOOTER );


        $content->addWidget($image);
        $header->addWidget($image);



        $sidebar->addWidget( $socialButtons );

        $render = $mainContainer->render();
        return array('final_result'=>$render);
    }
} 