<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {

//        Dashboard hesaplamalarının yapıldığı yer
        $countData = Tasks::where('user_id', Auth::user()->id)->get();
        $countPrice = 0;
        $countTask = 0;
        $countCompleteTask = 0;
        $countcompleteTodayTask = 0;
        $countCancelTask = 0;
        $countWaitingTask = 0;
        foreach ($countData as $p)
        {
            $countPrice += $p->price;
            $countTask ++;

            if( $p->status == 3 )
            {
                $countCompleteTask ++;
            }elseif ( $p->status == 3 && $p->ends_at == now()){
                $countcompleteTodayTask ++;
            }elseif ( $p->status == 4 ){
                $countCancelTask ++;
            }elseif ( $p->status == 0 ){
                $countWaitingTask ++;
            }

        }



        $data = [
            'selected_nav_links' => [
                'sidebar-dashboard'
            ],
            'head' => [
                'title' => 'Ana Sayfa',
                'icon' => 'icon-shop-b',
            ],
            'assets' => [
                'js' => [
                    url('js/app.js'),
                    url('js/dashboard.js')
                ]
            ],
            'tasks' => $countData,
            'total' => $countPrice,
            'tasksTotal' => $countTask,
            'tasksComplete' => $countCompleteTask,
            'tasksTodayComplete' => $countcompleteTodayTask,
            'tasksCancel' => $countCancelTask,
            'tasksWaiting' => $countWaitingTask,
            'user' => Auth::user()
        ];

        return view('dashboard.index')->with($data);
    }
}
