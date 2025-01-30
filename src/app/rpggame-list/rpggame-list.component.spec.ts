import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpggameListComponent } from './rpggame-list.component';

describe('RPGGameListComponent', () => {
  let component: RpggameListComponent;
  let fixture: ComponentFixture<RpggameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RpggameListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RpggameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
