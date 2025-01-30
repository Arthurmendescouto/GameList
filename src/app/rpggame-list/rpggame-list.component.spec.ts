import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RPGGameListComponent } from './rpggame-list.component';

describe('RPGGameListComponent', () => {
  let component: RPGGameListComponent;
  let fixture: ComponentFixture<RPGGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RPGGameListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RPGGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
