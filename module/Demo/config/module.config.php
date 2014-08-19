<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Demo\Controller\Demo' => 'Demo\Controller\DemoController',
        ),
    ),
    'router' => array(
        'routes' => array(
            'demo' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/demo[/:id]',
                    'constraints' => array(
                        'id'     => '[0-9]+',
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
        'template_map' => array(
            'layout/clean' => __DIR__ . '/../view/layout/clean.phtml',
        ),
        'template_path_stack' => array(
            'demo' => __DIR__ . '/../view',
        ),
    ),
);