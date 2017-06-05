import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task';

/**
 * Generated class for the ShowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
	providers: [TaskService]
})
export class ShowPage {

	tasks: Task[];
	task: Task;
	title: string;
	isDone: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, private taskService: TaskService) {
		this.taskService.getTasks()
			.subscribe(tasks => {
				this.tasks = tasks;
			});
		this.taskService.getTask( this.navParams.get('_id') )
			.subscribe(task => {
				this.task = task;
				this.title = task.title;
				this.isDone = task.isDone;
			});
	}

	updateStatus() {
		const updTask = {
			_id: this.task._id,
			title: this.title,
			isDone: this.isDone
		};
		const tasks = this.tasks;
    this.taskService.updateStatus(updTask)
			.subscribe(data => {
				if (data.n === 1) {
					for (let i = 0; i < tasks.length; i++) {
						if (tasks[i]._id === updTask._id) {
							tasks[i] = updTask;
						}
					}
				}
				this.navCtrl.pop();
			});
  }

}
