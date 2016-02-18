<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/18/16
 * Time: 5:20 PM
 */

namespace JourneyPlanner\Model;


use DateTime;
use ORM;

class TripModel
{
    public static function createTrip($data)
    {
        $trip = ORM::for_table("trip")->create();
        $trip->user_id = $data['user_id'];
        $trip->destination = $data['destination'];
        $trip->start_date = (new DateTime($data['start_date']))->format("Y-m-d");
        $trip->end_date = (new DateTime($data['end_date']))->format("Y-m-d");
        $trip->comment = $data['comment'];
        $trip->save();
        return $trip->id();
    }

    public static function updateTrip($data)
    {
        $trip = ORM::for_table("trip")->find_one($data['id']);
        $trip->destination = $data['destination'];
        $trip->start_date = (new DateTime($data['start_date']))->format("Y-m-d");
        $trip->end_date = (new DateTime($data['end_date']))->format("Y-m-d");
        $trip->comment = $data['comment'];
        $trip->save();
    }

    public static function getTrip($tripId)
    {
        $trip = ORM::for_table("trip")->find_one($tripId);
        if($trip !== false)
        {
            return $trip->as_array();
        }else
        {
            return false;
        }
    }
    public static function getAllTrips()
    {
        return ORM::for_table("trip")->order_by_asc('user_id')->order_by_asc('id')->find_array();
    }
    public static function getUserTrips($userId)
    {
        return ORM::for_table("trip")->order_by_asc('id')->where('user_id',$userId)->find_array();
    }
    public static function deleteTrip($tripId)
    {
        $trip = ORM::for_table("trip")->find_one($tripId);
        if($trip !== false)
        {
            return $trip->delete();
        }else
        {
            return false;
        }
    }
}