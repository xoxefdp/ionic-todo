import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TaskService } from './../../app/services/task.service';
import { Task } from './../../app/models/task';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
	providers: [TaskService]
})
export class AddPage {
	// using Device Local Storage
	// public todoItem: string;
	// public items: Array<String>;
	//
  // constructor(public navCtrl: NavController, public navParams: NavParams) {
	// 	this.items = JSON.parse(localStorage.getItem('todos'));
	// 	if(!this.items) {
	// 		this.items = [];
	// 	}
	// 	this.todoItem = '';
  // }
	//
	// save() {
	// 	if(this.todoItem !='') {
	// 		this.items.push(this.todoItem);
	// 		localStorage.setItem('todos', JSON.stringify(this.items));
	// 		this.navCtrl.pop();
	// 	}
	// }

	tasks: Task[];
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private taskService: TaskService) {
    this.taskService.getTasks()
			.subscribe(tasks => {
				this.tasks = tasks
			});
  }

	ionViewDidEnter() {
		this.taskService.getTasks()
			.subscribe(tasks => {
				this.tasks = tasks;
			});
	}

  addTask() {
    const newTask = {
      title: this.title,
      isDone: false
    }
    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
				this.navCtrl.pop();
      });
  }

}
