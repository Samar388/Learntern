<?php

use App\Console\Commands\NotifyInternAboutDeadlines;
use Illuminate\Support\Facades\Schedule;

Schedule::command(NotifyInternAboutDeadlines::class)->dailyAt("08:00");
