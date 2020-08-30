import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {UserService} from './user.service';
import {DataService} from '../shared/data.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  let dataService: DataService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should use the service username', () => {
    expect(component.user.name).toEqual(userService.user.name);
  });
  it('should display the user name if user is logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(component.user.name);
  });
  it('shouldn\'t display the user name if user is logged in', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(component.user.name);
  });
  it('should fetch data successfully if not called asynchronously', async (() => {
    let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('Data');
    });
  }));
  it('should fetch data successfully if not called asynchronously FAKE', fakeAsync (() => {
    fixture = TestBed.createComponent(UserComponent)
    component = fixture.componentInstance;
    let spy = spyOn<DataService>(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();
    expect(component.data).toBe('Data');

  }));
  it('shouldn\'t fetch data successfully if not called asynchronously', () => {
    expect(component.data).toBe(undefined);
  });
});
