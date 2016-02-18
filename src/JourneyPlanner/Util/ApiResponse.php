<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/17/16
 * Time: 1:41 PM
 */

namespace JourneyPlanner\Util;


class ApiResponse
{
    private $status;
    private $data;
    public function setStatusSuccess()
    {
        $this->status = "success";
    }
    public function setStatusFail()
    {
        $this->status = "fail";
    }
    public function setData($data)
    {
        $this->data = ($data !== null ? $data : "");
    }
    public function toJSON()
    {
        $response = [];
        $response['status'] = $this->status;
        $response['data'] = $this->data;
        return json_encode($response, JSON_PRETTY_PRINT);
    }
    public function getData()
    {
        return $this->data;
    }
    public function getStatus()
    {
        return $this->status;
    }

}
use Monolog\Handler\Curl\Util;