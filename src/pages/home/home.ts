import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPage } from '../add/add';

import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TaskService]
})
export class HomePage {
	// using Device Local Storage
	// public items: Array<String>;

  // constructor(public navCtrl: NavController) {
	//
  // }
	//
	// ionViewDidEnter() {
	// 	this.items = JSON.parse(localStorage.getItem('todos'));
	// 	if (!this.items) {
	// 		this.items = [];
	// 	}
	// }
	//
	// delete(index: number) {
	// 	this.items.splice(index,1);
	// 	localStorage.setItem('todos', JSON.stringify(this.items));
	// }
	//
	// add() {
	// 	this.navCtrl.push(AddPage);
	// }

	tasks: Task[];
	title: string;

	constructor(public navCtrl: NavController, private taskService: TaskService) {
		// this.taskService.getTasks()
		// 	.subscribe(tasks => {
		// 		this.tasks = tasks;
		// 	});
	}

	ionViewDidEnter() {
		this.taskService.getTasks()
			.subscribe(tasks => {
				this.tasks = tasks;
			});
	}

	add() {
		this.navCtrl.push(AddPage);
	}

	deleteTask(id: number) {
		console.log(id);
		const tasks = this.tasks;
		this.taskService.deleteTask(id)
			.subscribe(data => {
				if (data.n === 1) {
					for (let i = 0; i < tasks.length; i++) {
						if (tasks[i]._id === id) {
							tasks.splice(i, 1);
						}
					}
				}
			});
	}

}
