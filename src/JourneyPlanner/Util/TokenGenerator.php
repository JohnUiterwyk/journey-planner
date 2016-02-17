<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/17/16
 * Time: 2:13 PM
 */

namespace JourneyPlanner\Util;


class TokenGenerator
{
    public static function getToken($salt)
    {
        return sha1(uniqid($salt, true));
    }
}