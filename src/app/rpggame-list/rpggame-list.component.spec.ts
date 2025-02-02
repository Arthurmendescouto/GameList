import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgGameListComponent } from './rpggame-list.component';

describe('RPGGameListComponent', () => {
  let component: RpgGameListComponent;
  let fixture: ComponentFixture<RpgGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RpgGameListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RpgGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
