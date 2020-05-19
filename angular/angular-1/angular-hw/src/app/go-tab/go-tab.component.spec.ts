import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoTabComponent } from './go-tab.component';

describe('GoTabComponent', () => {
  let component: GoTabComponent;
  let fixture: ComponentFixture<GoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
