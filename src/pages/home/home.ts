import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddPage } from '../add/add';
import { ShowPage } from '../show/show';
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

	constructor(public navCtrl: NavController, private taskService: TaskService) {
		this.taskService.getTasks()
			.subscribe(tasks => {
				this.tasks = tasks;
			});
	}

	ionViewWillEnter() {
		if( this.tasks == null || this.tasks.length == 0 ) {
			this.taskService.getTasks()
				.subscribe(tasks => {
					this.tasks = tasks;
					console.log(tasks);
				});
		} else {
			console.log(this.tasks);
		}
	}

	add() {
		this.navCtrl.push(AddPage, {
			tasks: this.tasks
		});
	}

	show(task: Task) {
		this.navCtrl.push(ShowPage, {
			task: task,
			tasks: this.tasks
		});
	}

	deleteTask(id: number) {
		this.taskService.deleteTask(id)
			.subscribe(data => {
				if (data.n === 1) {
					for (let i = 0; i < this.tasks.length; i++) {
						if (this.tasks[i]._id === id) {
							this.tasks.splice(i, 1);
						}
					}
				}
			});
	}

}
