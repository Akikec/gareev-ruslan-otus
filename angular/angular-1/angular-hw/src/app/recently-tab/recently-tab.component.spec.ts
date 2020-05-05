import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyTabComponent } from './recently-tab.component';

describe('RecentlyTabComponent', () => {
  let component: RecentlyTabComponent;
  let fixture: ComponentFixture<RecentlyTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
