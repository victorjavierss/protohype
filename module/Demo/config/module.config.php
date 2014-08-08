<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Demo\Controller\Demo' => 'Demo\Controller\DemoController',
        ),
    ),

    // The following section is new and should be added to your file
    'router' => array(
        'routes' => array(
            'demo' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/app[/][/:app]',
                    'constraints' => array(
                        'app' => '[a-zA-Z][a-zA-Z0-9_-]*',
                    ),
                    'defaults' => array(
                        'controller' => 'Demo\Controller\Demo',
                        'action'     => 'index',
                    ),
                ),
            ),
        ),
    ),

    'view_manager' => array(
        'template_path_stack' => array(
            'album' => __DIR__ . '/../view',
        ),
    ),
);