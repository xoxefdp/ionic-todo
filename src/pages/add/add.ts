import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, private taskService: TaskService) {
		this.taskService.getTasks()
			.subscribe(tasks => {
				this.tasks = tasks;
			});
	}

	ionViewDidLoad() {}

	ionViewDidEnter() {}

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
