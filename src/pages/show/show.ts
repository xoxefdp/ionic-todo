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

	constructor(public navCtrl: NavController, public navParams: NavParams, private taskService: TaskService) {
		// this.taskService.getTasks()
		// 	.subscribe(tasks => {
		// 		this.tasks = tasks;
		// 		for (var i = 0; i < this.tasks.length; i++) {
		// 			// console.log(this.tasks[i]);
		// 			if (this.tasks[i]['_id'] == this.navParams.get('_id')) {
		// 				console.log( this.tasks[i] );
		// 				this.task = this.tasks[i];
		// 				this.title = this.tasks[i].title;
		// 				this.isDone = this.tasks[i].isDone;
		// 			}
		// 		}
		// 	});

		// this.taskService.getTask( this.navParams.get('_id') )
		// 	.subscribe(task => {
		// 		this.task = task;
		// 		this.title = task.title;
		// 		this.isDone = task.isDone;
		// 	});

		this.tasks = this.navParams.data.tasks;
		this.task = this.navParams.data.task;

		console.log(this.tasks);
		console.log(this.task);
	}

	ionViewWillEnter() {
		this.tasks = this.navParams.data.tasks;
		this.task = this.navParams.data.task;

		console.log(this.tasks);
		console.log(this.task);
	}

	updateStatus() {
		const updTask = {
			_id: this.task._id,
			title: this.task.title,
			isDone: this.task.isDone
		};

    this.taskService.updateStatus(updTask)
			.subscribe(data => {
				if (data.n === 1) {
					for (let i = 0; i < this.tasks.length; i++) {
						if (this.tasks[i]._id === updTask._id) {
							this.tasks[i] = updTask;
						}
					}
				}
				this.navCtrl.pop();
			});

		console.log(this.tasks);
		console.log(updTask);
  }

}
