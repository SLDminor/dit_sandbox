import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoLib } from './todo-lib';

describe('TodoLib', () => {
  let component: TodoLib;
  let fixture: ComponentFixture<TodoLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoLib);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
