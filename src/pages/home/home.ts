import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [TaskService]
})
export class HomePage {

	tasks: Task[];
	title: string;
	currentPage: number;
	pageSize: number;
	q: string;
	filteredTasks: Task[];

	constructor(public navCtrl: NavController, private taskService: TaskService) {
		this.tasks = [];
		this.filteredTasks = [];
		this.currentPage = 1;
		this.pageSize = 4;
		this.q = '';

		if( this.tasks == null || this.tasks.length == 0 ) {
			this.init();
		} else {
			console.log(this.tasks);
			console.log(this.filteredTasks);
		}
	}


	init() {
		this.taskService.getTasks()
			.subscribe(tasks => {
				this.tasks = tasks;
				this.filteredTasks = this.tasks;
				console.log(this.tasks);
				console.log(this.filteredTasks);
			});
	}

	ionViewWillEnter() {
		if( this.tasks == null || this.tasks.length == 0 ) {
			this.init();
		} else {
			console.log(this.tasks);
			console.log(this.filteredTasks);
		}
	}

	filterTask() {
		if(this.q){
			this.assignCopy();
		}
		this.filteredTasks = Object.assign([], this.tasks)
			.filter( (task) => task.title.toLowerCase().indexOf(this.q.toLowerCase()) > -1);
			// .filter( (task) => JSON.stringify(task).toLowerCase().indexOf(this.q.toLowerCase()) > -1)
	}
	private assignCopy(){
		this.filteredTasks = Object.assign([], this.tasks);
	}

	getTasks(ev: any) {
		let val = ev.target.value;

		let searchData = this.tasks;

		searchData = searchData.filter( (item) => {
			return (item.title.toLowerCase().indexOf( val.toLowerCase() ) > -1);
		});
	}

	addTask(ev) {
		if (ev.keyCode == 13 && this.title != '') {
			const newTask = {
				title: this.title,
				isDone: false
			}

			this.taskService.addTask(newTask)
				.subscribe(task => {
					this.tasks.push(task);
					this.title = '';
				});
		}
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

	updateStatus(task) {
		const updTask = {
			_id: task._id,
			title: task.title,
			isDone: task.isDone
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
			});
	}

	numberOfPages() {
		if (this.pageSize != 0) {
			return Math.ceil(this.filteredTasks.length / this.pageSize);
		} else if(this.pageSize <= 0 || this.pageSize == null) {
			return this.filteredTasks.length;
		}
	}

	previous() {
		this.currentPage = this.currentPage - 1;
	}
	next() {
		this.currentPage = this.currentPage + 1;
	}

}
