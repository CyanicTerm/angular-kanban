import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../model/task';
import { ITab } from '../model/tab';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  todoAddForm !: FormGroup;
  isHidden: boolean = true;
  tabAddForm !: FormGroup;
  tabs : ITab [] = [{name: "First tab", toDo: [{description: "First task", done: false}], inProgress: [], done:[]}];
  tasks : ITask [] = [];
  currentTab: number = 1;
  inProgress : ITask [] = [];
  done: ITask [] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;
  isEditForTabEnabled: boolean = false;
  constructor(private fb : FormBuilder) {
    
   }

  ngOnInit(): void {
    this.todoAddForm = this.fb.group({
      item : ['', Validators.required]
    });
    this.tabAddForm = this.fb.group({
      item : ['', Validators.required]
    });
  }
  
  deleteTask(i:number, name:string){
    this.tabs.find(a => a.name === name)?.toDo.splice(i,1)
  }
  deleteTaskInProgress(i:number, name:string){
    this.tabs.find(a => a.name === name)?.inProgress.splice(i,1)
  }
  deleteTaskDone(i:number, name:string){
    this.tabs.find(a => a.name === name)?.done.splice(i,1)
  }
  editTask(item:ITask,i:number) {
    this.todoAddForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;

  }
  updateTask(name:string) {
    this.tabs.find(a => a.name === name)!.done[this.updateIndex].description = this.todoAddForm.value.item;
    this.tabs.find(a => a.name === name)!.done[this.updateIndex].done = false;
    this.todoAddForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  addTask(name: string){
    this.tabs.find(a => a.name === name)?.toDo.push({
      description:this.todoAddForm.value.item,
      done:false
    });
    this.todoAddForm.reset();
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  deleteTab(name: string){
    let index = this.tabs.findIndex(a => a.name === name);
    this.tabs.splice(index,1);
  }

  editTab(name: string) {
    let item = this.tabs.find(a => a.name === name);
    let index = this.tabs.findIndex(a => a.name === name);
    this.tabAddForm.controls['item'].setValue(item!.name);
    this.updateIndex = index;
    this.isEditForTabEnabled = true;

  }
  updateTab(name:string) {
    this.tabs[this.updateIndex].name = this.tabAddForm.value.item;
    this.tabAddForm.reset();
    this.updateIndex = undefined;
    this.isEditForTabEnabled = false;
  }
  addTab(){
    this.tabs.push({
      name:this.tabAddForm.value.item,
      toDo:[],
      inProgress:[],
      done:[]
    });
    this.tabAddForm.reset();
  }

}
