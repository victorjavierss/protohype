<?php
/**
 * Created by PhpStorm.
 * User: vjavier
 * Date: 8/7/14
 * Time: 9:38 PM
 */

namespace Application\Model;


class Application {
    public $id;
    public $artist;
    public $title;

    public function exchangeArray($data)
    {
        $this->id     = (!empty($data['id'])) ? $data['id'] : null;
        $this->artist = (!empty($data['artist'])) ? $data['artist'] : null;
        $this->title  = (!empty($data['title'])) ? $data['title'] : null;
    }
} 