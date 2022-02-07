<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request){

        $validator = Validator::make($request ->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        if($validator ->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages()
            ],401);
        }else{
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
            ],401);

            $token = $user->createToken($user->email.'_token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'token'=>$token,
                'message'=>'registered success'
            ],200);

        }
    }
    
    public function login(Request $request){
        
        $validator = Validator::make($request ->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if($validator ->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages()
            ],401);
        }else{
            $user = User::where('email', $request->email)->first();
            if(! $user || ! Hash::check($request->password, $user->password)){
                return response()->json([
                    'status'=>401,
                    'message'=>'invalid credentials'

                ],401);
            }else{
                $token = $user->createToken($user->email.'_token')->plainTextToken;

                return response()->json([
                    'status'=>200,
                    'name'=>$user->name,
                    'token'=>$token,
                    'message'=>'login success'
                ],200);
    
            }
                
         
        }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'logout heh '
        ]);
    }


    public function users(){
        $users = User::all();
        return response()->json([
            'status'=>200,
            'users'=>$users
        ],200);
    }

}
